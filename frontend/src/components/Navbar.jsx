import React, { use, useContext } from "react";
import {assets} from "../assets/assets";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { ThemeContext } from "../context/ThemeContext";

const Navbar = () => {

    const navigate= useNavigate();
    const [showMenu, setShowMenu] = React.useState(false);
    const {token,setToken, userData} = useContext(AppContext)
    const {isDark, toggleTheme} = useContext(ThemeContext)

    const logOut = ()=>{
      setToken(false)
      localStorage.removeItem('token')
    }



  return (
    <div className="flex items-center justify-between py-4 mb-5 border-b border-b-gray-300 dark:border-b-gray-600 bg-white dark:bg-slate-800">
        <img className="w-44 cursor-pointer" src={assets.logo} alt="Logo" />
        {/* md:flex means show from medium devices and above */}
        <ul className="hidden md:flex items-start gap-5 font-medium text-gray-700 dark:text-gray-300">
          <NavLink to="/">
            <li className="py-1 hover:text-primary dark:hover:text-blue-400 transition">HOME</li>
            <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden"/> 
          </NavLink>
          <NavLink to='/doctor'>
            <li className="py-1 hover:text-primary dark:hover:text-blue-400 transition">ALL DOCTORS</li>
            <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden"/> 
          </NavLink>
          <NavLink to='/about'>
            <li className="py-1 hover:text-primary dark:hover:text-blue-400 transition">ABOUT</li>
            <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden"/> 
          </NavLink>
          <NavLink to='/contact'>
            <li className="py-1 hover:text-primary dark:hover:text-blue-400 transition">CONTACT</li>
            <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden"/> 
          </NavLink>
        </ul>

        <div className="flex items-center gap-4">
            <button
                onClick={toggleTheme}
                className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-yellow-400 transition"
                title="Toggle dark mode"
            >
                {isDark ? (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l-2.12-2.12a4 4 0 00-5.656 0l-.707.707a1 1 0 001.414 1.414l.707-.707a2 2 0 012.828 0l2.12 2.12a1 1 0 001.414-1.414zM2.05 13.536A1 1 0 103.464 12.12 7 7 0 1016.97 6.05a1 1 0 00-1.414-1.414A5 5 0 102.05 13.536z" clipRule="evenodd" />
                    </svg>
                ) : (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                    </svg>
                )}
            </button>
            {token && userData ? 
            <div className="flex items-center gap-2 cursor-pointer group relative">
              <img className="w-8 rounded-full" src={userData.image} alt="profile" />
              <img className="w-2.5" src={assets.dropdown_icon} alt="icon" />
              <div className="absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 dark:text-gray-300 z-20 hidden group-hover:block">
                <div className="min-w-48 bg-stone-100 dark:bg-slate-700 rounded flex flex-col gap-4 p-4">
                  <p onClick={()=> navigate('/my-profile')} className="hover:text-primary dark:hover:text-blue-400 cursor-pointer transition">My Profile</p>
                  <p onClick={()=> navigate('/my-appointments')} className="hover:text-primary dark:hover:text-blue-400 cursor-pointer transition">My Appointement</p>
                  <p onClick={ logOut } className="hover:text-primary dark:hover:text-blue-400 cursor-pointer transition">Logout</p>
                </div>
              </div>
              

            </div>
            :
            <button onClick={()=> navigate('/login')} className="flex items-center bg-primary px-8 py-3 rounded-full text-white font-light hidden md:block hover:bg-blue-600 transition">Create account</button>

            }
            <img onClick={()=>setShowMenu(true)} className="w-6 md:hidden " src={assets.dropdown_icon} alt="" />
            {/*------------Mobile Menu--------- */}
            <div className={`${showMenu ? 'fixed w-full': 'h-0 w-0'} md:hidden right-0 top-0 bottom-0 z-20 overflow-hidden bg-white dark:bg-slate-800 transition-all`}>
              <div className="flex items-center px-5 py-6 justify-between ">
                <img className="w-36" src={assets.logo} alt="" />
                <img className="w-7" src={assets.cross_icon} onClick={()=> setShowMenu(false)} alt="" />
              </div>
              <ul className="flex flex-col items-center gap-2 mt-5 px-5 text-lg font-medium text-gray-700 dark:text-gray-300">
                <NavLink  onClick={()=> setShowMenu(false)}  to="/"><p className="px-4 py-2 rounded inline-block hover:text-primary dark:hover:text-blue-400">Home</p></NavLink>
                <NavLink  onClick={()=> setShowMenu(false)}  to='/doctor'><p className="px-4 py-2 rounded inline-block hover:text-primary dark:hover:text-blue-400">ALL DOCTORS</p></NavLink>
                <NavLink  onClick={()=> setShowMenu(false)}  to='/about'><p className="px-4 py-2 rounded inline-block hover:text-primary dark:hover:text-blue-400">ABOUT</p></NavLink>
                <NavLink  onClick={()=> setShowMenu(false)}  to='/contact'><p className="px-4 py-2 rounded inline-block hover:text-primary dark:hover:text-blue-400">CONTACT</p></NavLink>
              </ul>
            </div>
        </div>

    </div> 
    );
};
export default Navbar;   