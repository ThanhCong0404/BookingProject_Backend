import express from "express";
import { deleteUser, getUser, getUsers, updateUser } from "../controllers/user.js";
import { verifyAdmin, verifyToken, verifyUser } from "../utils/verifyToken.js";

var router= express.Router();

// router.get("/checkauthentication",verifyToken,(req,res,next)=>{
//     res.send("Hello , you are logged in !");
// })

// router.get("/checkuser/:id",verifyUser,(req,res,next)=>{
//     res.send("Hello USER, you are logged in and you can delete you account!");
// })

// router.get("/checkadmin/:id",verifyAdmin,(req,res,next)=>{
//     res.send("Hello ADMIN, you are logged in and you can delete all accounts!");
// })

//update
router.put("/:id",verifyUser, updateUser);

//delete
router.delete("/:id",verifyUser, deleteUser);

//Get
router.get("/:id",verifyUser, getUser);


//Get All
router.get("/",verifyAdmin, getUsers);


export default router;