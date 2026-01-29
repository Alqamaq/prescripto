import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import {assets} from '../assets/assets.js'
import axios from 'axios'
import { toast }from 'react-toastify'

const MyProfile = () => {

  const{userData, setUserData, token , backendUrl, loadUserProfileData} = useContext(AppContext)

  const [isEdit, setIsEdit] = useState(false)
  const [image, setImage] = useState(false)

  const updateUserProfileData = async ()=>{

    try {
      const formData = new FormData()

      formData.append('name', userData.name)
      formData.append('phone', userData.phone)
      formData.append('dob', userData.dob)
      formData.append('address',JSON.stringify(userData.address))
      formData.append('gender', userData.gender)

      image && formData.append('image', image)

      const {data} = await axios.post(backendUrl+ '/api/user/update-profile', formData,{headers:{token}})
      if(data.success){
        toast.success(data.message)
        await loadUserProfileData()
        setIsEdit(false)
        setImage(false)
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message)
      
      
    }

  }

  return  userData && (
    <div className='flex flex-col gap-2 max-w-lg text-sm'>
      {
        isEdit ? <label htmlFor="image">

          <div className='inline-block relative cursor-pointer'>
            <img className='w-36 rounded opacity-75' src={image ? URL.createObjectURL(image) : userData.image} alt="" />
            <img className='w-10 absolute bottom-12 right-12' src={image ? '' : assets.upload_icon} alt="" />
          </div>
          <input onChange={(e)=> setImage(e.target.files[0])} type="file" id='image' hidden/>

        </label>
        : <img className='w-36 rounded' src={userData.image} alt="" />
      }

      
      {
        isEdit
          ? <input className='bg-gray-50 dark:bg-slate-700 dark:text-white text-3xl font-medium max-w-60 mt-4' type="text" value={userData.name} onChange={(e) => setUserData(prev => ({ ...prev, name: e.target.value }))} />
          : <p className='font-medium text-3xl text-neutral-800 dark:text-white mt-4'>{userData.name}</p>
      }

      <hr className='bg-zinc-400 dark:bg-gray-600 border-none h-[1px]' />

      <div>
        <p className='text-neutral-500 dark:text-gray-400 underline mt-1'>CONTACT INFORMATION</p>
        <div className='grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700 dark:text-gray-300'>
          <p className='font-medium dark:text-white'> Email id:</p>
          <p className='text-blue-500 dark:text-blue-400'>{userData.email}</p>
          <p className='font-medium dark:text-white'>Phone:</p>
          {
            isEdit
              ? <input  className='max-w-20 bg-gray-100 dark:bg-slate-700 dark:text-white dark:border-gray-600' type="text" value={userData.phone} onChange={(e) => setUserData(prev => ({ ...prev, phone: e.target.value }))} />
              : <p className='text-blue-500 dark:text-blue-400'>{userData.phone}</p>
          }
          <p className='font-medium dark:text-white'>Addres:</p>
          {
            isEdit
              ? <p>
                <input className='bg-gray-50 dark:bg-slate-700 dark:text-white dark:border-gray-600 w-full mb-1' value={userData.address.line1} onChange={(e) => setUserData(prev => ({ ...prev, address: { ...prev.address, line1: e.target.value } }))} type="text" />
                <br />
                <input className='bg-gray-50 dark:bg-slate-700 dark:text-white dark:border-gray-600 w-full' value={userData.address.line2} onChange={(e) => setUserData(prev => ({ ...prev, address: { ...prev.address, line2: e.target.value } }))} type="text" />
              </p>
              : <p className='text-gray-500 dark:text-gray-400'>{userData.address.line1}
                <br />
                {userData.address.line2}
              </p>

          }
        </div>
      </div>

      <div>
        <p className='text-neutral-500 underline mt-1'>BASIC INFORMATION</p>
        <div className='grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 tex-neutral-700'>
          <p className='font-medium dark:text-white'>GENDER:</p>
          {
            isEdit
              ? <select className='max-w-20 bg-gray-100 dark:bg-slate-700 dark:text-white dark:border-gray-600' value={userData.gender} onChange={(e) => setUserData(prev => ({ ...prev, gender: e.target.value }))}>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
              : <p className='text-gray-400 dark:text-gray-500'>{userData.gender}</p>
          }
          <p className='font-medium dark:text-white'>Date of Birth</p>
          {
            isEdit
              ? <input className='max-w-28 bg-gray-100 dark:bg-slate-700 dark:text-white dark:border-gray-600' type="date" value={userData.dob} onChange={(e) => setUserData(prev => ({ ...prev, dob: e.target.value }))} />
              : <p className='text-gray-400 dark:text-gray-500'>{userData.dob}</p>

          }
       </div>

       </div>

       <div>
          {
            isEdit
              ? <button className='border border-primary rounded-full px-8 py-2 hover:bg-primary hover:text-white transition dark:text-white' onClick={updateUserProfileData}>Save Information</button>
              : <button className='border border-primary rounded-full px-8 py-2 hover:bg-primary hover:text-white transition dark:text-white' onClick={() => (setIsEdit(true))}>Edit</button>
          }
        </div>



    </div>
  );
}

export default MyProfile;    