import React, { useContext } from "react";
import { assets } from "../assets/assets";
import { AdminContext } from "../context/AdminContext.jsx";
import { ThemeContext } from "../context/ThemeContext.jsx";
import { useNavigate } from 'react-router-dom'

const Navbar = () => {

    const { aToken, setAToken } = useContext(AdminContext)
    const { isDark, toggleTheme } = useContext(ThemeContext)
    const navigate = useNavigate()

    const logOutBtn = () => {
        navigate('/')
        aToken && setAToken('')
        aToken && localStorage.removeItem('aToken')
    }

    return (
        <div className="flex items-center justify-between px-4 sm:px-10 py-3 border-b bg-white dark:bg-slate-800 border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-2 text-xs">
                <img src={assets.admin_logo} alt="" className="w-36 sm:w-40 cursor-pointer" />
                <p className="border px-2.5 py-0.5 text-center rounded-full border-gray-500 text-gray-600 dark:text-gray-400 dark:border-gray-500">{aToken ? 'Admin' : 'Doctor'}</p>
            </div>
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
                <button onClick={logOutBtn} className="bg-primary text-white text-sm px-10 py-2 rounded-full hover:bg-blue-600 transition">LogOut</button>
            </div>
        </div>
    )
}

export default Navbar