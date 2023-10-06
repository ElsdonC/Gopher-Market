const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");

router.get("/google", authController.googleAuth);

router.get("/google/callback", authController.googleAuthCB);

router.post("/demo", authController.demoAuth);

module.exports = router;