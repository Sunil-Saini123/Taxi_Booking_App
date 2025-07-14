const mongoose=require("mongoose");
const Schema=mongoose.Schema;

const rideSchema=new Schema({
    user:{
        type: Schema.Types.ObjectId,
        ref : "user",
        required : true
    },
    captain : {
        type : Schema.Types.ObjectId,
        ref : "captain"
    },
    pickup : {
        type : String,
        required : true
    },
    destination : {
        type : String,
        required : true
    },
    fare : {
        type : Number,
        required : true
    },
    status : {
        type : String,
        enum : ["pending","accepted","ongoing","completed","cancelled"],
        default : "pending"
    },
    otp : {
        type : String,
        select : false
    },
    distance : {
        type : Number,
    },
    duration : {
        type : Number
    },
    paymentId : {
        type : String
    },
    orderId : {
        type : String
    },
    signature : {
        type : String
    }
})

const Ride = mongoose.model("ride",rideSchema);
module.exports=Ride;