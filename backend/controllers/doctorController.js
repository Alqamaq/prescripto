import doctorModel from '../models/doctorModel.js'
import appointmentModel from '../models/appointementModel.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'  


const changeAvailability = async(req , res)=>{
    try {
        const { docId } = req.body

        const docData = await doctorModel.findById(docId)
        await doctorModel.findByIdAndUpdate(docId,{available:!docData.docId})
        res.json({success:true, message:'Availability changed'})
        
    } catch (error) {
        console.log(error);
        res.json({sucess:true,message:error.message})
        
        
    }
}

const doctorList = async (req,res)=>{

    try {
        //excluding email and password for frontend appearence
        const doctors = await doctorModel.find({}).select(['-password','-email'])
        res.json({success:true, doctors})

    } catch (error) {
        console.log(error);
        res.json({sucess:true,message:error.message})
        
        
    }

}

// Get all appointments for a doctor

const doctorAppointments = async (req, res) => {
    try {
        const { docId } = req.body;

        const appointments = await appointmentModel.find({ docId: docId });
        res.json({ success: true, appointments });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

//Doctor login

const doctorLogin =async(req,res)=>{
    try {
        const {email,password} = req.body

        const doctor = await doctorModel.findOne({email})

        if (!doctor) {
            return res.json({success:false,message:"Doctor not found"})
        }

        const isMatch = await bcrypt.compare(password, doctor.password)

        if (isMatch) {
            const token = jwt.sign({id:doctor._id}, process.env.JWT_SECRET)
            res.json({success:true, token})
        } else {
            res.json({success:false,message:"Invalid credentials"})
        }
    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
    }
}
const appointmentCancel = async(req,res)=>{
    try {
        const {appointmentId,docId} = req.body
        const appointmentData = await appointmentModel.findById(appointmentId)
        if (appointmentData && appointmentData.docId === docId) {
             await appointmentModel.findByIdAndUpdate(appointmentId, {status: true})
            return res.json({success:true, message:"appointment cancelled"})
        }else{
       
        res.json({success:false, message:'cancellation failed'})
        }
    } catch (error) {
        console.log(error);
        res.json({success:false, message:error.message})
    }
}

const appointmentComplete = async(req,res)=>{
    try {
        const {appointmentId,docId} = req.body
        const appointmentData = await appointmentModel.findById(appointmentId)
        if (appointmentData && appointmentData.docId === docId) {
             await appointmentModel.findByIdAndUpdate(appointmentId, {isCompleted: true})
            return res.json({success:true, message:"appointment completed"})
        }else{
            return res.json({success:false, message:"completion failed"})
        }
    } catch (error) {
        console.log(error);
        res.json({success:false, message:error.message})
    }
}

const doctorDashboard = async(req,res)=>{
    try {
        const {docId} = req.body
        const appointments = await appointmentModel.find({docId})
        let totalEarnings = 0
        appointments.map((appointment)=>{
            if (appointment.isCompleted || appointment.payment) {
                totalEarnings += appointment.amount
            }
        })
        let patientCount = []

        appointments.map((item)=>{
            if(!patientCount.includes(item.userId)){
                patientCount.push(item.userId)
            }

        })
        const dashData = {
            totalEarnings,
            totalAppointments: appointments.length,
            patientCount: patientCount.length,
            latestAppointments: appointments.reverse().slice(0,5)
        }
        res.json({success:true, dashData})

    } catch (error) {
        console.log(error);
        res.json({success:false, message:error.message})
    }

}

const doctorProfile = async(req,res)=>{
    try {
        const {docId} = req.body
        const doctor = await doctorModel.findById(docId)
        res.json({success:true, profileData:doctor})
    } catch (error) {
            console.log(error);
            res.json({success:false, message:error.message})
        }
}
const updateProfile = async(req,res)=>{
    try {
        const {docId, address, fees, available} = req.body
        await doctorModel.findByIdAndUpdate(docId, {address, fees, available})
        res.json({success:true, message:"Profile updated successfully"})
    } catch (error) {   
        console.log(error);
        res.json({success:false, message:error.message})
    }
}

export {changeAvailability, doctorList, doctorAppointments, doctorLogin, appointmentCancel, appointmentComplete, doctorDashboard, doctorProfile, updateProfile}    