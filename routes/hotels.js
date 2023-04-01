import express from "express";
import { countByCity, createHotel, deleteHotel, getHotel, getHotels, updateHotel } from "../controllers/hotel.js";
import { verifyAdmin } from "../utils/verifyToken.js";

var router= express.Router();

//create
router.post("/",verifyAdmin, createHotel);

//update
router.put("/:id",verifyAdmin, updateHotel);

//delete
router.delete("/:id",verifyAdmin, deleteHotel);

//Get
router.get("/find/:id", getHotel);


//Get All
router.get("/", getHotels);


router.get("/countByCity", countByCity);
router.get("/countByType", getHotels);



export default router;