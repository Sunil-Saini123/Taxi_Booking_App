const { default: mongoose } = require("mongoose");
const Ride = require("../models/ride.model");
const { getCoordinatesFromAddress } = require("./map.service");
const crypto=require("crypto");
const { sendMessageToSocketId } = require("../socket");
const mapServices = require("./map.service")

function genOTP(length) {
  const digits = '0123456789';
  let otp = '';
  const bytes = crypto.randomBytes(length);

  for (let i = 0; i < length; i++) {
    // Use each byte to index into digits
    otp += digits[bytes[i] % digits.length];
  }

  return otp;
}

async function getFare(pickup, destination) {

  if (!pickup || !destination) {
    throw new Error("Both pickup and destination are required");
  }

  const fromCoords = await getCoordinatesFromAddress(pickup);
  const toCoords = await getCoordinatesFromAddress(destination);

  if (!fromCoords) throw new Error(`Pickup address not found: ${pickup}`);
  if (!toCoords) throw new Error(`Destination address not found: ${destination}`);

  const apiKey = process.env.OpenRouteKey;
  const url = `https://api.openrouteservice.org/v2/directions/driving-car`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: apiKey,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      coordinates: [
        [fromCoords.lon, fromCoords.lat],
        [toCoords.lon, toCoords.lat],
      ],
    }),
  });

  const data = await response.json();

  if (!data || !data.routes || data.routes.length === 0) {
    throw new Error("Route not found");
  }

  const distanceKm = data.routes[0].summary.distance / 1000;

  const fareRates = {
    taxi: { base: 50, perKm: 15 },
    auto: { base: 30, perKm: 10 },
    moto: { base: 20, perKm: 7 },
  };

  const fares = {};
  for (const [type, rate] of Object.entries(fareRates)) {
    fares[type] = Math.round(rate.base + distanceKm * rate.perKm);
  }

  return fares;
}

module.exports.createRide = async ({
  userId,
  pickup,
  destination,
  vehicleType,
}) => {
  if (!userId || !pickup || !destination || !vehicleType) {
    throw new Error("All fields are required");
  }

  const fare = await getFare(pickup, destination);
  const distance=await mapServices.getDistanceAndTime(pickup,destination);

  const ride = await Ride.create({
    user : userId,
    pickup,
    destination,
    otp : genOTP(6),
    fare: fare[vehicleType],
    distance : distance.distance_km
  });

  return ride;
};

module.exports.fare = getFare;

module.exports.confirmRide = async ({rideId,captain})=>{

  if(!rideId || !captain ){
    throw new Error("All fields are required");
  }

  const captainId = new mongoose.Types.ObjectId(captain._id); // ✅ use `new`


  await Ride.findOneAndUpdate(
    {_id : rideId},
    { captain: captainId , status : "accepted"},
  )

  const ride=await Ride.findOne({
    _id : rideId
  }).select('+otp').populate('user').populate('captain')


  return ride;
}

module.exports.startRide = async ({rideId,otp})=>{
  if(!rideId || !otp ){
    throw new Error("All fields are required");
  }

  const ride=await Ride.findOne({_id : rideId}).populate('user').populate('captain').select('+otp');

  if(ride.otp != otp){
    throw new Error("invalid otp");
  }

  if(ride.status!="accepted"){
    throw new Error("invalide ride");
  }

  ride.status = "ongoing";
  await ride.save();

   sendMessageToSocketId(ride.user.SocketId,{
    event : "start-ride",
    data : ride
   });

   return ride;
}

module.exports.endRide = async ({rideId,captain})=>{
  if(!rideId || !captain ){
    throw new Error("All fields are required");
  }

  const ride=await Ride.findOne({_id : rideId,captain : captain._id}).populate('user').populate('captain').select('+otp');


  if(ride.status!="ongoing"){
    throw new Error("invalide ride");
  }

  ride.status = "completed";
  await ride.save();

   sendMessageToSocketId(ride.user.SocketId,{
    event : "end-ride",
    data : ride
   });

   return ride;
}