const express = require("express");
const router = express.Router();
const {
    getSpareParts,
    getPaginatedSpareParts,
} = require("../controllers/spareParts.js");

router.get("/all", getSpareParts);
router.get("/paginated", getPaginatedSpareParts);

module.exports = router;
