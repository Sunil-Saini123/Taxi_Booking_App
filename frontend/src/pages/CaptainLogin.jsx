import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CaptainDataContext } from "../context/CaptainContext";
import axios from "axios";

const CaptainLogin = () => {

    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');

    const {captain,setcaptain}=useContext(CaptainDataContext);
    const navigate=useNavigate();

    const submitHandler =async (e)=>{
        e.preventDefault();

        const userData={
            email: email,
            password:password
        }

        try {
          const res= await axios.post(`${import.meta.env.VITE_BASE_URL}/captain/login`,userData);

          if(res.status==200){
              const data=res.data;
              setcaptain(data.captain);
              localStorage.setItem('captaintoken',data.token);
              localStorage.setItem('role','captain');
              localStorage.setItem('captain',JSON.stringify(data.captain));
              navigate('/captain-home')
          }
          
        } catch (error) {
            console.log(error);
        }

        setemail('');
        setpassword('');
    }



  return (
    <div className="p-6 h-screen flex flex-col justify-between bg-gray-50">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-extrabold text-gray-900 tracking-wide">T A X I</h1>
        <div className="w-16 border-b-4 border-yellow-500 mt-1"></div>
      </div>

      {/* Login Form */}
      <form 
      onSubmit={(e)=>{
        submitHandler(e)
      }} 
      className="mb-40">
        <h3 className="text-lg font-semibold text-gray-800 mb-3">Enter Your Email</h3>
        <input
          required
          value={email}
          onChange={(e)=>{
            setemail(e.target.value)
          }}
          type="email"
          placeholder="email@gmail.com"
          className="bg-[#eeeeee] border rounded-lg px-4 py-2 w-full text-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500"
        />

        <h3 className="text-lg font-semibold text-gray-800 mt-5 mb-3">Enter Password</h3>
        <input
          required
          value={password}
          onChange={(e)=>{
            setpassword(e.target.value)
          }}
          type="password"
          placeholder="password"
          className="bg-[#eeeeee] border rounded-lg px-4 py-2 w-full text-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500"
        />

        {/* Login Button */}
        <button className="w-full flex justify-center items-center py-3 text-lg rounded-lg font-medium mt-6 bg-black text-white ">
          Login
        </button>

        {/* Signup Link */}
        <p className="text-center text-gray-600 mt-4">
          New here?{" "}
          <Link to="/captain-signup" className="text-yellow-600 font-medium hover:underline">
            Register as Captain
          </Link>
        </p>
      </form>

      {/* Sign in as User */}
      <div>
        <Link
          to="/login"
          className="w-full flex justify-center items-center py-3 text-lg rounded-lg font-medium bg-[#d96b17]  text-white "
        >
          Sign in as User
        </Link>
      </div>
    </div>
  );
};

export default CaptainLogin;
