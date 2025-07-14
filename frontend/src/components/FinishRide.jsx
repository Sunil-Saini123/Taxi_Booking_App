import axios from "axios";
import { FaAngleDown, FaLocationDot } from "react-icons/fa6";
import { IoLocationOutline } from "react-icons/io5";
import { MdPriceChange } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";

export default function FinishRide({ setcompleteRide,ride }) {

  const navigate = useNavigate();

  const submitHandler = async (e)=>{
    e.preventDefault();
      try {
      const res = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/ride/end-ride`,
        {
          params: {
            rideId: ride._id,
          },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("captaintoken")}`,
          },
        }
      );

      if (res.status === 200) {
        navigate("/captain-home"); 
      }
    } catch (error) {
      console.error("Failed to end ride:", error);
      // Optionally show a toast or alert here
    }
  }

  return (
    <>
      {/* Title */}
      <div className="flex justify-between items-center mb-5">
        <h4 className="text-2xl font-bold text-gray-800">Finish the Ride</h4>
        <FaAngleDown
          onClick={() => {
            setcompleteRide(false);
          }}
          className="text-2xl text-gray-600"
        />
      </div>

      {/* Driver Info */}
      <div className="flex justify-between items-center border-2 border-yellow-400 bg-gray-50 rounded-xl p-4 mb-6">
        <div className="flex items-center gap-3">
          <img
            className="h-12 w-12 rounded-full object-cover border border-gray-200"
            src="https://t3.ftcdn.net/jpg/02/99/04/20/360_F_299042079_vGBD7wIlSeNl7vOevWHiL93G4koMM967.jpg"
            alt="Captain Avatar"
          />
          <h4 className="text-lg font-semibold text-gray-800">{ride?.user?.fullname?.firstname + " " + ride?.user?.fullname?.lastname}</h4>
        </div>
        <p className="text-xl font-bold text-gray-800">{ride?.distance} KM</p>
      </div>
      {/* Ride Details */}
      <div className="space-y-4">
        <div className="flex items-center gap-4 border-b pb-3">
          <IoLocationOutline className="text-4xl text-gray-600" />
          <p className="font-medium text-gray-700 text-lg">
            {ride?.pickup}
          </p>
        </div>

        <div className="flex items-center gap-4 border-b pb-3">
          <FaLocationDot className="text-xl text-gray-600" />
          <p className="font-medium text-gray-700 text-lg">
            {ride?.destination}
          </p>
        </div>

        <div className="flex items-center gap-4 border-b pb-3">
          <MdPriceChange className="text-2xl text-gray-600" />
          <p className="font-medium text-gray-700 text-lg">₹{ride?.fare}</p>
        </div>
      </div>

        <button onClick={submitHandler} className="bg-green-600 w-full mt-5 hover:bg-green-700 text-white py-3 text-lg font-semibold rounded-xl transition">
          Finish the Ride
        </button>
    </>
  );
}
