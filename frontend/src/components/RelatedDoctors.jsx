import React,{useEffect} from "react";
import { AppContext } from "../context/AppContext";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom"

const RelatedDoctors = ({ doctorId, speciality }) => {

    const {doctors} =useContext(AppContext);
    const navigate=useNavigate();
    const [relatedDocs,setRelatedDocs]= useState([]);

    useEffect(()=>{
        //filtering doctors based on speciality and excluding current doctor
        if(doctors.length>0 && speciality){
        const related = doctors.filter(doc => doc.speciality === speciality && doc._id !== doctorId);
        console.log(related);
        
        setRelatedDocs(related);
        }
    },[doctors,speciality,doctorId])


    return (
        <div className='flex flex-col items-center gap-4 py-16 text-gray-900 dark:text-gray-100 md:mx-20'>
        <h1 className='text-3xl font-medium dark:text-white'>Top Doctors</h1>
        <p className='md:w-1/3 text-sm text-center text-gray-600 dark:text-gray-400'>Simply browse through our list of trusted doctors and book an appointment at your convenience.</p>
        <div className='grid grid-cols-auto gap-4 pt-5 gap-y-6 px-3 w-full sm:px-0'>

            {relatedDocs.slice(0,4).map((item,index)=>(
            <div onClick={()=> {navigate(`/appointment/${item._id}`); scrollTo(0,0)}} key={index} className="border border-blue-200 dark:border-gray-600 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-300 bg-white dark:bg-slate-700">
                <img className="bg-blue-50 dark:bg-slate-600 dark:opacity-90" src={item.image} alt={item.speciality} />
                <div className="p-4">
                    <div>
                        <div className="flex items-center gap-4 text-green-500">
                         <p className="w-2 h-2 rounded-full bg-green-500"></p>
                         <p>Available</p>
                        </div>
                        <p className="font-medium dark:text-white">{item.name} </p>
                        <p className="text-gray-600 dark:text-gray-400 text-sm">{item.speciality}</p>
                    </div>
                </div>

            </div> ))}
        </div>
        <button onClick={()=>{ navigate('/doctor');scrollTo(0,0)}} className="bg-blue-50 dark:bg-slate-700 text-gray-700 dark:text-gray-300 px-12 py-3 rounded-full mt-10 hover:bg-blue-100 dark:hover:bg-slate-600 transition"> more</button>

    </div>
    )
}

export default RelatedDoctors;