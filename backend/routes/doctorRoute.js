import express from 'express'
import {doctorProfile,appointmentCancel,appointmentComplete, doctorAppointments, doctorDashboard, doctorList,doctorLogin, updateProfile} from '../controllers/doctorController.js'
import authDoctor from '../middlewares/authDoctor.js'

const doctorRouter = express.Router();

doctorRouter.get('/list',doctorList)
doctorRouter.post('/login',doctorLogin)
doctorRouter.get('/appointments',authDoctor,doctorAppointments)
doctorRouter.post('/cancel-appointment',authDoctor,appointmentCancel)
doctorRouter.post('/complete-appointment',authDoctor,appointmentComplete)
doctorRouter.get('/doctor-dashboard',authDoctor,doctorDashboard)
doctorRouter.get('/doctor-profile',authDoctor,doctorProfile)
doctorRouter.post('/update-profile',authDoctor,updateProfile)


export default doctorRouter