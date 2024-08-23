const express = require("express");
const router = express.Router();
const { getAllUsers, logIn } = require("../controllers/admins");
const auth = require("../middlewares/auth");

router.get("", auth, getAllUsers);
router.post("/login", logIn);

module.exports = router;
