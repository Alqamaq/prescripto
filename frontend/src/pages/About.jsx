import React from 'react';
import { assets } from '../assets/assets';

const About = () => {
  return (
    <div>

      <div className='text-center mt-10 font-2xl text-gray-500 dark:text-gray-400'>
        <p>ABOUT <span className='text-gray-700 dark:text-white font-medium'>US</span></p>
      </div>

      <div className='flex flex-col my-10 sm:flex-row gap-12'>        
        <img className="bg-primary dark:bg-blue-700 w-full sm:max-w-72 rounded-lg" src={assets.about_image} alt="" />
        <div className="flex flex-col justify-center gap-6 text-gray-600 dark:text-gray-400 text-sm bg-white dark:bg-slate-800 mx-2 rounded-lg p-6">
          <p>lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
          <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>         
          <b className='text-gray-800 dark:text-white'>Our Mission</b>
          <p>To provide the best ealthcare services to our community.</p>
        </div>
      </div>

      <div className='text-center mt-10 font-2xl text-gray-500 dark:text-gray-400'>
        <p>WHY <span className='text-gray-700 dark:text-white font-medium'>CHOOSE US</span></p>
      </div>

      <div className="flex flex-col md:flex-row mb-20 mt-4">
        <div className="border border-gray-300 dark:border-gray-600 px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white dark:hover:text-white transition-all duration-300 text-gray-600 dark:text-gray-400 cursor-pointer dark:hover:bg-blue-700">
          <b>Efficiency:</b>
          <p>
            Streamlined appointment scheduling that fits into your busy
            lifestyle.
          </p>
        </div>
        <div className="border border-gray-300 dark:border-gray-600 px-10 md:px-15 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white dark:hover:text-white transition-all duration-300 text-gray-600 dark:text-gray-400 cursor-pointer dark:hover:bg-blue-700">
          <b>Convenience:</b>
          <p>
            Access to a network of trusted healthcare professionals in your
            area.
          </p>
        </div>
        <div className="border border-gray-300 dark:border-gray-600 px-10 md:px-15 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white dark:hover:text-white transition-all duration-300 text-gray-600 dark:text-gray-400 cursor-pointer dark:hover:bg-blue-700">
          <b>Personalization:</b>
          <p>
            Tailored recommendations and reminders to help you stay on top
            of your health.
          </p>
        </div>
      <div/>

    </div>  
    </div>
  );
}

export default About;    