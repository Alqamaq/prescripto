import React, { useState,useContext } from "react";
import { assets } from "../../assets/assets";
import {AdminContext} from '../../context/AdminContext.jsx'
import {toast} from 'react-toastify'
import axios from 'axios'

const AddDoctors = () => {

    const [docImg ,setDocImg] = useState(false);
    const [email , setEmail] = useState('')
    const [name, setName] = useState('')
    const [password , setPassword] = useState('');
    const [experience, setExperience] = useState('Year 1')
    const [fees, setFees] = useState('');
    const [about, setAbout] = useState('');
    const [speciality , setSpeciality] = useState('General Physician')
    const [degree , setDegree] = useState('')
    const [address1, setAddress1] = useState('')
    const [address2, setAddress2] = useState('')

    const {backendUrl, aToken} = useContext(AdminContext)

    const onSubmitHandler =async (event)=>{
        event.preventDefault()

        try {
            if(!docImg){
               return toast.error('Image Not Selected')

            }
            const formData = new FormData()
            formData.append('image', docImg);
            formData.append('name', name);
            formData.append('email', email);
            formData.append('password', password);
            formData.append('speciality', speciality);
            formData.append('experience', experience);
            formData.append('degree', degree);
            formData.append('fees', Number(fees));
            formData.append('address', JSON.stringify({line1:address1,line2:address2}));
            formData.append('about', about);
            
            // console log formData

            formData.forEach((value,key)=>{
                console.log(`${key}: ${value}`);
                
            })

            const {data} = await axios.post(backendUrl + '/api/admin/add-doctor',formData,{headers:{ aToken }})

            if (data.success) {
                toast.success(data.message)
                setDocImg(false)
                setAbout('')
                setName('')
                setEmail('')
                setFees('')
                setPassword('')
                setAddress1('')
                setAddress2('')
                setDegree('')
            } else {
                toast.error(data.message)
            }
            
        } catch (error) {

           toast.error(error.message) 
           console.log(error);
           
            
        }

    }



    return (
        <form className="m-5 w-full" onSubmit={onSubmitHandler}>
            <p className="mb-3 text-lg font-medium text-gray-800 dark:text-white">Add Doctors</p>

            <div className="bg-white dark:bg-slate-800 px-8 py-8 border border-gray-200 dark:border-gray-700 rounded w-full max-w-4xl max-h-[80vh] overflow-y-scroll">
                <div className="flex items-center text-gray-500 dark:text-gray-400 gap-4 mb-8">
                    <label htmlFor="doc-img">
                        <img className="w-16 bg-gray-100 dark:bg-slate-700 rounded-full cursor-pointer" src={docImg ? URL.createObjectURL(docImg):assets.upload_area} alt="" />
                    </label>
                    <input onChange={(e) => setDocImg(e.target.files[0])} type="file" id="doc-img" hidden />
                    <p>Upload doctor <br /> image</p>
                </div>

                <div className="flex flex-col lg:flex-row items-start gap-10 text-gray-600 dark:text-gray-400">
                    <div className="w-full lg:flex-1 flex flex-col gap-4 ">
                        <div className="flex-1 flex flex-col gap-1">
                            <p className="dark:text-gray-300">Doctor Name</p>
                                <input onChange={(e) => setName(e.target.value)} value={name} className="border border-gray-300 dark:border-gray-600 dark:bg-slate-700 dark:text-white rounded px-3 py-2" type="text" placeholder="Your Name" required />
                        </div>

                        <div className="flex-1 flex flex-col gap-1">
                            <p className="dark:text-gray-300">Doctor Email</p>
                            <input onChange={(e) => setEmail(e.target.value)} value={email} className="border border-gray-300 dark:border-gray-600 dark:bg-slate-700 dark:text-white rounded px-3 py-2" type="email" placeholder="Email" required />
                        </div>

                        <div className="flex-1 flex flex-col gap-1">
                            <p className="dark:text-gray-300">Password</p>
                            <input  onChange={(e) => setPassword(e.target.value)} value={password} className="border border-gray-300 dark:border-gray-600 dark:bg-slate-700 dark:text-white rounded px-3 py-2" type="password" placeholder="Password" required />
                        </div>
                        <div className="flex-1 flex flex-col gap-1">
                            <p className="dark:text-gray-300">Experience</p>
                            <select  onChange={(e) => setExperience(e.target.value)} value={experience} className="border border-gray-300 dark:border-gray-600 dark:bg-slate-700 dark:text-white rounded px-3 py-2" name="docExperience" id="experience">
                                <option value="1 Year">1 Year</option>
                                <option value="2 Year">2 Year</option>
                                <option value="3 Year">3 Year</option>
                                <option value="4 Year">4 Year</option>
                                <option value="5 Year">5 Year</option>
                                <option value="6 year">6 Year</option>
                                <option value="7 Year">7 Year</option>
                                <option value="8 Year">8 Year</option>
                                <option value="9 Year">9 Year</option>
                                <option value="10 Year">10 Year</option>
                            </select>
                        </div>
                        <div className="flex-1 flex flex-col gap-1">
                            <p className="dark:text-gray-300">Fees</p>
                            <input onChange={(e) => setFees(e.target.value)} value={fees} className="border border-gray-300 dark:border-gray-600 dark:bg-slate-700 dark:text-white rounded px-3 py-2" type="number" placeholder="fees" required />
                        </div>
                    </div>

                    <div className="w-full lg:flex-1 flex flex-col gap-4">
                        <div className="flex-1 flex flex-col gap-1">
                            <p className="dark:text-gray-300">Speciality</p>
                            <select onChange={(e) => setSpeciality(e.target.value)} value={speciality} className="border border-gray-300 dark:border-gray-600 dark:bg-slate-700 dark:text-white rounded px-3 py-2" name="docSpecislitu" id="speciality">
                                <option value="General physician">General physician</option>
                                <option value="Gynecologist">Gynecologist</option>
                                <option value="Dermatologist">Dermatologist</option>
                                <option value="Pediatricians">Pediatricians</option>
                                <option value="Neurologist">Neurologist</option>
                                <option value="Gastroenterologist">Gastroenterologist</option>
                            </select>
                        </div>
                        <div className="flex-1 flex flex-col gap-1">
                            <p className="dark:text-gray-300">Education</p>
                            <input onChange={(e) => setDegree(e.target.value)} value={degree} className="border border-gray-300 dark:border-gray-600 dark:bg-slate-700 dark:text-white rounded px-3 py-2" type="text" placeholder="Education" required />
                        </div>

                        <div className="flex-1 flex flex-col gap-1">
                            <p className="dark:text-gray-300">Address</p>
                            <input onChange={(e) => setAddress1(e.target.value)} value={address1} className="border border-gray-300 dark:border-gray-600 dark:bg-slate-700 dark:text-white rounded px-3 py-2" type="text" placeholder="address 1" required />
                            <input onChange={(e) => setAddress2(e.target.value)} value={address2} className="border border-gray-300 dark:border-gray-600 dark:bg-slate-700 dark:text-white rounded px-3 py-2" type="text" placeholder="address 2" required />
                        </div>

                       
                    </div>

                </div>
                 <div className="mt-4 mb-2">
                            <p className="dark:text-gray-300">About Doctor</p>
                            <textarea className="w-full px-4 pt-2 border border-gray-300 dark:border-gray-600 dark:bg-slate-700 dark:text-white rounded" onChange={(e) => setAbout(e.target.value)} value={about} rows={5} type="text" placeholder="write about doctor" required />
                        </div>

                <button  type='submit' className="bg-primary hover:bg-blue-600 text-white px-10 py-3 mt-4 rounded-full transition">Add Doctor</button>
                
            </div>
        </form>
    )
}

export default AddDoctors;