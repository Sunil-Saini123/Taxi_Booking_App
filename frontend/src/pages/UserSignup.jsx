import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserDataContext } from '../context/UserContext';
import axios from 'axios';

const UserSignup = () => {

    const [firstname, setfirstname] = useState('');
    const [lastname, setlastname] = useState('');
    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');

    const {user,setuser}=useContext(UserDataContext)
    const navigate=useNavigate();

    const submitHandler=async (e)=>{
        e.preventDefault();

        const newUser={
            fullname:{
                firstname:firstname,
                lastname:lastname
            },
            email:email,
            password:password
        }

        const res=await axios.post(`${import.meta.env.VITE_BASE_URL}/user/register`,newUser);
        
        if(res.status==201){
            const data=res.data;
            setuser(data.user);
            localStorage.setItem('usertoken',data.token);
            localStorage.setItem('role','user');
            navigate('/home');
        }

        setemail('');
        setfirstname('');
        setlastname('');
        setpassword('');

    }


  return (
      <div className=' p-5 h-screen flex flex-col justify-between'>
        <div >
            <h1 className="w-25 text-2xl font-bold tracking-tight">T A X I</h1>
            <div className=" w-18 border-b-3 "></div>
        </div>
        
        <form
        onSubmit={(e)=>{
            submitHandler(e)
        }} 
        className='mb-35' >

            <h3 className='text-lg font-medium mt-5 mb-3'>Enter Your Name</h3>
            <div className='flex gap-2 items-center '>
                <input required
                value={firstname}
                onChange={(e)=>{
                    setfirstname(e.target.value);
                }}
                className='bg-[#eeeeee]  rounded px-4 py-2 border w-full placeholder:text-base' type="text" placeholder='firstname' />
                
                <input 
                value={lastname}
                onChange={(e)=>{
                    setlastname(e.target.value);
                }}
                className='bg-[#eeeeee] rounded px-4 py-2 border w-full placeholder:text-base' type="text" placeholder='lastname' />
            </div>
            
            <h3 className='text-lg font-medium mt-5 mb-3'>Enter Your Email</h3>
            <input required
            value={email}
            onChange={(e)=>{
                setemail(e.target.value);
            }} 
            className='bg-[#eeeeee] mb-5 rounded px-4 py-2 border w-full text-lg placeholder:text-base' type="email" placeholder='email@gmail.com' />

            <h3 className='text-lg font-medium mb-3'>Enter Password</h3>
            <input required
            value={password}
            onChange={(e)=>{
                setpassword(e.target.value);
            }} 
            className='bg-[#eeeeee] mb-10 w-full border rounded py-2 px-4 text-lg placeholder:text-base' type="password" placeholder='password' />

            <button className='w-full flex justify-center items-center py-3 text-lg rounded-lg font-medium mb-2 bg-black text-white'>Create Account</button>

            <p className='text-center'> Already have a account? <Link to='/login' className='text-blue-600'>Login here</Link></p>
        </form>
       
    </div>
  )
}

export default UserSignup
