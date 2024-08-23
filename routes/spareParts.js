const express = require("express");
const router = express.Router();
const {
    getSpareParts,
    setSparePart,
    updateSparePart,
    deleteSparePart,
} = require("../controllers/spareParts.js");

router.get("/", getSpareParts);

router.post("/", setSparePart);

router.patch("/:id", updateSparePart);

router.delete("/:id", deleteSparePart);

module.exports = router;
