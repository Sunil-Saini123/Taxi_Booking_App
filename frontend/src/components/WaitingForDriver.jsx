import { FaAngleDown, FaLocationDot } from "react-icons/fa6";
import { IoLocationOutline } from "react-icons/io5";
import { MdPriceChange } from "react-icons/md";

export default function WaitingForDriver({ setWaitingDriver, ride, vehicleType }) {
  return (
    <>
      <div className="flex justify-between items-center">
        <h4 className="text-3xl font-semibold">Waiting For Driver</h4>
        <FaAngleDown
          className="text-2xl cursor-pointer"
          onClick={() => {
            setWaitingDriver(false);
          }}
        />
      </div>

      <div className="flex items-center justify-between my-8">
        <img
          className="h-32 -ml-5"
          src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1597151200/assets/35/7f12f6-b38b-403d-b3ee-84c6c7a3d080/original/Taxi_Yellow.jpg"
          alt=""
        />
        <div className="text-right">
          <h4 className="text-lg font-medium">
            {ride?.user?.fullname?.firstname}
          </h4>
          <h2 className="text-xl font-semibold -mt-1 -mb-1">
            {ride?.captain?.vehicle?.plate}
          </h2>
          <p className="text-lg text-gray-400">{vehicleType}</p>
          <p className="text-lg font-semibold text-gray-600 mt-1">
            OTP : {ride?.otp || "------"}
          </p>
        </div>
      </div>

      <div className="flex flex-col w-full p-4">
        <div className="w-full">
          <div className="flex justify-between items-center mb-4 p-3 border-b-2 border-gray-300">
            <h2>
              <IoLocationOutline className="text-2xl" />
            </h2>
            <div className="w-[85%] font-medium text-base tracking-tight">{ride?.pickup}</div>
          </div>

          <div className="flex justify-between items-center mb-4 p-3 border-b-2 border-gray-300">
            <h2>
              <FaLocationDot className="text-xl" />
            </h2>
            <div className="w-[85%] font-medium text-base tracking-tight">
              {ride?.destination}
            </div>
          </div>

          <div className="flex justify-between items-center mb-4 p-3 border-b-2 border-gray-300">
            <h2>
              <MdPriceChange className="text-2xl" />
            </h2>
            <div className="w-[85%] font-medium text-lg">₹{ride?.fare}</div>
          </div>
        </div>
      </div>
    </>
  );
}
