const express = require("express");
const { getOrders, setOrder } = require("../controllers/orders");
const router = express.Router();

router.get("/", getOrders);
router.post("/", setOrder);

module.exports = router;
