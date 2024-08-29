const express = require("express");
const router = express.Router();
const {
    login,
    getSpareParts,
    setSparePart,
    updateSparePart,
    deleteSparePart,
    getOrders,
    updateOrder,
} = require("../controllers/admin");

const auth = require("../middlewares/auth");
const checkRole = require("../middlewares/checkRole");

router.post("/login", login);

router.get("/spare-parts", auth, checkRole(["admin"]), getSpareParts);
router.post("/spare-parts", auth, checkRole(["admin"]), setSparePart);
router.patch("/spare-parts/:id", auth, checkRole(["admin"]), updateSparePart);
router.delete("/spare-parts/:id", auth, checkRole(["admin"]), deleteSparePart);

router.get("/orders", auth, checkRole(["admin"]), getOrders);
router.patch("/orders/:id", auth, checkRole(["admin"]), updateOrder);

module.exports = router;
