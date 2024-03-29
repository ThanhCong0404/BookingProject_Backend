import mongoose from "mongoose";


const UserSchema = new mongoose.Schema({
    username : {
        type: String,
        required: true,
        unique:true 
    },
    email : {
        type: String,
        required: true,
        unique:true 
    },
    password : {
        type: String,
        required: true 
    },
    country : {
        type: String,
        required: false,
        unique:false 
    },
    city : {
        type: String,
        required: false,
        unique:false 
    },
    country : {
        type: String,
        required: false,
        unique:false 
    },
    phone : {
        type: String,
        required: false,
        unique:false 
    },
    img : {
        type: String,
        required: false,
        unique:false 
    },
    isAdmin : {
        type: Boolean,
        default: false 
    }
},{ timestamps: true } ) // automatically add `createdAt` and `updatedAt` fields

export default mongoose.model("User",UserSchema);