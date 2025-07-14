const { validationResult } = require("express-validator");
const rideServices = require("../services/ride.service");
const {
  getCoordinatesFromAddress,
  getCaptainInRadius,
} = require("../services/map.service");
const Ride = require("../models/ride.model");
const { sendMessageToSocketId } = require("../socket");

module.exports.createRide = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { pickup, destination, vehicleType } = req.body;

  try {
    const ride = await rideServices.createRide({
      userId: req.user._id,
      pickup,
      destination,
      vehicleType,
    });

    const pickupCoordinate = await getCoordinatesFromAddress(pickup);

    const captains = await getCaptainInRadius(pickupCoordinate.lat,pickupCoordinate.lon,2);

    ride.otp = "";

    const rideUser = await Ride.findOne({ _id: ride._id }).populate("user");

    captains.forEach((captain) => {
      sendMessageToSocketId(captain.SocketId, {
        event: "new-ride",
        data: rideUser,
      });
    });

    return res.status(201).json(ride);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

module.exports.getFare = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { pickup, destination } = req.body;

  try {
    const fare = await rideServices.fare(pickup, destination);
    return res.status(201).json(fare);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

module.exports.confirmRide = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log("Validation errors:", errors.array()); // ✅ Add this line
    return res.status(400).json({ errors: errors.array() });
  }

  const { rideId, captain } = req.body;

  try {
    const ride = await rideServices.confirmRide({ rideId, captain });
    console.log(ride);

    sendMessageToSocketId(ride.user.SocketId, {
      event: "confirm-ride",
      data: ride,
    });

    return res.status(201).json(ride);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

module.exports.startRide = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { rideId, otp } = req.query;

    const ride = await rideServices.startRide({ rideId, otp });
    res.status(200).json(ride);
  } catch (error) {
    res.status(400).json({message : error.message});
  }
};

module.exports.endRide = async (req,res)=>{
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { rideId } = req.query;

    const ride = await rideServices.endRide({ rideId, captain : req.captain});
    res.status(200).json(ride);
  } catch (error) {
    res.status(400).json({message : error.message});
  }
}