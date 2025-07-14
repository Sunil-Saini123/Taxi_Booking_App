import { FaLocationDot } from "react-icons/fa6";
import { IoLocationOutline } from "react-icons/io5";
import { MdPriceChange } from "react-icons/md";
import { IoMdHome } from "react-icons/io";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { SocketDataContext } from "../context/SocketContext";
import { useContext, useEffect, useState } from "react";
import LiveTracking from "../components/LiveTracking";
import axios from "axios";

export default function Riding() {
  const location = useLocation();
  const ride = location.state?.ride;
  const type = ride?.captain?.vehicle?.type;
  const [userPosition, setUserPosition] = useState(null);
  const [destinationCoord, setDestinationCoord] = useState(null);

  const { socket } = useContext(SocketDataContext);
  const navigate = useNavigate();

  useEffect(() => {
    const HandleEndRide = (data) => {
      navigate("/home");
    };

    socket.on("end-ride", HandleEndRide);

    return () => {
      socket.off("end-ride", HandleEndRide);
    };
  }, []);

  useEffect(() => {
    const id = navigator.geolocation.watchPosition(
      (pos) => {
        setUserPosition({
          lat: pos.coords.latitude,
          lon: pos.coords.longitude,
        });
      },
      (err) => console.error(err),
      { enableHighAccuracy: true }
    );

    return () => navigator.geolocation.clearWatch(id);
  }, []);

  useEffect(() => {
    const fetchDestinationCoord = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/maps/get-coordinate`,
          {
            params: { address: ride?.destination },
            headers: {
              Authorization: `Bearer ${localStorage.getItem("usertoken")}`,
            },
          }
        );
        const { lat, lon } = res.data;
        setDestinationCoord({ lat, lon });
      } catch (err) {
        console.error("Failed to get destination coordinates", err);
      }
    };

    if (ride?.destination) fetchDestinationCoord();
  }, [ride?.destination]);

  return (
    <div className="h-screen w-screen relative overflow-hidden">
      <div className="h-[45%] w-screen">
        <div>
          <h1 className="w-25 top-5 left-5 absolute text-2xl font-bold tracking-tight">
            T A X I
          </h1>
          <div className=" w-18 absolute top-13 left-5 border-b-3 "></div>
        </div>

        {/* <img
          className="w-full h-full object-cover"
          src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
          alt=""
        /> */}
        {userPosition && destinationCoord && (
          <LiveTracking
            currentPosition={userPosition}
            destination={destinationCoord}
          />
        )}
      </div>

      <div className="h-10 w-10 fixed right-2 top-5 bg-white rounded-full flex items-center justify-center">
        <Link to={"/home"}>
          <IoMdHome className="text-2xl" />
        </Link>
      </div>

      <div className="h-[55%] w-screen">
        <div className="flex items-center p-1 justify-between">
          <img
            className="h-24 -ml-5"
            src={
              type == "taxi"
                ? "https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1597151200/assets/35/7f12f6-b38b-403d-b3ee-84c6c7a3d080/original/Taxi_Yellow.jpg"
                : type == "moto"
                ? "https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1649231091/assets/2c/7fa194-c954-49b2-9c6d-a3b8601370f5/original/Uber_Moto_Orange_312x208_pixels_Mobile.png"
                : "https://static.vecteezy.com/system/resources/thumbnails/035/175/313/small_2x/thailand-car-isolated-on-background-3d-rendering-illustration-free-png.png"
            }
            alt=""
          />
          <div className="text-right">
            <h4 className="text-lg font-medium">
              {ride?.captain?.fullname?.firstname}
            </h4>
            <h2 className="text-xl font-semibold -mt-1 -mb-1">
              {ride?.captain?.vehicle?.plate}
            </h2>
            <p className="text-sm text-gray-400">
              {ride?.captain?.vehicle?.type}
            </p>
          </div>
        </div>

        <div className="flex flex-col w-full">
          <div className="w-full p-1">
            <div className="flex justify-between items-center mb-2 p-1 border-b-2 border-gray-300">
              <h2>
                <IoLocationOutline className="text-2xl" />
              </h2>
              <div className="w-[85%] font-medium tracking-tight">
                {ride?.pickup}
              </div>
            </div>

            <div className="flex justify-between items-center mb-2 p-1 border-b-2 border-gray-300">
              <h2>
                <FaLocationDot className="text-xl" />
              </h2>
              <div className="w-[85%] font-medium tracking-tight ">
                {ride?.destination}
              </div>
            </div>

            <div className="flex justify-between items-center mb-2 p-1 border-b-2 border-gray-300">
              <h2>
                <MdPriceChange className="text-2xl" />
              </h2>
              <div className="w-[85%] font-medium ">₹{ride?.fare}</div>
            </div>

            <button className="bg-green-500 text-white px-8 py-2 text-lg text-center font-semibold w-full rounded-xl mt-2 ">
              Make Payment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
