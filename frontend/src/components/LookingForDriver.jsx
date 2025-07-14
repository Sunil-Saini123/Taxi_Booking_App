import { FaAngleDown, FaLocationDot } from "react-icons/fa6";
import { IoLocationOutline } from "react-icons/io5";
import { MdPriceChange } from "react-icons/md";

export default function LookingForDriver({setVehicleFound,ride,fare,img}) {
  return (
    <>
      <div className="flex justify-between items-center">
        <h4 className="text-3xl font-semibold">Looking For Driver</h4>
        <FaAngleDown
          className="text-2xl"
          onClick={() => {
            setVehicleFound(false);
          }}
        />
      </div>

      <div className="flex flex-col w-full p-4">
        <img
          className="h-48"
          src={img}
          alt=""
        />
        <div className="w-full">
          <div className="flex justify-between items-center mb-4 p-3 border-b-2 border-gray-300">
            <h2>
              <IoLocationOutline className="text-2xl" />
            </h2>
            <div className="w-[85%] font-medium tracking-tight">
              {ride?.pickup}
            </div>
          </div>

          <div className="flex justify-between items-center mb-4 p-3 border-b-2 border-gray-300">
            <h2>
              <FaLocationDot className="text-xl" />
            </h2>
            <div className="w-[85%] font-medium tracking-tight">
              {ride?.destination}
            </div>
          </div>

          <div className="flex justify-between items-center mb-4 p-3 border-b-2 border-gray-300">
            <h2>
              <MdPriceChange className="text-2xl" />
            </h2>
            <div className="w-[85%] font-medium text-lg">{fare}</div>
          </div>
        </div>
      </div>
    </>
  );
}
