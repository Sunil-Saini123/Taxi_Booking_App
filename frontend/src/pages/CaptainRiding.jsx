import { FaAngleUp } from "react-icons/fa6";
import FinishRide from "../components/FinishRide";
import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap/gsap-core";
import { useLocation } from "react-router-dom";
import axios from "axios";
import LiveTracking from "../components/LiveTracking";

export default function CaptainRiding() {
  const [completeRide, setcompleteRide] = useState(false);

  const completeRideRef = useRef(null);
  const location = useLocation();
  const rideData = location.state?.ride;
  const [captainPosition, setCaptainPosition] = useState(null);
  const [destinationCoord, setDestinationCoord] = useState(null);

  useEffect(() => {
    const id = navigator.geolocation.watchPosition(
      (pos) => {
        setCaptainPosition({
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
          `${import.meta.env.VITE_BASE_URL}/maps/get-coordinate-captain`,
          {
            params: { address: rideData?.destination },
            headers: {
              Authorization: `Bearer ${localStorage.getItem("captaintoken")}`,
            },
          }
        );
        const { lat, lon } = res.data;
        setDestinationCoord({ lat, lon });
      } catch (err) {
        console.error("Failed to get destination coordinates", err);
      }
    };

    if (rideData?.destination) fetchDestinationCoord();
  }, [rideData?.destination]);

  useGSAP(
    function () {
      if (completeRide) {
        gsap.to(completeRideRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(completeRideRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [completeRide]
  );

  return (
    <div className="h-screen w-screen relative overflow-hidden">
      <div className="h-[80%] w-screen">

        {captainPosition && destinationCoord && (
          <LiveTracking
            currentPosition={captainPosition}
            destination={destinationCoord}
          />
        )}
      </div>

      <div className="h-[20%] w-screen px-6 py-3 bg-yellow-400 flex flex-col gap-4  items-center">
        <FaAngleUp
          onClick={() => {
            setcompleteRide(true);
          }}
          className="text-2xl  text-gray-600"
        />
        <div className=" flex justify-around items-center w-full">
          <h4 className="text-xl font-bold">2KM away</h4>
          <button
            onClick={() => {
              setcompleteRide(true);
            }}
            className="bg-green-500 px-4 py-2 rounded-xl text-lg font-semibold"
          >
            Complete Ride
          </button>
        </div>
      </div>

      <div
        ref={completeRideRef}
        className="fixed w-full h-screen z-50 top-0 p-5 bg-white translate-y-full"
      >
        <FinishRide setcompleteRide={setcompleteRide} ride={rideData} />
      </div>
    </div>
  );
}
