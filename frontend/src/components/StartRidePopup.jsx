import axios from "axios";
import { FaAngleDown, FaLocationDot } from "react-icons/fa6";
import { IoLocationOutline } from "react-icons/io5";
import { MdPriceChange } from "react-icons/md";
import { useNavigate } from "react-router-dom";

export default function StartRidePopup({
  setStartRide,
  otp,
  setOTP,
  ride,
}) {
  
  const navigate = useNavigate();

  const handleConfirm = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/ride/start-ride`,
        {
          params: {
            rideId: ride._id,
            otp: otp,
          },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("captaintoken")}`,
          },
        }
      );

      if (res.status === 200) {
        navigate("/captain-riding",{state : {ride : ride}}); // redirect to riding screen
      }
    } catch (error) {
      console.error("Failed to start ride:", error);
      // Optionally show a toast or alert here
    }
  };

  return (
    <>
      {/* Title */}
      <div className="flex justify-between items-center mb-5">
        <h4 className="text-2xl font-bold text-gray-800">Start the Ride</h4>
        <FaAngleDown
          onClick={() => {
            setStartRide(false);
          }}
          className="text-2xl text-gray-600"
        />
      </div>

      {/* Driver Info */}
      <div className="flex justify-between items-center bg-yellow-400 rounded-xl p-4 mb-6">
        <div className="flex items-center gap-3">
          <img
            className="h-12 w-12 rounded-full object-cover border border-gray-200"
            src="https://t3.ftcdn.net/jpg/02/99/04/20/360_F_299042079_vGBD7wIlSeNl7vOevWHiL93G4koMM967.jpg"
            alt="Captain Avatar"
          />
          <h4 className="text-lg font-semibold text-gray-800">
            {ride?.user?.fullname?.firstname +
              " " +
              ride?.user?.fullname?.lastname}
          </h4>
        </div>
        <p className="text-xl font-bold text-gray-800">{ride?.distance} KM</p>
      </div>
      {/* Ride Details */}
      <div className="space-y-4">
        <div className="flex items-center gap-4 border-b pb-3">
          <IoLocationOutline className="text-4xl text-gray-600" />
          <p className="font-medium text-gray-700 text-lg">{ride?.pickup}</p>
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
      {/* OTP Input and Actions */}
      <form onSubmit={handleConfirm} className="flex flex-col gap-3 mt-6">
        <input
          required
          value={otp}
          onChange={(e) => setOTP(e.target.value)}
          type="text"
          inputMode="numeric"
          pattern="[0-9]{4,6}"
          maxLength={6}
          placeholder="Enter OTP"
          className="bg-[#eeeeee] border rounded-lg px-4 py-2 w-full text-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500"
        />

        <button
          type="submit"
          className="bg-green-600 hover:bg-green-700 text-white py-3 text-lg w-full font-semibold rounded-xl transition"
        >
          Confirm
        </button>

        <button
          type="button"
          onClick={() => setStartRide(false)}
          className="bg-red-500 hover:bg-red-600 text-white py-3 text-lg font-semibold rounded-xl transition"
        >
          Decline
        </button>
      </form>
    </>
  );
}
