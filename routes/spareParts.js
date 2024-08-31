const express = require("express");
const router = express.Router();
const getSpareParts = require("../controllers/spareParts.js");

router.get("/", getSpareParts);

module.exports = router;
