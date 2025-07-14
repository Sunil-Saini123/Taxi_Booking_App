import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {UserDataContext} from '../context/UserContext'
import axios from 'axios'

const UserLogin = () => {

    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');

    const {user,setuser}=useContext(UserDataContext);
    const navigate=useNavigate();

    const submitHandler =async (e)=>{
        e.preventDefault();

        const userData={
            email:email,
            password:password
        }

       try {
            const res= await axios.post(`${import.meta.env.VITE_BASE_URL}/user/login`,userData);

            if(res.status==200){
                const data=res.data;
                setuser(data.user);
                localStorage.setItem('usertoken',data.token);
                localStorage.setItem('role','user');
                navigate('/home')
            }
       } catch (error) {
            console.log(error)
       }
        setemail('');
        setpassword('');
    }


  return (
    <div className=' p-5 h-screen flex flex-col justify-between'>

        <div >
            <h1 className="w-25 text-2xl font-bold tracking-tight">T A X I</h1>
            <div className=" w-18 border-b-3 "></div>
        </div>
        
        <form onSubmit={(e)=>{
                submitHandler(e)
            }} className='mb-40' >

            <h3 className='text-lg font-medium mt-5 mb-3'>Enter Your Email</h3>
            <input 
             required 
             value={email} 
             onChange={(e)=>{
                setemail(e.target.value)
             }}
             className='bg-[#eeeeee] mb-5 rounded px-4 py-2 border w-full text-lg placeholder:text-base' type="email" placeholder='email@gmail.com' />

            <h3 className='text-lg font-medium mb-3'>Enter Password</h3>
            <input
             required 
             value={password} 
             onChange={(e)=>{
                setpassword(e.target.value)
            }} className='bg-[#eeeeee] mb-10 w-full border rounded py-2 px-4 text-lg placeholder:text-base' type="password" placeholder='password' />

            <button className='w-full flex justify-center items-center py-3 text-lg rounded-lg font-medium mb-2 bg-black text-white'>Login</button>
            <p className='text-center'>New here? <Link to='/signup' className='text-blue-600'>Create new Account</Link></p>
        </form>

        <div>
        <Link to='/captain-login' className='w-full  flex justify-center items-center p-3 text-xl rounded-lg font-medium mb-2 bg-[#10b461] '><button>Sign in as Captain</button></Link>
        </div>
    </div>
  )
}

export default UserLogin
