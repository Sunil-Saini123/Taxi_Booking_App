import { FaAngleDown, FaUser } from "react-icons/fa6";

export default function VehiclePanel({
  setVehiclepanel,
  setConfirmRidePanel,
  ride,
  setfare,
  setimg,
  setvehicleType
}) {
  return (
    <>
      <div className="flex justify-between items-center">
        <h4 className="text-3xl font-semibold">Choose a Vehicle</h4>
        <FaAngleDown
          className="text-2xl"
          onClick={() => {
            setVehiclepanel(false);
          }}
        />
      </div>

      <div
        onClick={() => {
          setConfirmRidePanel(true);
          setfare(ride?.fare?.taxi);
          setimg(
            "https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1597151200/assets/35/7f12f6-b38b-403d-b3ee-84c6c7a3d080/original/Taxi_Yellow.jpg"
          );
          setvehicleType("taxi")
        }}
        className="flex w-full justify-between items-center mt-5 pr-3 py-3 border-2 border-gray-400 active:border-black rounded-xl"
      >
        <img
          className="h-16"
          src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1597151200/assets/35/7f12f6-b38b-403d-b3ee-84c6c7a3d080/original/Taxi_Yellow.jpg"
          alt=""
        />
        <div className="w-[60%] ">
          <h3 className="text-lg font-semibold">
            TaxiGo <FaUser className="inline pb-1" />4
          </h3>
          <h3 className="text-sm font-semibold">
            {ride?.time?.taxi} mins Away
          </h3>
          <p className="text-xs font-medium text-gray-500">
            Affordable, Comfortable rides
          </p>
        </div>
        <h4 className="text-lg font-bold">₹{ride?.fare?.taxi}</h4>
      </div>

      <div
        onClick={() => {
          setConfirmRidePanel(true);
          setfare(ride.fare.moto);
          setimg(
            "https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1649231091/assets/2c/7fa194-c954-49b2-9c6d-a3b8601370f5/original/Uber_Moto_Orange_312x208_pixels_Mobile.png"
          );
          setvehicleType("moto")
        }}
        className="flex w-full justify-between items-center mt-5 pr-3 py-3 border-2 border-gray-400 active:border-black rounded-xl"
      >
        <img
          className="h-16"
          src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1649231091/assets/2c/7fa194-c954-49b2-9c6d-a3b8601370f5/original/Uber_Moto_Orange_312x208_pixels_Mobile.png"
          alt=""
        />
        <div className="w-[60%] ">
          <h3 className="text-lg font-semibold">
            Moto <FaUser className="inline pb-1" />1
          </h3>
          <h3 className="text-sm font-semibold">
            {ride?.time?.moto} mins Away
          </h3>
          <p className="text-xs font-medium text-gray-500">
            Affordable, Comfortable rides
          </p>
        </div>
        <h4 className="text-lg font-bold">₹{ride?.fare?.moto}</h4>
      </div>

      <div
        onClick={() => {
          setConfirmRidePanel(true);
          setfare(ride.fare.auto);
          setimg(
            "https://static.vecteezy.com/system/resources/thumbnails/035/175/313/small_2x/thailand-car-isolated-on-background-3d-rendering-illustration-free-png.png"
          );
          setvehicleType("auto")
        }}
        className="flex w-full justify-between items-center mt-5 pr-3 py-3 border-2 border-gray-400 active:border-black rounded-xl"
      >
        <img
          className="h-14 ml-3"
          src="https://static.vecteezy.com/system/resources/thumbnails/035/175/313/small_2x/thailand-car-isolated-on-background-3d-rendering-illustration-free-png.png"
          alt=""
        />
        <div className="w-[60%] ml-3">
          <h3 className="text-lg font-semibold">
            Auto <FaUser className="inline pb-1" />3
          </h3>
          <h3 className="text-sm font-semibold">
            {ride?.time?.auto} mins Away
          </h3>
          <p className="text-xs font-medium text-gray-500">
            Affordable, Comfortable rides
          </p>
        </div>
        <h4 className="text-lg font-bold">₹{ride?.fare?.auto}</h4>
      </div>
    </>
  );
}
