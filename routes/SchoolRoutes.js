const express = require("express");
const { addSchool, getSchools } = require("../controller/SchoolController");

const router = express.Router();

router.post("/addSchool", addSchool);
router.get("/listSchools", getSchools);

module.exports = router;
