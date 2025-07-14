const express=require("express");
const router=express.Router();
const {query}=require("express-validator")
const mapController=require("../controllers/map.controller")
const authController=require("../middlewares/auth.midlleware")

router.get("/get-coordinate",query("address").isString().isLength({min:3}),authController.authUser,mapController.getCoordinates)
router.get("/get-coordinate-captain",query("address").isString().isLength({min:3}),authController.authCaptain,mapController.getCoordinates)

router.get("/get-distancetime",query("origin").isString().isLength({min:3}),query("destination").isString().isLength({min:3}),authController.authUser,mapController.getDistanceTime)

router.get("/suggestions",authController.authUser,mapController.getSuggestions);

module.exports=router;