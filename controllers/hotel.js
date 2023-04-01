import Hotel from "../models/Hotel.js";

export const createHotel = async (req,res,next)=>{
    const newHotel = new Hotel(req.body);
    
    try {
        const savedHotel = await newHotel.save();
        res.status(200).json(savedHotel);        
        
    } catch (error) {
        next(error);
    }
}

export const updateHotel = async (req,res,next)=>{
    
    try {
        const updateHotel = await Hotel.findByIdAndUpdate(req.params.id,{ $set: req.body},{new:true}); //option new:true để yêu cầu dữ liệu trả về của update là dữ liệu sau khi đc thay đổi
        res.status(200).json(updateHotel);
        
        
    } catch (error) {
        next(error);
    }
}


export const deleteHotel = async (req,res,next)=>{
    try {
        await Hotel.findByIdAndDelete(req.params.id);
        res.status(200).json("Hotel has been deleted.");
        
        
    } catch (error) {
        next(error);
    }
}


export const getHotel = async (req,res,next)=>{
    
    try {
        const hotel = await Hotel.findById(req.params.id);
        res.status(200).json(hotel);
        
        
    } catch (error) {
        next(error);
    }
}

export const getHotels = async (req,res,next)=>{
    
    try {
        const hotels = await Hotel.find();
        res.status(200).json(hotels);
        
        
    } catch (error) {
        next(error);
    }
}

//trả về list số lượng hotel theo thứ tự list tên TP
export const countByCity = async (req,res,next)=>{
    const cities = req.query.cities.split(","); //  ex: /hotels/countByCity?cities=HCM,HaNoi
    
    try {
        const hotels = await Promise.all(cities.map(city=>{
            return Hotel.countDocuments({city: city});
        }))
        res.status(200).json(hotels);
        
        
    } catch (error) {
        next(error);
    }
}