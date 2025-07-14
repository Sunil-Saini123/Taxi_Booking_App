const captainModel = require("../models/captain.model");

module.exports.getCoordinatesFromAddress = async (address) => {
  if (!address) {
    throw new Error("Address is required");
  }

  const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`;

  const response = await fetch(url, {
    headers: {
      'User-Agent': 'MyTestApp/1.0'
    }
  });

  const data = await response.json();

  if (data.length > 0) {
    return {
      lat: parseFloat(data[0].lat),
      lon: parseFloat(data[0].lon)
    };
  } else {
    throw new Error("Address not found");
  }
};

module.exports.getAddressSuggestions = async (query) => {
  if (!query || query.trim().length < 3) {
    throw new Error("Query too short");
  }

  const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&addressdetails=1&limit=5`;

  const response = await fetch(url, {
    headers: {
      'User-Agent': 'TaxiApp/1.0'
    }
  });

  if (!response.ok) {
    throw new Error(`Nominatim error: ${response.status}`);
  }

  const data = await response.json();

  return data.map(place => ({
    label: place.display_name,
    lat: parseFloat(place.lat),
    lon: parseFloat(place.lon)
  }));
};


module.exports.getDistanceAndTime = async (origin, destination, mode = "driving-car") => {
  if (!origin || !destination) {
    throw new Error("Both 'from' and 'to' addresses are required");
  }

  const fromCoords = await this.getCoordinatesFromAddress(origin);
  if (!fromCoords) {
    throw new Error(`Origin address not found: ${origin}`);
  }

  const toCoords = await this.getCoordinatesFromAddress(destination);
  if (!toCoords) {
    throw new Error(`Destination address not found: ${destination}`);
  }

  const apiKey = process.env.OpenRouteKey;
  const url = `https://api.openrouteservice.org/v2/directions/${mode}`;

  const routeRes = await fetch(url, {
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

  const routeData = await routeRes.json();

  if (!routeData || !routeData.routes || routeData.routes.length === 0) {
    throw new Error("Route not found");
  }

  const summary = routeData.routes[0].summary;

  return {
    origin,
    destination,
    origin_coord: fromCoords,
    destination_coord: toCoords,
    distance_km: (summary.distance / 1000).toFixed(2),
    duration_min: (summary.duration / 60).toFixed(2),
    // geometry: routeData.routes[0].geometry, // Uncomment if needed for maps
  };
};

module.exports.getCaptainInRadius = async (ltd,lng,radius)=>{

  const captains = await captainModel.find({
    location :{
      $geoWithin : {
        $centerSphere : [[ltd,lng],radius/6371]
      }
    }
  })

  return captains;
}