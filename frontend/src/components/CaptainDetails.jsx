import { IoMdTime } from "react-icons/io";
import { IoSpeedometerOutline } from "react-icons/io5";
import { LuBookText } from "react-icons/lu";

export default function CaptainDetails({ captain }) {
  
  if (!captain) {
    const storedCaptain = localStorage.getItem("captain");
    if (storedCaptain) {
      captain = JSON.parse(storedCaptain);
    }
  }

  return (
    <>
      <div className="flex justify-between items-center w-full mb-4 ">
        <div className="flex items-center gap-3">
          <img
            className="h-10 w-10 rounded-full object-cover border"
            src="https://t3.ftcdn.net/jpg/02/99/04/20/360_F_299042079_vGBD7wIlSeNl7vOevWHiL93G4koMM967.jpg"
            alt="Captain Avatar"
          />
          <h4 className="text-lg font-semibold text-gray-800">
            {captain?.fullname?.firstname + " " + captain?.fullname?.lastname}
          </h4>
        </div>
        <div className="text-right">
          <p className="text-xl font-bold text-yellow-600">₹150</p>
          <p className="text-sm text-gray-500">Today's Earnings</p>
        </div>
      </div>

      <div className="flex items-center justify-between gap-4 bg-gray-200 rounded-xl p-5 shadow-sm">
        <div className="flex-1  text-center">
          <IoMdTime className="text-2xl mx-auto text-gray-700" />
          <h4 className="text-lg font-medium text-gray-800 mt-1">10 hr</h4>
          <p className="text-sm text-gray-600">Hours Online</p>
        </div>

        <div className="flex-1 text-center">
          <IoSpeedometerOutline className="text-2xl mx-auto text-gray-700" />
          <h4 className="text-lg font-medium text-gray-800 mt-1">30 km</h4>
          <p className="text-sm text-gray-600">Distance Travelled</p>
        </div>

        <div className="flex-1  text-center">
          <LuBookText className="text-2xl mx-auto text-gray-700" />
          <h4 className="text-lg font-medium text-gray-800 mt-1">4</h4>
          <p className="text-sm text-gray-600">Booked Jobs</p>
        </div>
      </div>
    </>
  );
}
