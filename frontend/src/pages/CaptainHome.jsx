import { ImExit } from "react-icons/im";
import { Link, useNavigate } from "react-router-dom";
import CaptainDetails from "../components/CaptainDetails";
import { useContext, useEffect, useRef, useState } from "react";
import RidePopup from "../components/RidePopup";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap/gsap-core";
import StratRidePopup from "../components/StartRidePopup";
import { CaptainDataContext } from "../context/CaptainContext";
import { SocketDataContext } from "../context/SocketContext";
import axios from "axios";

const CaptainHome = () => {
  const [ridePopup, setRidePopup] = useState(false);
  const [startRide, setStartRide] = useState(false);
  const [otp, setOTP] = useState("");
  const [rideData, setrideData] = useState({});

  const ridePopupRef = useRef(null);
  const startRideRef = useRef(null);

  const { captain } = useContext(CaptainDataContext);
  const { socket } = useContext(SocketDataContext);
  const navigate=useNavigate();

  useEffect(() => {
    // Join event
    socket.emit("join", { userId: captain._id, Type: "captain" });

    // Define location update function
    const updateLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          socket.emit("update-location-captain", {
            userId: captain._id,
            location: {
              ltd: position.coords.latitude,
              lng: position.coords.longitude,
            },
          });
        });
      }
    };

    // Call once immediately
    updateLocation();

    // Call every 15 seconds
    const interval = setInterval(updateLocation, 15000);

    // Cleanup on unmount
    return () => clearInterval(interval);
  }, [captain._id]);

  socket.on("new-ride", (data) => {
    setrideData(data);
    setRidePopup(true);
  });

  const confirmRide = async (rideId) => {
    try {
      const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/ride/confirm`,
        { rideId , captain: captain}, // ✅ send rideId as an object
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("captaintoken")}`,
            "Content-Type": "application/json",
          },
        }
      );

      setrideData(res.data);
      setStartRide(true);
    } catch (err) {
      console.error("Error confirming ride:", err);
    }
  };

  const logoutHandler = async () => {
    try {
      const res = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/captain/logout`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("captaintoken")}`,
        },
      }
    );

    if(res.status==200){
      localStorage.removeItem("captaintoken");
      localStorage.removeItem("captain");
      localStorage.removeItem("role");
      navigate("/");
    }
      
    } catch (error) {
       console.error("Logout failed:", error.response?.data || error.message);
    }
  };

  useGSAP(
    function () {
      if (ridePopup) {
        gsap.to(ridePopupRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(ridePopupRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [ridePopup]
  );

  useGSAP(
    function () {
      if (startRide) {
        gsap.to(startRideRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(startRideRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [startRide]
  );

  return (
    <div className="h-screen w-screen relative overflow-hidden">
      <div className="h-[60%] w-screen">
        <div>
          <h1 className="text-3xl mt-1 absolute ml-1 font-extrabold text-gray-900 tracking-wide">
            T A X I
          </h1>
          <div className="w-16 absolute top-10 ml-1 border-b-4 border-yellow-500 mt-1"></div>
        </div>

        <img
          className="w-full h-full object-cover"
          src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
          alt=""
        />

        <div onClick={logoutHandler} className="h-10 w-10 fixed right-2 top-2 bg-white rounded-full flex items-center justify-center">
            <ImExit className="text-2xl" />
        </div>
      </div>

      <div className="h-[40%] w-screen p-5">
        <CaptainDetails captain={captain} />
      </div>

      <div
        ref={ridePopupRef}
        className="fixed w-full z-12 bottom-0 p-5 bg-white translate-y-full"
      >
        <RidePopup
          setRidePopup={setRidePopup}
          ride={rideData}
          confirmRide={confirmRide}
        />
      </div>

      <div
        ref={startRideRef}
        className="fixed w-full h-screen z-12 top-0 p-5 bg-white translate-y-full"
      >
        <StratRidePopup setStartRide={setStartRide} otp={otp} setOTP={setOTP} ride={rideData} />
      </div>
    </div>
  );
};

export default CaptainHome;
