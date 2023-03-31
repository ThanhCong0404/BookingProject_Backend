import express from "express";
import { createHotel, deleteHotel, getHotel, getHotels, updateHotel } from "../controllers/hotel.js";
import { verifyAdmin } from "../utils/verifyToken.js";

var router= express.Router();

//create
router.post("/",verifyAdmin, createHotel);

//update
router.put("/:id",verifyAdmin, updateHotel);

//delete
router.delete("/:id",verifyAdmin, deleteHotel);

//Get
router.get("/:id", getHotel);


//Get All
router.get("/", getHotels);



export default router;