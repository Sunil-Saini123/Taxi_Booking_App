const mongoose=require('mongoose');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');

const captainSchema=new mongoose.Schema({
    fullname:{
        firstname:{
            type:String,
            required:true,
            minlength:[3,"First name should be atleast 3 characters long"],
        },
        lastname:{
            type:String,
            minlength:[3,"Last name should be atleast 3 characters long"],
        }
    },
    email:{
        type:String,
        required:true,
        unique:true,
        minlength:[6,"Email should be atleast 6 characters long"],
    },
    password:{
        type:String,
        required:true,
        select:false,
    },
    SocketId:{
        type:String,
    },
    status:{
        type:String,
        enum:["active","inactive"],
        default:"inactive",
    },
    vehicle:{
        color:{
            type:String,
            required:true,
            minlength:[3,"Color should be atleast 3 characters long"],
        },
        plate:{
            type:String,
            required:true,
            minlength:[3,"Plate should be atleast 3 characters long"],
        },
        capacity:{
            type:Number,
            required:true,
            min:[3,"Capacity must be atleast 3"],
        },
        type : {
            type: String,
            enum : ["taxi","moto","auto"],
            default : "taxi"
        }
    },
    location:{
        ltd:{
            type:Number
        },
        lng:{
            type:Number
        }
    }
})

captainSchema.methods.generateAuthToken=function(){
    const token=jwt.sign({_id:this._id},process.env.SECRET,{expiresIn:'24h'});
    return token;
}

captainSchema.methods.comparePassword=async function(password){
    return await bcrypt.compare(password,this.password);
}

captainSchema.statics.generatehashpassword=async function(password){
    return await bcrypt.hash(password,10);
}

const captainModel=mongoose.model('captain',captainSchema);
module.exports=captainModel