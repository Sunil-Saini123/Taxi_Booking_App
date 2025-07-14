import axios from "axios";
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CaptainDataContext } from "../context/CaptainContext";

const CaptainSignup = () => {
  const [firstname, setfirstname] = useState("");
  const [lastname, setlastname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [color, setcolor] = useState("");
  const [plate, setplate] = useState("");
  const [capacity, setcapacity] = useState("");
  const [type, setType] = useState("taxi");

  const { captain, setcaptain } = useContext(CaptainDataContext);
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();

    const newCaptain = {
      fullname: {
        firstname: firstname,
        lastname: lastname,
      },
      email: email,
      password: password,
      vehicle: {
        color: color,
        plate: plate,
        capacity: capacity,
        type: type,
      },
    };

    const res = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/captain/register`,
      newCaptain
    );

    if (res.status == 201) {
      const data = res.data;
      setcaptain(data.captain);
      localStorage.setItem("captaintoken", data.token);
      localStorage.setItem('role','captain');
      // localStorage.setItem('captain',JSON.stringify(data.captain));
      navigate("/captain-login");
    }

    setemail("");
    setfirstname("");
    setlastname("");
    setpassword("");
    setcolor("");
    setplate("");
    setcapacity("");
    setType("taxi");
  };

  return (
    <div className="p-6 h-screen flex flex-col justify-between bg-gray-50">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-extrabold text-gray-900 tracking-wide">
          T A X I
        </h1>
        <div className="w-16 border-b-4 border-yellow-500 mt-1"></div>
      </div>

      {/* Signup Form */}
      <form
        onSubmit={(e) => {
          submitHandler(e);
        }}
        className="space-y-5"
      >
        {/* Name Fields */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800">
            Enter Your Name
          </h3>
          <div className="flex items-center gap-2 mt-2">
            <input
              required
              value={firstname}
              onChange={(e) => {
                setfirstname(e.target.value);
              }}
              type="text"
              placeholder="First Name"
              aria-label="First Name"
              className="bg-gray-200 border rounded-lg px-4 py-2 w-full placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
            <input
              value={lastname}
              onChange={(e) => {
                setlastname(e.target.value);
              }}
              type="text"
              placeholder="Last Name"
              aria-label="Last Name"
              className="bg-gray-200 border rounded-lg px-4 py-2 w-full placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          </div>
        </div>

        {/* Email Field */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800">
            Enter Your Email
          </h3>
          <input
            required
            value={email}
            onChange={(e) => {
              setemail(e.target.value);
            }}
            type="email"
            placeholder="you@example.com"
            aria-label="Email Address"
            className="bg-gray-200 border rounded-lg px-4 py-2 w-full placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
        </div>

        {/* Password Field */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800">
            Enter Password
          </h3>
          <input
            required
            value={password}
            onChange={(e) => {
              setpassword(e.target.value);
            }}
            type="password"
            placeholder="password"
            aria-label="Password"
            className="bg-gray-200 border rounded-lg px-4 py-2 w-full placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
        </div>

        {/* Vehicle Information */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800">
            Vehicle Information
          </h3>
          <div className="flex items-center gap-2 mt-2">
            <input
              required
              value={color}
              onChange={(e) => {
                setcolor(e.target.value);
              }}
              type="text"
              placeholder="Vehicle Color"
              aria-label="Vehicle Color"
              className="bg-gray-200 border rounded-lg px-4 py-2 w-full placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
            <input
              required
              value={capacity}
              onChange={(e) => {
                setcapacity(e.target.value);
              }}
              type="number"
              placeholder="Capacity"
              aria-label="Vehicle Capacity"
              className="bg-gray-200 border rounded-lg px-4 py-2 w-full placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          </div>
          <div className="flex items-center gap-2 mt-3 w-full">
            <input
              required
              value={plate}
              onChange={(e) => setplate(e.target.value)}
              type="text"
              placeholder="Vehicle Number Plate"
              aria-label="Vehicle Number Plate"
              className="bg-gray-200 border rounded-lg px-4 py-2 w-[70%] placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
            <select
              required
              value={type}
              onChange={(e) => setType(e.target.value)}
              aria-label="Vehicle Type"
              className="bg-gray-200 border rounded-lg px-4 py-2 w-[30%] text-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            >
              <option value="taxi">Taxi</option>
              <option value="moto">Moto</option>
              <option value="auto">Auto</option>
            </select>
          </div>
        </div>

        {/* Signup Button */}
        <button className="w-full flex justify-center items-center py-3 text-lg rounded-lg font-medium mt-6 bg-black text-white hover:bg-gray-800 transition duration-300">
          Create Account
        </button>

        {/* Login Redirect */}
        <p className="text-center text-gray-600 mt-4">
          Already have an account?{" "}
          <Link
            to="/captain-login"
            className="text-yellow-600 font-medium hover:underline"
          >
            Login here
          </Link>
        </p>
      </form>
    </div>
  );
};

export default CaptainSignup;
