import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';
import adminRouter from './routes/adminRouter.js';
import doctorRouter from './routes/doctorRoute.js';
import userRouter from './routes/userRoute.js';
import ngrok from '@ngrok/ngrok' 


// app config

const app = express();
const port = process.env.PORT || 4000
connectDB()
connectCloudinary()

// midleware
app.use(express.json())
app.use(cors())

//api endpoint 

app.use('/api/admin', adminRouter)
// localhost: 4000/api/admin/add-doctor
app.use('/api/doctor',doctorRouter)
app.use('/api/user', userRouter)

app.get('/', (req,res) => {

   res.send('API WORKING perfectly working nodemon')

})


// server listener

const startServer = async () => {
    try {
        app.listen(port, () => console.log("Server started on port:", port));

        // This creates your public "Endpoint URL"
        const listener = await ngrok.connect({ 
            addr: port, 
            authtoken: process.env.NGROK_AUTHTOKEN 
        });
        
        console.log(`Your Public Endpoint URL is: ${listener.url()}`);
        console.log(`Use this for Safepay: ${listener.url()}/api/user/webhook`);

    } catch (error) {
        console.error("Error starting server or Ngrok:", error);
    }
}

startServer();