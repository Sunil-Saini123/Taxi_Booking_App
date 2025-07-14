const express = require("express");
const router = express.Router();
const {body, query}=require("express-validator")
const rideController = require("../controllers/ride.controller")
const authMiddleware = require("../middlewares/auth.midlleware")

router.post("/create",
    body("pickup").isString().isLength({min : 3}).withMessage("invalid pickup location"),
    body("destination").isString().isLength({min : 3}).withMessage("invalid destination location"),
    body("vehicleType").isString().isIn(["taxi","moto","auto"]).withMessage("invalid vehicle name"),
    authMiddleware.authUser,
    rideController.createRide
)

router.post("/getfare",
    body("pickup").isString().isLength({min : 3}).withMessage("invalid pickup location"),
    body("destination").isString().isLength({min : 3}).withMessage("invalid destination location"),
    authMiddleware.authUser,
    rideController.getFare
)

router.post('/confirm',
    authMiddleware.authCaptain,
    body("rideId").isMongoId().withMessage("invalid ride Id"),
    rideController.confirmRide
)

router.get("/start-ride",
    query('rideId').isMongoId().withMessage("invalid ride Id"),
    query('otp').isString().isLength({min : 6,max: 6}).withMessage("invalide otp"),
    authMiddleware.authCaptain,
    rideController.startRide
)

router.get("/end-ride",
    query('rideId').isMongoId().withMessage("invalid ride Id"),
    authMiddleware.authCaptain,
    rideController.endRide
)

module.exports=router;