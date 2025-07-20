import { FaLocationDot } from "react-icons/fa6";
import { IoLocationOutline } from "react-icons/io5";
import { MdPriceChange } from "react-icons/md";

export default function RidePopup({setRidePopup,ride,confirmRide}) {
  return (
<>
      <div className="flex justify-center items-center mb-4">
        <h4 className="text-2xl font-bold text-gray-800">New Ride Available !</h4>
      </div>


      <div className="flex justify-between items-center bg-yellow-400 rounded-xl p-4 mb-5">
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

      <div className="space-y-4">
  
        <div className="flex items-center gap-4 border-b pb-3">
          <IoLocationOutline className="text-4xl text-gray-600"  />
          <p className="font-medium text-gray-700 text-base tracking-tight">
            {ride?.pickup}
          </p>
        </div>

     
        <div className="flex items-center gap-4 border-b pb-3">
          <FaLocationDot className="text-xl text-gray-600" />
          <p className="font-medium text-gray-700 text-base tracking-tight">
            {ride?.destination}
          </p>
        </div>

      
        <div className="flex items-center gap-4 border-b pb-3">
          <MdPriceChange className="text-2xl text-gray-600"  />
          <p className="font-medium text-gray-700 text-lg">₹{ride?.fare}</p>
        </div>
      </div>

      <div className="flex flex-col gap-3 mt-5">
        <button onClick={()=>{confirmRide(ride._id)}} className="bg-green-600 hover:bg-green-700 text-white py-2 text-lg font-semibold rounded-xl transition">
          Accept
        </button>
        <button onClick={()=>{setRidePopup(false)}}  className="bg-gray-500 hover:bg-gray-600 text-white py-2 text-lg font-semibold rounded-xl transition">
          Ignore
        </button>
      </div>
    </>
  );
}
