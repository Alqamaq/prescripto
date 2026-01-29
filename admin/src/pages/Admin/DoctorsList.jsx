import React, { useContext } from "react";
import { AdminContext } from "../../context/AdminContext";
import { useEffect } from "react";


const DoctorsList = ()=>{
    // chekbox color does nto change 8:15
    const { doctors, aToken, getAllDoctors,changeAvailability} = useContext(AdminContext)

    useEffect(()=>{
        if(aToken){
            getAllDoctors()
        }
    },[aToken])

    return (
        <div className="m-5 max-h-[90vh] overflow-y-scroll">
            <h1 className="font-medium text-lg text-gray-800 dark:text-white">All Doctors</h1>
            <div className="w-full flex flex-wrap gap-4 pt-5 gap-y-6">
                {
                    doctors.map((item,index)=>(
                        <div key={index} className="border border-indigo-200 dark:border-gray-600 rounded-xl max-w-56 overflow-hidden cursor-pointer group bg-white dark:bg-slate-800">
                            <img src={item.image} alt="" className="bg-indigo-50 dark:bg-slate-700 group-hover:bg-primary transition-all duration-500 dark:group-hover:bg-blue-700" />
                            <div className="p-4">
                                <p className="text-neutral-800 dark:text-white text-lg font-medium">{item.name}</p>
                                <p className="text-zinc-600 dark:text-gray-400 text-sm">{item.speciality}</p>
                                <div className="mt-2 flex items-center gap-1 text-sm dark:text-gray-300">
                                    <input onChange={()=> changeAvailability(item._id)} type="checkbox" checked={item.available} className="accent-primary" />
                                    <p>Available</p>
                                </div>
                            </div>

                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default DoctorsList;