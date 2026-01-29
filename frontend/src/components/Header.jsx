import React from 'react';
import {assets} from "../assets/assets";


const Header = () => {
    return(
        <div className='flex flex-col md:flex-row flex-wrap rounded-lg px-6 bg-primary dark:bg-blue-800 md:px-10 lg:20'>
           {/* -----------Left--------- */}
           <div className='md:w-1/2 flex flex-col items-start justify-center text-white py-10 gap-4 m-auto md:py-[10vw] md:mb-[-30px]'>
              <p className='text-3xl md:text-4xl lg:text-5xl text-white font-semibold leading-tight md:leading-tight lg:leading-tight'>Book Appointement  <br /> With Trusted Doctors</p>
              <div className='flex flex-col md:flex-row items-center gap-3 text-small font-lights'>
                 <img className='w-28' src={assets.group_profiles} alt="" />
                 <p>Simply through our extensive list of trusted doctor,<br />
                 schedle an appointment at your convenience.
                 </p>
              </div>
              <a href="" className='flex items-center gap-3 bg-white text-primary px-8 py-3 text-sm rounded-full m-auto md:m-0 hover:scale-105 transition-all duration-300 font-medium'>Book Appointement <img className='w-4' src={assets.arrow_icon} alt="" /></a>
  
            </div>
           {/* -----------Right--------- */}
           <div className='md:w-1/2 relative'>
                <img className='w-full md:absolute bottom-0 rounded-lg h-auto'src={assets.header_img} alt="header img" />

           </div>
        </div>
    )
}

export default Header;