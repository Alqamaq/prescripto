
import { AppContext } from '../context/AppContext';
import { useEffect } from 'react';
import { useContext,useState } from 'react';
import {toast } from 'react-toastify'
import axios from 'axios'


const MyAppointment = () => {

  const {backendUrl, token, getDoctorsData} = useContext(AppContext);
  const [appointments, setAppointments] = useState([])
  const months = ["","Jan","Feb","Mar", "Apr", "May", "Jun" , "Jul", "Aug","Sep","Oct","Nov","Dec"]

  const SlotDateFormat = (slotDate)=>{
    const dateArray = slotDate.split('_')
      return dateArray[0] + " " + months[Number(dateArray[1])] + " " + dateArray[2]; 
  }



  const getUserAppointment = async ()=>{
    try {
      
      const {data} = await axios.get(backendUrl + '/api/user/appointments',{headers: {token}})
      if(data.success){
        setAppointments(data.appointments.reverse())
        //console.log(data.appointments)
      }
    } catch (error) {

      console.log(error);
      toast.error(error.message)
    }
  }

  const cancelAppointment =async (appointmentId)=>{

    try {
      const {data} = await axios.post(backendUrl + '/api/user/cancel-appointment',{appointmentId},{headers: {token}})

      if(data.success){
        toast.success(data.message)
        getUserAppointment()
        getDoctorsData()
      }else{
        toast.error(data.message)
      }

      
    } catch (error) {
      console.log(error);
      toast.error(error.message)
      
    }

  }
  const appointmentSafepay = async (appointmentId)=>{
    try {
      const {data} = await axios.post(backendUrl + '/api/user/payment-safepay', {appointmentId}, {headers: {token}})

      if(data.success){
        // Redirect the user to the Safepay Checkout URL
        window.location.href = data.url; 
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  useEffect(()=>{

    if (token) {
      getUserAppointment() 
    }
  },[token])


  return (
    <div>
      <p className='pb-3 mt-12 font-medium text-zinc-700 dark:text-gray-300 border-b border-gray-300 dark:border-gray-600'>MY APPOINTEMENT</p>
      <div>
        {
          appointments.slice(0,2).map((item,index)=>(
            <div key={index} className='grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b border-gray-300 dark:border-gray-600'>
              <div>
                <img className='w-32 bg-indigo-50 dark:bg-slate-700' src={item.docData.image} alt="" />
              </div>
              <div className='flex-1 text-sm text-zinc-600 dark:text-gray-400'>
                <p className='text-neutral-800 dark:text-white font-semibold'>{item.docData.name}</p>
                <p>{item.docData.speciality}</p>
                <p className='text-zinc-700 dark:text-gray-300 font-medium mt-1'>Address:</p>
                <p className='text-xs' >{item.docData.address.line1}</p>
                <p className='text-xs' >{item.docData.address.line2}</p>
                <p className='text-xs mt-1'><span className='text-sm text-neutral-700 dark:text-gray-300 font-medium '>Date & Time</span> {SlotDateFormat(item.slotDate)} | {item.slotTime} </p>
              </div>
              <div></div>
              <div className='flex flex-col gap-2 justify-end'>
               {!item.cancelled && <button onClick={()=>appointmentSafepay(item._id)} className='text-sm text-stone-500 dark:text-gray-400 text-center sm:min-w-48 py-2 border border-gray-300 dark:border-gray-600 rounded hover:bg-primary hover:text-white dark:hover:text-white transition-all duration-300' >Pay Online</button>  }
               {!item.cancelled && <button onClick={()=>cancelAppointment(item._id)} className='text-sm text-stone-500 dark:text-gray-400 text-center sm:min-w-48 py-2 border border-gray-300 dark:border-gray-600 rounded hover:bg-red-600 hover:text-white dark:hover:text-white transition-all duration-300 ' >Cancel Appointement</button>  }
               {item.cancelled && <button className='text-sm text-red-500 dark:text-red-400 text-center sm:min-w-48 py-2 border border-red-500 dark:border-red-400 rounded' >Appointment Canelled</button>  }

              </div>
            </div>
          ))
        }
      </div>

    </div>
  );
}

export default MyAppointment;    