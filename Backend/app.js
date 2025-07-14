const express=require('express');
const app=express();
const dotenv=require('dotenv');
dotenv.config();
const connectToDb=require('./db/db');
const cookieParser=require('cookie-parser')
const cors = require('cors');


//routes
const userRoutes=require('./routes/user.routes');
const captainRoutes=require('./routes/captain.routes')
const mapRoutes=require('./routes/map.routes')
const rideRoutes=require("./routes/ride.routes")

connectToDb();

app.use(express.json());
app.use(cookieParser())
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true,
}));


app.get('/',(req,res)=>{
    res.send("hello");
})

app.use('/user',userRoutes);
app.use('/captain',captainRoutes)
app.use('/maps',mapRoutes)
app.use('/ride',rideRoutes)

module.exports=app