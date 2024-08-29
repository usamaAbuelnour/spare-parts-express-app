const express = require("express");
const { getOrders, setOrder, deleteOrder } = require("../controllers/orders");
const router = express.Router();

router.get("/", getOrders);
router.post("/", setOrder);
router.delete("/:orderId", deleteOrder);

module.exports = router;
