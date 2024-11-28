// Import the School model
const School = require("../models/SchoolModel"); // Adjust the path based on your project structure

// Add a school using Sequelize
const addSchool = async (req, res) => {
  const { name, address, latitude, longitude } = req.body;

  try {
    // Create a new school using Sequelize
    const newSchool = await School.create({
      name,
      address,
      latitude,
      longitude,
    });

    res.status(201).json({
      message: "School added successfully",
      id: newSchool.id,
    });
  } catch (err) {
    res.status(500).json({
      error: "Failed to add school",
      details: err.message,
    });
  }
};

// Get all schools and sort by distance using the Haversine formula
const getSchools = async (req, res) => {
  const { userLat, userLon } = req.query;

  if (!userLat || !userLon) {
    return res.status(400).json({ error: "User coordinates are required" });
  }

  try {
    // Fetch all schools from the database
    const schools = await School.findAll({
      attributes: ["id", "name", "address", "latitude", "longitude"],
    });

    // Haversine formula to calculate the distance
    const haversineDistance = (lat1, lon1, lat2, lon2) => {
      const R = 6371; // Radius of Earth in kilometers
      const dLat = ((lat2 - lat1) * Math.PI) / 180;
      const dLon = ((lon2 - lon1) * Math.PI) / 180;
      const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos((lat1 * Math.PI) / 180) *
          Math.cos((lat2 * Math.PI) / 180) *
          Math.sin(dLon / 2) *
          Math.sin(dLon / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      return R * c; // Distance in kilometers
    };

    // Calculate distance and sort schools by distance
    const schoolsWithDistance = schools.map((school) => {
      const distance = haversineDistance(
        parseFloat(userLat),
        parseFloat(userLon),
        school.latitude,
        school.longitude
      );
      return { ...school.dataValues, distance }; // Attach distance to the school object
    });

    // Sort schools by distance (ascending)
    const sortedSchools = schoolsWithDistance.sort(
      (a, b) => a.distance - b.distance
    );

    // Return the sorted schools
    res.status(200).json(sortedSchools);
  } catch (err) {
    res.status(500).json({
      error: "Failed to fetch schools",
      details: err.message,
    });
  }
};

module.exports = {
  addSchool,
  getSchools,
};
