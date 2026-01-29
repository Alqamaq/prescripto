import React from 'react';
import { Link} from 'react-router-dom';
import {specialityData} from "../assets/assets";

const SpecialityMenu = ()=>{
    return(
        <div id='speciality' className='flex flex-col items-center gap-4 py-16 text-gray-800 dark:text-gray-200'>
            <h1 className='text-3xl font-medium dark:text-white'>Find by Speciality</h1>
            <p className='md:w-1/3 text-sm text-center text-gray-600 dark:text-gray-400'>Simply browse through our list of trusted doctors and book an appointment at your convenience.</p>
            <div className='flex sm:justify-center pt-5 gap-4 w-full overflow-scroll'>
                {specialityData.map((item,index)=>(

                   <Link onClick={()=> scrollTo(0,0)} className="flex flex-col items-center text-xs cursor-pointer flex-shrink-0 hover:text-primary dark:hover:text-blue-400 transition" to={`doctor/${item.speciality}`} key={index}>
                        <img className='w-16 sm:w-24 mb-2 dark:opacity-90' src={item.image} alt={item.speciality} />
                        <p>{item.speciality}</p>
                    </Link>
                ))}
            </div>

        </div>
    )
}

export default SpecialityMenu;