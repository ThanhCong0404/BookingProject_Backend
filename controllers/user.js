import User from "../models/User.js";


export const updateUser = async (req,res,next)=>{
    const newUser = new User(req.body);
    
    try {
        const updateUser = await User.findByIdAndUpdate(req.params.id,{ $set: req.body}); //add more option {new:true} if database dont change
        res.status(200).json(updateUser);
        
        
    } catch (error) {
        next(error);
    }
}


export const deleteUser = async (req,res,next)=>{
    const newUser = new User(req.body);
    
    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json("User has been deleted.");
        
        
    } catch (error) {
        next(error);
    }
}


export const getUser = async (req,res,next)=>{
    const newUser = new User(req.body);
    
    try {
        const user = await User.findById(req.params.id);
        res.status(200).json(user);
        
        
    } catch (error) {
        next(error);
    }
}

export const getUsers = async (req,res,next)=>{
    const newUser = new User(req.body);
    
    try {
        const users = await User.find();
        res.status(200).json(users);
        
        
    } catch (error) {
        next(error);
    }
}