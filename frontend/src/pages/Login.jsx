import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import axios from 'axios'
import { toast} from 'react-toastify'
import { useNavigate } from 'react-router-dom';

const Login = () => {

  const {token, setToken, backendUrl} = useContext(AppContext)
  const navigate= useNavigate()

  const [state, setState] = useState('Sign Up')

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const eventHandler = async (event) => {
    event.preventDefault();

    try {

      if(state === 'Sign Up'){
        const {data} = await axios.post(backendUrl + '/api/user/register',{name, email, password})
        if(data.success){
          localStorage.setItem('token',data.token)
          setToken(data.token)
        }
        else{
           toast.error(data.message)
        }
      }else{

        const {data} = await axios.post(backendUrl + '/api/user/login',{ email, password})
        if(data.success){
          localStorage.setItem('token',data.token)
          setToken(data.token)
        }
        else{
           toast.error(data.message)
        }

      }

    } catch (error) {
      toast.error(error.message)
      
    }

  }

  useEffect(()=>{
    if(token){
      navigate('/')
    }
  },[token])   

  return (
    <form onSubmit={eventHandler} className='min-h-[80vh] flex items-center'>
      <div className='flex flex-col gap-3 m-auto p-5 items-start min-w-[340px] sm:min-w-96 border border-gray-300 dark:border-gray-600 rounded-xl text-sm shadow-lg text-gray-600 dark:text-gray-300 bg-white dark:bg-slate-800'>
        <p className='text-2xl font-semibold text-black dark:text-white' >{state === 'Sign Up' ? "Create Account" : "Login"}</p>
        <p>{state === 'Sign Up' ? "Sign Up" : "Login"} Please Sign Up to book Appointement</p>
        {
          state === 'Sign Up'
          &&
          <div className='w-full'>
            <p className='w-full'>Full Name</p>
            <input className='w-full border border-gray-300 dark:border-gray-600 dark:bg-slate-700 rounded mt-1 p-2 focus:outline-none focus:ring-2 focus:ring-primary' type="text" onChange={(e) => setName(e.target.value)} value={name} />
          </div>
        }

        <div className='w-full'>
          <p className='w-full'>Email</p>
          <input className='border border-gray-300 dark:border-gray-600 dark:bg-slate-700 rounded mt-1 p-2 w-full focus:outline-none focus:ring-2 focus:ring-primary' type="text" onChange={(e) => setEmail(e.target.value)} value={email} />
        </div>
        <div className='w-full'>
          <p className='w-full'>Password</p>
          <input className='w-full border border-gray-300 dark:border-gray-600 dark:bg-slate-700 rounded mt-1 p-2 focus:outline-none focus:ring-2 focus:ring-primary' type="text" onChange={(e) => setPassword(e.target.value)} value={password} />
        </div>
        <button type='submit' className='bg-primary hover:bg-blue-600 text-white rounded-md w-full py-2 text-base transition' onSubmit={() => eventHandler()}>{state === 'Sign Up' ? "Create Account" : "Login"}</button>
        {
          state === 'Sign Up'
            ? <p>Already have an Account? <span onClick={() => setState('Login')} className='text-primary underline cursor-pointer' >Login here</span></p>
            : <p>Create a new account?<span onClick={() => setState('Sign Up')} className='text-primary underline cursor-pointer' >Click here</span></p>
        }


      </div>

    </form>
  );
}

export default Login;    