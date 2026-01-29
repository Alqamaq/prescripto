import validator from 'validator'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { v2 as cloudinary } from "cloudinary"
import userModel from '../models/userModel.js'
import doctorModel from '../models/doctorModel.js'
import appointmentModel from '../models/appointementModel.js'
import { Safepay } from '@sfpy/node-sdk';




//API TO REGISTER USER

const registerUser = async (req, res) => {
    try {

        // To get user detail
        const { name, email, password } = req.body

        if (!name || !email || !password) {
            res.json({ success: false, message: 'Missing Detail' })
        }

        // Validating email format
        if (!validator.isEmail(email)) {
            res.json({ success: false, message: 'Enter a valid email' })
        }

        // Validation strong password 
        if (password.length < 8) {
            return res.json({ success: false, message: "Please enter a strong password" })
        }

        // Encrypt password to save in database
        // hashing doctor password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const userData = {
            name,
            email,
            password: hashedPassword
        }
        // create new user by taking userData and save in database
        const newUser = new userModel(userData)
        const user = await newUser.save()

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
        res.json({ success: true, token })

    } catch (error) {

        console.log(error);
        res.json({ success: false, message: error.message })
    }

}

// API FOR USER LOGIN

const loginUser = async (req, res) => {

    try {

        const { email, password } = req.body
        const user = await userModel.findOne({ email })

        if (!user) {
            return res.json({ success: false, message: 'User does not exist' })
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if (isMatch) {

            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
            res.json({ success: true, token })

        } else {
            res.json({ success: false, message: 'Invalid credentials' })
        }


    } catch (error) {

        console.log(error);
        res.json({ success: false, message: error.message })

    }
}

// API for user profile data

const getProfile = async (req, res) => {
    try {
        const { userId } = req.body
        const userData = await userModel.findById(userId).select('-password')
        res.json({ success: true, userData })


    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })

    }
}

// API for update profile

const updateProfile = async (req, res) => {
    try {
        const { userId, name, phone, dob, address, gender } = req.body
        const imageFile = req.file

        if (!name || !phone || !dob || !gender) {
            return res.json({ success: false, message: "Data Missing" })

        }
        await userModel.findByIdAndUpdate(userId, { name, phone, dob, gender, address: JSON.parse(address) })

        if (imageFile) {
            //upload image to cloudinary
            const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: 'image' })
            const imageUrl = imageUpload.secure_url
            await userModel.findByIdAndUpdate(userId, { image: imageUrl })
        }
        res.json({ success: true, message: "Profile Updated" })


    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })

    }
}

// API for book appointment

const bookAppointment = async (req, res) => {

    try {

        const { userId, docId, slotDate, slotTime } = req.body
        const docData = await doctorModel.findById(docId).select('-password')

        if (!docData.available) {
            return res.json({ success: false, message: "Doctor not available" })

        }
        let slots_booked = docData.slots_booked

        //Checking for slots availability
        if (slots_booked[slotDate]) {

            if (slots_booked[slotDate].includes(slotTime)) {
                return res.json({ success: false, message: "Doctor not available" })
            } else {
                slots_booked[slotDate].push(slotTime)
            }

        } else {
            slots_booked[slotDate] = []
            slots_booked[slotDate].push(slotTime)
        }

        const userData = await userModel.findById(userId).select('-password')
        delete docData.slots_booked

        const appointmentData = {
            userId,
            docId,
            userData,
            docData,
            amount: docData.fees,
            slotTime,
            slotDate,
            date: Date.now()
        }

        const newAppointment = new appointmentModel(appointmentData)
        await newAppointment.save()

        //save new slots Data in docData
        await doctorModel.findByIdAndUpdate(docId, { slots_booked })

        res.json({ success: true, message: 'Appointment Booked' })

    } catch (error) {

        console.log(error);
        res.json({ success: false, message: error.message })

    }
}

// API to get user appointement for frontend my-appointment page
const listAppointment = async (req, res) => {
    try {
        const { userId } = req.body
        const appointments = await appointmentModel.find({ userId })

        res.json({ success: true, appointments })

    } catch (error) {

        console.log(error);
        res.json({ success: false, message: error.message })

    }
}

//API to cancel Appointments

const cancelAppointment = async (req, res) => {
    try {
        const { userId, appointmentId } = req.body
        const appointmentData = await appointmentModel.findById(appointmentId)

        // verify the appointment user
        if (appointmentData.userId !== userId) {
            return res.json({ success: false, message: "Unotherized action" })

        }

        await appointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true })

        //releasing doctor slots
        const { docId, slotDate, slotTime } = req.body

        const doctorData = await doctorModel.findById(docId)

        let slots_booked = doctorData.slots_booked

        slots_booked[slotTime] = slots_booked[slotDate].filter(e => e !== slotTime)

        await doctorModel.findByIdAndUpdate(docId, { slots_booked })

        res.json({ success: true, message: "Appointment Cancelled" })



    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })


    }
}

//Api to make payment of appointment using Safepay



//console.log(process.env.SAFEPAY_API_KEY);
console.log("Checking Env Keys:", {
    key: process.env.SAFEPAY_API_KEY ? "EXISTS" : "MISSING",
    secret: process.env.SAFEPAY_KEY_SECRET ? "EXISTS" : "MISSING",
    webhook: process.env.SAFEPAY_WEBHOOK_SECRET ? "EXISTS" : "MISSING"
});




const paymentSafepay = async (req, res) => {

    try {

        const { appointmentId } = req.body
        const appointmentData = await appointmentModel.findById(appointmentId)

        if (!appointmentData || appointmentData.cancelled) {
            return res.json({ success: false, message: "Appoinntment cancelled or not found" })
        }
        const SafepayInstance = new Safepay({
            environment: 'sandbox',
            apiKey: process.env.SAFEPAY_API_KEY,
            v1Secret: process.env.SAFEPAY_KEY_SECRET,
            webhookSecret: process.env.SAFEPAY_WEBHOOK_SECRET

        })

        // Step 1: Create authorization token (async)
        const authToken = await SafepayInstance.authorization.create();

        // Step 2: Create checkout with the auth token (synchronous)
        const checkoutUrl = SafepayInstance.checkout.create({
            orderId: appointmentId,
            redirectUrl: 'http://localhost:5173/my-appointments',
            cancelUrl: 'http://localhost:5173/my-appointments',
            token: authToken,
            webhooks: true
        });

        // Step 3: Return the checkout URL
        if (checkoutUrl) {
            return res.json({ success: true, url: checkoutUrl });
        }

        throw new Error("Could not generate a valid payment link.");

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })

    }


}
const verifySafepayWebhook = async (req, res) => {
    try {
        // 1. Verify that the request actually came from Safepay
        // The SDK helper handles the signature and secret verification automatically
        const SafepayInstance = new Safepay({
            environment: 'sandbox',
            apiKey: process.env.SAFEPAY_API_KEY,
            v1Secret: process.env.SAFEPAY_KEY_SECRET,
            webhookSecret: process.env.SAFEPAY_WEBHOOK_SECRET

        })
        const isValid = await SafepayInstance.verify.webhook(req);

        if (!isValid) {
            console.error("Invalid Webhook Signature!");
            return res.status(401).send("Invalid Signature");
        }

        // 2. Safepay sends the data in the body
        const { data, event } = req.body;

        // 3. Check if the event is 'checkout.completed'
        if (event === 'payment.succeeded') {
            const appointmentId = data.order_id; // This is what we sent as orderId earlier

            // 4. Update the appointment in your database
            await appointmentModel.findByIdAndUpdate(appointmentId, { payment: true });

            console.log(`Appointment ${appointmentId} marked as PAID!`);
        }

        // 5. Always return 200 OK so Safepay stops retrying
        res.status(200).send('Webhook Processed');

    } catch (error) {
        console.error("Webhook Processing Error:", error);
        res.status(500).send('Internal Server Error');
    }
};
export { registerUser, loginUser, getProfile, updateProfile, bookAppointment, listAppointment, cancelAppointment, paymentSafepay, verifySafepayWebhook }