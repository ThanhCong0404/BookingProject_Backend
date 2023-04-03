import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoute from "./routes/auth.js"
import usersRoute from "./routes/users.js"
import hotelsRoute from "./routes/hotels.js"
import roomsRoute from "./routes/rooms.js";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();
dotenv.config()

const connect = async () => {
   try {
        await mongoose.connect(process.env.MONGO);
    } catch (error) {
        throw error;
    }
}
    
mongoose.connection.on("connected",()=> {
    console.log("Database connected");
})

mongoose.connection.on("disconnected",()=> {
    console.log("Database disconnected");
})

//midlewares
app.use(cors()); //Cross-Origin Resource Sharing cho phép các trang web ở domain khác nhau có thể truy cập tài nguyên từ các domain khác
app.use(cookieParser());
app.use(express.json());

app.use("/api/auth",authRoute);
app.use("/api/users",usersRoute);
app.use("/api/hotels",hotelsRoute);
app.use("/api/rooms",roomsRoute);


app.use((err,req,res,next)=>{
    const errorStatus = err.status || 500;
    const errMessage = err.message || "Something went wrong !";

    return res.status(errorStatus).json({
        success:false,
        status: errorStatus,
        message: errMessage,
        stack: err.stack
    });
})

app.listen(8888,()=>{
    connect();
    console.log("Connected to backend");
})

