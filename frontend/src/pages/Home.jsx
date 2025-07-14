import React, { useContext, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap/gsap-core";
import { useRef } from "react";
import { useState } from "react";
import { FaAngleDown } from "react-icons/fa";
import LocSearch from "../components/LocSearch";
import VehiclePanel from "../components/VehiclePanel";
import ConfirmRide from "../components/ConfirmRide";
import LookingForDriver from "../components/LookingForDriver";
import WaitingForDriver from "../components/WaitingForDriver";
import axios from "axios";
import { UserDataContext } from "../context/UserContext";
import { SocketDataContext } from "../context/SocketContext";
import { Link, useNavigate } from "react-router-dom";
import { ImExit } from "react-icons/im";

const Home = () => {
  const [pickup, setPickup] = useState("");
  const [dest, setDest] = useState("");
  const [panel, setPanel] = useState(false);
  const [vehiclepanel, setVehiclepanel] = useState(false);
  const [confirmRide, setConfirmRidePanel] = useState(false);
  const [vehicleFound, setVehicleFound] = useState(false);
  const [waitingDriver, setWaitingDriver] = useState(false); //change to false
  const [activeField, setactiveField] = useState("");
  const [pikupSuggestion, setpikupSuggestion] = useState([]);
  const [destinationSuggestion, setdestinationSuggestion] = useState([]);
  const [ridedata, setridedata] = useState({});
  const [confirmridedata, setconfirmridedata] = useState({});
  const [fare, setfare] = useState("");
  const [img, setimg] = useState("");
  const [vehicleType, setvehicleType] = useState("");

  const panelRef = useRef(null);
  const logoRef = useRef(null);
  const lineRef = useRef(null);
  const ButtonRef = useRef(null);
  const vehiclePanelRef = useRef(null);
  const confirmRideRef = useRef(null);
  const vehicleFoundRef = useRef(null);
  const waitingDriverRef = useRef(null);

  const { user } = useContext(UserDataContext);
  const { socket } = useContext(SocketDataContext);

  const navigate = useNavigate();

  useEffect(() => {
    socket.emit("join", { userId: user._id, Type: "user" });
  }, [user]);

  const pickupHandler = async (e) => {
    const value = e.target.value;
    setPickup(value);

    if (value.trim().length < 2) {
      setpikupSuggestion([]); // clear previous suggestions
      return;
    }

    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/maps/suggestions`,
        {
          params: {
            q: pickup,
          },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("usertoken")}`,
          },
        }
      );
      setpikupSuggestion(res.data);
    } catch (error) {
      console.error("Error fetching suggestion:", error);
    }
  };

  const destinationHandler = async (e) => {
    const value = e.target.value;
    setDest(value);

    if (value.trim().length < 2) {
      setdestinationSuggestion([]); // clear previous suggestions
      return;
    }

    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/maps/suggestions`,
        {
          params: {
            q: dest,
          },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("usertoken")}`,
          },
        }
      );
      setdestinationSuggestion(res.data);
    } catch (error) {
      console.error("Error fetching suggestion:", error);
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const rideData = {
      pickup: pickup,
      destination: dest,
    };

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/ride/getfare`,
        rideData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("usertoken")}`,
            "Content-Type": "application/json",
          },
        }
      );

      const taxitime = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/maps/get-distancetime`,
        {
          params: {
            origin: pickup,
            destination: dest,
            mode: "driving-car",
          },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("usertoken")}`,
          },
        }
      );

      const mototime = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/maps/get-distancetime`,
        {
          params: {
            origin: pickup,
            destination: dest,
            mode: "driving-car",
          },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("usertoken")}`,
          },
        }
      );

      const autotime = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/maps/get-distancetime`,
        {
          params: {
            origin: pickup,
            destination: dest,
            mode: "driving-car",
          },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("usertoken")}`,
          },
        }
      );

      const time = {
        taxi: Math.round(taxitime.data.duration_min),
        moto: Math.round(mototime.data.duration_min * 0.9),
        auto: Math.round(autotime.data.duration_min * 1.3),
      };

      const ride = {
        pickup: pickup,
        destination: dest,
        fare: res.data,
        time: time,
      };

      setridedata(ride);
      setVehiclepanel(true);
    } catch (error) {
      console.error("Error fetching fare:", error);
    }
  };

  const createRide = async () => {
    const rideData = {
      pickup: pickup,
      destination: dest,
      vehicleType: vehicleType,
    };
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/ride/create`,
        rideData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("usertoken")}`,
            "Content-Type": "application/json",
          },
        }
      );
    } catch (error) {
      console.error("Error fetching fare:", error);
    }
  };

  const logoutHandler = async () => {
    try {
      const res = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/user/logout`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("usertoken")}`,
        },
      }
    );

    if(res.status==200){
      localStorage.removeItem("usertoken");
      localStorage.removeItem("role");
      navigate("/");
    }
      
    } catch (error) {
       console.error("Logout failed:", error.response?.data || error.message);
    }
  };

  useEffect(() => {
    const handleConfirmRide = (data) => {
      setconfirmridedata(data);
      setWaitingDriver(true);
    };

    socket.on("confirm-ride", handleConfirmRide);

    return () => {
      socket.off("confirm-ride", handleConfirmRide);
    };
  }, []);

  useEffect(() => {
    const handleStartRide = (data) => {
      navigate("/riding", { state: { ride: data } });
    };

    socket.on("start-ride", handleStartRide);

    return () => {
      socket.off("start-ride", handleStartRide);
    };
  }, []);

  useGSAP(
    function () {
      if (panel) {
        gsap.to(panelRef.current, {
          height: "60%",
          padding: "24",
        });
        gsap.to(ButtonRef.current, {
          zIndex: 0,
        });
        gsap.to(logoRef.current, {
          zIndex: 0,
        });
        gsap.to(lineRef.current, {
          zIndex: 0,
        });
      } else {
        gsap.to(panelRef.current, {
          height: "0",
          padding: "0",
        });

        gsap.to(ButtonRef.current, {
          zIndex: 10,
        });
        gsap.to(logoRef.current, {
          zIndex: 10,
        });
        gsap.to(lineRef.current, {
          zIndex: 10,
        });
      }
    },
    [panel]
  );

  useGSAP(
    function () {
      if (vehiclepanel) {
        gsap.to(vehiclePanelRef.current, {
          transform: "translateY(0)",
        });
        setPanel(false);
      } else {
        gsap.to(vehiclePanelRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [vehiclepanel]
  );

  useGSAP(
    function () {
      if (confirmRide) {
        gsap.to(confirmRideRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(confirmRideRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [confirmRide]
  );

  useGSAP(
    function () {
      if (vehicleFound) {
        gsap.to(vehicleFoundRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(vehicleFoundRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [vehicleFound]
  );

  useGSAP(
    function () {
      if (waitingDriver) {
        gsap.to(waitingDriverRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(waitingDriverRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [waitingDriver]
  );

  return (
    <div className="h-screen w-screen relative overflow-hidden">
      <div>
        <h1
          ref={logoRef}
          className="w-25 top-5 left-5 absolute text-2xl font-bold tracking-tight z-10"
        >
          T A X I
        </h1>
        <div
          ref={lineRef}
          className=" w-18 absolute top-13 left-5 border-b-3 z-10"
        ></div>

        <div
          ref={ButtonRef}
          onClick={logoutHandler}
          className="h-10 w-10 fixed right-2 top-5 bg-white rounded-full flex items-center justify-center z-10"
        >
          <ImExit className="text-2xl" />
        </div>
      </div>

      <div className="h-screen w-screen relative z-0">
        <img
          className="w-full h-full object-cover"
          src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
          alt=""
        />
      </div>

      <div className="absolute top-0 h-screen w-screen flex flex-col justify-end">
        <div className="h-[40%] bg-white p-5 relative">
          <div className="flex justify-between items-center">
            <h4 className="text-3xl font-semibold">Find a trip</h4>
            {panel && (
              <FaAngleDown
                className="text-2xl"
                onClick={() => {
                  setPanel(false);
                }}
              />
            )}
          </div>

          <form onSubmit={submitHandler}>
            <div className="line bg-black w-1 absolute h-[30%] top-[35%] left-[10%] rounded-lg"></div>

            <input
              onClick={() => {
                setPanel(true);
                setactiveField("pickup");
              }}
              value={pickup}
              onChange={pickupHandler}
              className="bg-[#eee] w-full rounded-lg mt-5 px-8 py-2 text-lg"
              type="text"
              placeholder="Add a pick-up location"
              required
            />

            <input
              onClick={() => {
                setPanel(true);
                setactiveField("destination");
              }}
              value={dest}
              onChange={destinationHandler}
              className="bg-[#eee] w-full rounded-lg mt-5 px-8 py-2 text-lg"
              type="text"
              placeholder="Enter your destination"
              required
            />

            <button
              type="submit"
              className="w-full bg-black text-white text-lg font-semibold py-2 px-6 rounded-lg mt-5 border-2 border-transparent active:border-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-400 hover:bg-gray-900 transition-all duration-150"
            >
              Find Trip
            </button>
          </form>
        </div>

        <div
          ref={panelRef}
          className="bg-white h-0 max-h-[60%] overflow-y-auto px-2"
        >
          <LocSearch
            activeField={activeField}
            location={
              activeField === "pickup" ? pikupSuggestion : destinationSuggestion
            }
            setPickup={setPickup}
            setDest={setDest}
          />
        </div>
      </div>

      <div
        ref={vehiclePanelRef}
        className="fixed w-full z-12 bottom-0 py-8 px-3 bg-white translate-y-full"
      >
        <VehiclePanel
          setConfirmRidePanel={setConfirmRidePanel}
          setVehiclepanel={setVehiclepanel}
          ride={ridedata}
          setfare={setfare}
          setimg={setimg}
          setvehicleType={setvehicleType}
        />
      </div>

      <div
        ref={confirmRideRef}
        className="fixed w-full z-12 bottom-0 px-3 py-4 bg-white h-full translate-y-[100%] overflow-y-auto"
      >
        <ConfirmRide
          setVehicleFound={setVehicleFound}
          setConfrimRidePanel={setConfirmRidePanel}
          ride={ridedata}
          fare={fare}
          img={img}
          createRide={createRide}
        />
      </div>

      <div
        ref={vehicleFoundRef}
        className="fixed w-full z-12 bottom-0 px-3 py-4 bg-white h-full translate-y-[100%] overflow-y-auto"
      >
        <LookingForDriver
          setVehicleFound={setVehicleFound}
          ride={ridedata}
          fare={fare}
          img={img}
        />
      </div>

      <div
        ref={waitingDriverRef}
        className="fixed w-full z-12 bottom-0 px-3 py-4 bg-white h-full translate-y-[100%] overflow-y-auto"
      >
        <WaitingForDriver
          ride={confirmridedata}
          setWaitingDriver={setWaitingDriver}
          vehicleType={vehicleType}
        />
      </div>
    </div>
  );
};

export default Home;
