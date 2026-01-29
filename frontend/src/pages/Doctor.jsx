import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

const Doctor = () => {

  const [filteredDoc, setFilteredDoc] = React.useState([]);
  const [showFilter, setShowFilter] = React.useState(false);

  const navigate = useNavigate();
  const {speciality}= useParams();
  
  const {doctors}= useContext(AppContext) 

  const filterBySpeciality = ()=>{

    if(speciality){
      setFilteredDoc(doctors.filter((doc)=> doc.speciality === speciality )) 
    }else{
      setFilteredDoc(doctors);
    }
  }
    
  useEffect(()=>{

    filterBySpeciality();

  },[doctors,speciality]);
  
  

  return (
    <div>
      <p className='text-gray-600 dark:text-gray-400'>Browsre throufht the doctor specialist</p>
      <div className='flex flex-col sm:flex-row items-start gap-5 mt-5'>
        <button onClick={()=> setShowFilter(prev => !prev)} className={`py-1 px-3 border rounded text-sm transition-all sm:hidden ${showFilter ? 'bg-primary text-white': 'border-gray-300 dark:border-gray-600 dark:text-gray-300'}`}>Filter</button>
        <div className= {`flex-col gap-4 text-sm text-gray-600 dark:text-gray-400 ${showFilter ? 'flex': 'hidden sm:flex'}`}>
          <p onClick={()=> speciality=== 'General physician' ? navigate('/doctor') : navigate(`/doctor/General physician`) } className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 dark:border-gray-600 rounded transition-all cursor-pointer ${speciality === "General physician" ? "bg-indigo-100 dark:bg-blue-900 text-black dark:text-white":"dark:bg-slate-700"} `} >General physician</p>
          <p onClick={()=> speciality=== 'Gynecologist' ? navigate('/doctor') : navigate(`/doctor/Gynecologist`) } className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 dark:border-gray-600 rounded transition-all cursor-pointer ${speciality === "Gynecologist" ? "bg-indigo-100 dark:bg-blue-900 text-black dark:text-white":"dark:bg-slate-700"} `} >Gynecologist</p>
          <p onClick={()=> speciality=== 'Dermatologist' ? navigate('/doctor') : navigate(`/doctor/Dermatologist`) } className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 dark:border-gray-600 rounded transition-all cursor-pointer ${speciality === "Dermatologist" ? "bg-indigo-100 dark:bg-blue-900 text-black dark:text-white":"dark:bg-slate-700"} `} >Dermatologist</p>
          <p onClick={()=> speciality=== 'Pediatricians' ? navigate('/doctor') : navigate(`/doctor/Pediatricians`) } className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 dark:border-gray-600 rounded transition-all cursor-pointer ${speciality === "Pediatricians" ? "bg-indigo-100 dark:bg-blue-900 text-black dark:text-white":"dark:bg-slate-700"} `} >Pediatricians</p>
          <p onClick={()=> speciality=== 'Neurologist' ? navigate('/doctor') : navigate(`/doctor/Neurologist`) } className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 dark:border-gray-600 rounded transition-all cursor-pointer ${speciality === "Neurologist" ? "bg-indigo-100 dark:bg-blue-900 text-black dark:text-white":"dark:bg-slate-700"} `} >Neurologist</p>
          <p onClick={()=> speciality=== 'Gastroenterologist' ? navigate('/doctor') : navigate(`/doctor/Gastroenterologist`) } className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 dark:border-gray-600 rounded transition-all cursor-pointer ${speciality === "Gastroenterologist" ? "bg-indigo-100 dark:bg-blue-900 text-black dark:text-white":"dark:bg-slate-700"} `} >Gastroenterologist</p>
        </div>

        <div className='w-full grid grid-cols-auto gap-4 gap-y-6'>
          { 
          filteredDoc.map((item,index)=>(
            <div onClick={()=> navigate(`/appointment/${item._id}`)} key={index} className="border border-blue-200 dark:border-gray-600 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-300 bg-white dark:bg-slate-700">
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

            </div> ))
          }
        </div>
      </div>
    </div>
  );
}

export default Doctor;    