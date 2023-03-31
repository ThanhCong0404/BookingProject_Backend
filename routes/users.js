import express from "express";
import { deleteUser, getUser, getUsers, updateUser } from "../controllers/user.js";

var router= express.Router();


//update
router.put("/:id", updateUser);

//delete
router.delete("/:id", deleteUser);

//Get
router.get("/:id", getUser);


//Get All
router.get("/", getUsers);


export default router;