import validator from 'validator'
import bcrypt from 'bcrypt'
import {v2 as cloudinary } from "cloudinary"
import doctorModel from "../models/doctorModel.js"
import appointmentModel from '../models/appointementModel.js'
import userModel from '../models/userModel.js'
import jwt from 'jsonwebtoken'


// API FOR ADDING DOCTORS

const addDoctor = async (req, res)=>{

    try {

         const imageFile = req.file
        
        const {name, email, password, speciality, degree, experience, about, fees, address} = req.body;
       

        console.log({name, email, password, speciality, degree, experience, about, fees, address},imageFile)

        if (!imageFile) {
            return res.json({ success: false, message: "Image Not Selected" })
        }

        //checking for all data to add Doctor
        if(!name || !email || !password || !speciality || !degree || !experience || !about || !fees || !address){
            return res.json({success: false, message: "Missing Detail"})
        }



        // Validating email format
        if(!validator.isEmail(email)){
            return res.json({success: false, message: "Please enter a valid email"})

        }
        // Validation strong password 

        if(password.length < 8){
           return res.json({success: false, message: "Please enter a strong password"})

        }
         // Encrypt password to save in database
        // hashing doctor password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt)

        // Upload image to cloudinary
       
        const imageaUpload = await cloudinary.uploader.upload(imageFile.path,{resource_type:"image"})
        const imageUrl = imageaUpload.secure_url

        const doctorData = {
            name,
            email,
            image: imageUrl,
            password : hashedPassword,
            speciality,
            degree,
            experience,
            about,
            fees,
            address: JSON.parse(address),
            date:Date.now()
            
        }

        const newDoctor = new doctorModel(doctorData)
        await newDoctor.save()

       res.json({success:true, message: "Doctor Added"})
        
    } catch (error) {

        console.log(error);
        res.json({success: false, message: error.message})
        
        
    }
}

// API for admin Login
const loginAdmin = async (req,res)=>{

    try {
        // We match email and password with admin login and then create token
        const {email,password} = req.body;
        
        if(email === process.env.ADMIN_EMAIL && password ===  process.env.ADMIN_PASSWORD){
          const token = jwt.sign(email+password,process.env.JWT_SECRET) 
            res.json({success:true,token})

        }else{
            res.json({success: false, message: "Invalid Credentials"})
        }
        
    } catch (error) {
        console.log(error);
        res.json({success: false, message: error.message})
        
        
    }

}

//API to get all all doctors for admin panel

const allDoctors = async(req,res)=>{
    try {
        const doctors= await doctorModel.find({}).select('-password')
        res.json({sucess:true,doctors})
        
    } catch (error) {
        console.log(error);
        res.json({success: false, message: error.message})
        
    }
}

// API to get all Appointments of all doctors for admin panel

const AppointmentsAdmin = async(req,res)=>{
    try {
        const appointments = await appointmentModel.find({})
        res.json({success:true,appointments})
    } catch (error) {
        console.log(error);
        res.json({success: false, message: error.message})
        
    }
}

//API to cancel Appointments

const appointmentCancel = async (req, res) => {
    try {
        const { appointmentId } = req.body
        const appointmentData = await appointmentModel.findById(appointmentId)

        await appointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true })

        //releasing doctor slots
        const { docId, slotDate, slotTime } = appointmentData

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
//API to get dashboard data for admin panel

const adminDashboard = async (req, res) => {
  try {
    const doctors = await doctorModel.find({});
    const users = await userModel.find({});
    const appointments = await appointmentModel.find({});

    const dashData = {
      doctors: doctors.length,
      appointments: appointments.length,
      users: users.length,
      latestAppointments: appointments.reverse().slice(0, 5),
    };

    res.json({ success: true, dashData });
  } catch (error) {
    console.log("error:", error);
    res.json({ success: false, message: error.message });
  }
};




export {addDoctor,loginAdmin,allDoctors,AppointmentsAdmin, appointmentCancel, adminDashboard}