const mongoose = require('mongoose');
const {Schema}=mongoose;

const PlaceSchema = new mongoose.Schema({
    owner:{type:mongoose.Schema.Types.ObjectId, Ref:'User'},
    title: String,
    name:String,    
    address:String,
    description:String,
    photos:[String],
    perks:[String],
    extraInfo:String,
    checkIn:Number,
    checkOut: Number, 
    maxGuests: Number, 
    price: Number, 
});

const PlaceModel = mongoose.model('Place', PlaceSchema); 

module.exports= PlaceModel;



