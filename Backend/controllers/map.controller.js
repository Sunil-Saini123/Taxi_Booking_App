const { validationResult } = require("express-validator");
const {getCoordinatesFromAddress,getAddressSuggestions,getDistanceAndTime,} = require("../services/map.service");

module.exports.getCoordinates = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const address = req.query.address;

  try {
    const coords = await getCoordinatesFromAddress(address);
    return res.json(coords);
  } catch (err) {
    console.error(err.message);
    const status =err.message === "Address not found" ||err.message === "Address is required"? 400 : 500;
    return res.status(status).json({ error: err.message });
  }
};

module.exports.getDistanceTime = async (req, res) => {

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { origin, destination, mode } = req.query;

  try {
    const result = await getDistanceAndTime(origin, destination, mode);
    return res.json(result);
  } catch (err) {
    console.error("Distance/time error:", err.message);
    const status =err.message.includes("not found") || err.message.includes("required")? 404 : 500;
    return res.status(status).json({ error: err.message });
  }
};

module.exports.getSuggestions = async (req, res) => {
  
  const q = req.query.q;

  try {
    const suggestions = await getAddressSuggestions(q);
    res.json(suggestions);
  } catch (err) {
    console.error("Suggestion error:", err.message);
    const status = err.message === "Query too short" ? 400 : 500;
    res.status(status).json({ error: err.message });
  }
};
