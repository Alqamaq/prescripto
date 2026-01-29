import React from "react";
import {assets} from "../assets/assets";


const Footer=()=>{
    return(
        
        <div className="md:mx-10">
            <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">
                <div>
                    <img className="mb-5 w-40" src={assets.logo} alt="" />
                    <p className="w-full md:w-2/3 text-gray-600 dark:text-gray-400 leading-6">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris kdskf, </p>
                </div>
                <div>
                    <p className="text-xl font-medium mb-5 text-gray-800 dark:text-white">COMPANY</p>
                    <ul className="flex flex-col text-gray-600 dark:text-gray-400 gap-2">
                        <li className="hover:text-gray-900 dark:hover:text-gray-300 transition cursor-pointer">Home</li>
                        <li className="hover:text-gray-900 dark:hover:text-gray-300 transition cursor-pointer">About us</li>
                        <li className="hover:text-gray-900 dark:hover:text-gray-300 transition cursor-pointer">Contact</li>
                        <li className="hover:text-gray-900 dark:hover:text-gray-300 transition cursor-pointer">Our Policy</li>
                    </ul>
                </div>
                <div>
                    <p className="text-xl font-medium mb-5 text-gray-800 dark:text-white">Get in touch</p>
                    <ul className="flex flex-col gap-2 text-gray-600 dark:text-gray-400">
                        <li>0834-7483888</li>
                        <li>prescriptoAvali@gmail.com</li>
                    </ul>
                </div>
            </div>


           <div className="font-sm border-t border-gray-300 dark:border-gray-600 bg-white dark:bg-slate-800 text-gray-800 dark:text-gray-300 text-center py-6 mt-10">
              <p>&copy; 2024 Prescripto. All rights reserved.</p>
            </div>
        </div>
    );
};  

export default Footer;