import Hotel from "../models/Hotel.js";
import Room from "../models/Room.js";

export const createRoom = async (req,res,next) =>{
    const hotelId = req.params.hotelid;
    const newRoom = new Room(req.body);

    try {
        const savedRoom = await newRoom.save();
        try {
            await Hotel.findByIdAndUpdate(hotelId,{
                $push : {rooms: savedRoom._id} //$push in mongodb to push savedRoom._id to list rooms of table Hotel db
            });
        } catch (error) {
            next(error);
        }

        res.status(200).json(savedRoom);

    } catch (error) {
        next(error);
    }
}


export const updateRoom = async (req,res,next)=>{
    
    try {
        const updateRoom = await Room.findByIdAndUpdate(req.params.id,{ $set: req.body},{new:true}); //option new:true để yêu cầu dữ liệu trả về của update là dữ liệu sau khi đc thay đổi
        res.status(200).json(updateRoom);
        
        
    } catch (error) {
        next(error);
    }
}

export const updateRoomAvailability = async (req,res,next)=>{
    
    try {
        await Room.updateOne({"roomNumbers._id": req.params.id},{
            $push: {
                "roomNumbers.$.unavailableDates" : req.body.dates
            }
        })
        res.status(200).json("Room status has been updated");        
        
    } catch (error) {
        next(error);
    }
}


export const deleteRoom = async (req,res,next)=>{
    
    const hotelId = req.params.hotelid;
    
    try {
        await Room.findByIdAndDelete(req.params.id); //remove room by idRoom
        try {
            await Hotel.findByIdAndUpdate(hotelId,{ //update list rooms of hotel by hotelid
                $pull : {rooms: req.params.id} //$pull in mongodb to remove roomid to list rooms of table Hotel db
            });
        } catch (error) {
            next(error);
        }


        res.status(200).json("Room has been deleted.");

        
        
    } catch (error) {
        next(error);
    }
}


export const getRoom = async (req,res,next)=>{
    const newRoom = new Room(req.body);
    
    try {
        const room = await Room.findById(req.params.id);
        res.status(200).json(room);
        
        
    } catch (error) {
        next(error);
    }
}

export const getRooms = async (req,res,next)=>{
    try {
        const rooms = await Room.find();
        res.status(200).json(rooms);
        
        
    } catch (error) {
        next(error);
    }
}