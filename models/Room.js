import mongoose from "mongoose";


const RoomSchema = new mongoose.Schema({
    title : {
        type: String,
        required: true,
    },
    price : {
        type: Number,
        required: true
    },
    maxPeople : {
        type: Number,
        required: true
    },
    desc : {
        type: String,
        required: true 
    },
    roomNumbers : [{
        number: Number,
        unavailableDates: {type : [Date]} //list các ngày phòng đã đc đặt không thể đặt 
    }]
},{ timestamps: true } ) // automatically add `createdAt` and `updatedAt` fields

export default mongoose.model("Room",RoomSchema);