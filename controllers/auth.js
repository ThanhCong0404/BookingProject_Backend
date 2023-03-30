import User from "../models/User.js";
import bcrypt from "bcryptjs";
import {createError} from "../utils/error.js"

export const register = async (req,res,next) => {
    try {
        //dung bcrypt hash password
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password,salt);

        const newUser = new User({
            username : req.body.username,
            email : req.body.email,
            password : hash
            
        })

        newUser.save();
        res.status(200).json("User has been created");
    } catch (error) {
        next(error);
    }
}

export const login = async (req,res,next) => {
    try {
        const user = await User.findOne({username: req.body.username}); 
        if(!user){
            return next(createError(404,"User not found"));
        }

        //bcrypt
        const isPasswordCorrect = await bcrypt.compare( req.body.password, user.password );
        if(!isPasswordCorrect){
            return next(createError(400,"Wrong password or username"));
        }

        const {password, isAdmin, ...other} = user._doc; //dữ liệu nằm trong _doc
        res.status(200).json({...other});
    } catch (error) {
        next(error);
    }
}