import React, { useContext } from "react";
import { AdminContext } from "../context/AdminContext";
import { NavLink } from "react-router-dom";
import { assets } from "../assets/assets";
import { DoctorContext } from "../context/DoctorContext";

const Sidebar = ()=>{

    const {aToken} = useContext(AdminContext)
    const {dToken} = useContext(DoctorContext);

    return (
        <div className="min-h-screen bg-white dark:bg-slate-800 border-r border-gray-200 dark:border-gray-700">
            {
                aToken && <ul className="text-gray-700 dark:text-gray-300 mt-5">
                    <NavLink  to={'/admin-dashboard'} className={({isActive})=>`flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer transition ${isActive ? 'bg-blue-100 dark:bg-blue-900 border-r-4 border-primary': ''}`}>
                       <img src={assets.home_icon} alt="" />
                       <p>Dashboard</p>
                    </NavLink>

                    <NavLink to={'/all-appointements'} className={({isActive})=>`flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer transition ${isActive ? 'bg-blue-100 dark:bg-blue-900 border-r-4 border-primary': ''}`} >
                       <img src={assets.appointment_icon} alt="" />
                       <p>Appointement</p>
                    </NavLink>

                    <NavLink to={'/add-doctor'} className={({isActive})=>`flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer transition ${isActive ? 'bg-blue-100 dark:bg-blue-900 border-r-4 border-primary': ''}`}>
                       <img src={assets.add_icon} alt="" />
                       <p>Add Doctor</p>
                    </NavLink>

                    <NavLink to={'/doctor-list'} className={({isActive})=>`flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer transition ${isActive ? 'bg-blue-100 dark:bg-blue-900 border-r-4 border-primary': ''}`}>
                       <img src={assets.people_icon} alt="" />
                       <p>Doctor List</p>
                    </NavLink>
                </ul>
            }
            {
                dToken && <ul className="text-gray-700 dark:text-gray-300 mt-5">
                    <NavLink  to={'/doctor-dashboard'} className={({isActive})=>`flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer transition ${isActive ? 'bg-blue-100 dark:bg-blue-900 border-r-4 border-primary': ''}`}>
                       <img src={assets.home_icon} alt="" />
                       <p>Dashboard</p>
                    </NavLink>

                    <NavLink to={'/doctor-appointments'} className={({isActive})=>`flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer transition ${isActive ? 'bg-blue-100 dark:bg-blue-900 border-r-4 border-primary': ''}`} >
                       <img src={assets.appointment_icon} alt="" />
                       <p>Appointement</p>
                    </NavLink>

                    <NavLink to={'/doctor-profile'} className={({isActive})=>`flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer transition ${isActive ? 'bg-blue-100 dark:bg-blue-900 border-r-4 border-primary': ''}`}>
                       <img src={assets.add_icon} alt="" />
                       <p>Doctor Profile</p>
                    </NavLink>

                </ul>
            }
        </div>
    )
}

export default Sidebar