
const express = require("express");
const {registerController,loginController,logoutController,googleController} = require("../controllers/userControllers");



const router = express.Router();

router.post("/google",googleController);
router.post("/register",registerController);
router.post("/login",loginController);
router.post("/logout",logoutController);


module.exports = router;