import {useState,useContext} from "react";
import { AdminContext } from "../context/AdminContext.jsx";
import { DoctorContext } from "../context/DoctorContext.jsx";   
import axios from "axios"
import {toast} from 'react-toastify'

const Login = ()=>{

    const [state,setState]= useState('Admin')
    const {setAToken,backendUrl} = useContext(AdminContext)
    const {setDToken,setDoctorProfile} = useContext(DoctorContext);
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('');

    const onSubmitHandler = async (event)=>{
        event.preventDefault();

        try {
            if(state === 'Admin'){

                const {data} = await axios.post(backendUrl + '/api/admin/login',{email,password})
                if(data.success){
                    //console.log(data.token)
                    toast.success("Admin Logged suuccesful")
                    localStorage.setItem('aToken',data.token)
                    setAToken(data.token);
                    
                    
                }else{
                    toast.error(data.messagee)
                }
                
            }else{
                const {data} = await axios.post(backendUrl + '/api/doctor/login',{email,password})
                if(data.success){
                    //console.log(data.token)
                    toast.success("Doctor Logged suuccesful")
                    localStorage.setItem('dToken',data.token)
                    setDToken(data.token);
                    setDoctorProfile(data.doctorProfile);
                    console.log(data.token);
                    
                    
                }else{
                    toast.error(data.messagee)
                }

            }
        } catch (error) {
            
        }

    }
   
    

    return (
        <form onSubmit={onSubmitHandler} className="min-h-[80vh] flex items-center">
            <div className="flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border border-gray-300 dark:border-gray-600 rounded-xl text-gray-700 dark:text-gray-300 text-sm shadow-lg bg-white dark:bg-slate-800">
                <p className="text-2xl font-semibold m-auto text-black dark:text-white"><span className="text-primary"> {state }</span> Login</p>
                <div className="w-full">
                    <p className="dark:text-gray-300">Email</p>
                    <input onChange={(e)=> setEmail(e.target.value)}  value={email} className="border border-gray-300 dark:border-gray-600 dark:bg-slate-700 dark:text-white rounded w-full p-2 mt-1" type="email" required  />
                </div>
                <div className="w-full">
                    <p className="dark:text-gray-300">password</p>
                    <input onChange={(e)=> setPassword(e.target.value)}  value={password} className="border border-gray-300 dark:border-gray-600 dark:bg-slate-700 dark:text-white rounded w-full p-2 mt-1" type="password" required />
                </div>
                <button className="bg-primary hover:bg-blue-600 text-white py-2 rounded-md text-base w-full transition">Login</button>
                {
                    state=== 'Admin' 
                    ? <p>Doctor Login <span onClick={()=> setState('Doctor')} className="text-primary underline cursor-pointer">Click here</span></p>
                    : <p>Admin Login <span onClick={()=> setState('Admin')} className="text-primary underline cursor-pointer">Click here</span></p>
                }
            </div>
        </form>
    )
}
export default Login;