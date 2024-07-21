const express = require("express");
const router = express.Router();
const {signup, login, current} = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/signup", signup);
router.post("/login", login);
router.get("/current", authMiddleware, current)

module.exports = router;