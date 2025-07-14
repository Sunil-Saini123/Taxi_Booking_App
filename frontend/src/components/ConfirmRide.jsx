import { FaAngleDown, FaLocationDot } from "react-icons/fa6";
import { IoLocationOutline } from "react-icons/io5";
import { MdPriceChange } from "react-icons/md";

export default function ConfirmRide({setConfrimRidePanel,setVehicleFound,ride,fare,img,createRide}) {

  const submitHandler=async ()=>{
    setVehicleFound(true);
    await createRide();
  }

  return (
    <>
      <div className="flex justify-between items-center">
        <h4 className="text-3xl font-semibold">Confirm Your Ride</h4>
        <FaAngleDown
          className="text-2xl"
          onClick={() => {
            setConfrimRidePanel(false);
          }}
        />
      </div>

      <div className="flex flex-col w-full p-2">
        <img className="h-44" src={img} alt="" />
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
            <div className="w-[85%] font-medium text-base tracking-tight">{ride?.destination}</div>
          </div>

          <div className="flex justify-between items-center mb-4 p-3 border-b-2 border-gray-300">
            <h2>
              <MdPriceChange className="text-2xl" />
            </h2>
            <div className="w-[85%] font-medium text-base">{fare}</div>
          </div>
        </div>
        <button onClick={submitHandler} className="bg-green-500 text-white px-8 py-2 text-lg text-center font-semibold rounded-xl mt-3 ">Confirm Ride</button>
      </div>
    </>
  );
}
