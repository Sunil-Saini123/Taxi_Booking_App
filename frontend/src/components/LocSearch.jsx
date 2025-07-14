import { FaLocationDot } from "react-icons/fa6";

export default function LocSearch({location,activeField,setDest,setPickup}) {

  const locations = location;

  const locHandler = (value)=>{
    if(activeField == "pickup"){
      setPickup(value);
    }else{
      setDest(value);
    }
  }

  return (
    <>
      {locations.map((loc,idx) => {
        return (
          <div key={idx} onClick={()=>{locHandler(loc.label)}} className="flex justify-between items-center mb-3 border-2 border-gray-200 active:border-black rounded-lg p-1">
            <h2 className="bg-[#eee] p-2 rounded-full">
              <FaLocationDot className="text-xl" />
            </h2>
            <div className="w-[85%] font-medium">{loc.label}</div>
          </div>
        );
      })}
    </>
  );
}
