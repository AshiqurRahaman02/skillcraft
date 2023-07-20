const express = require('express');
const cors = require('cors');

require("dotenv").config();

const {connection} = require("./config/db")
const {userRouter} = require("./routes/user.route");
const { authRouter } = require('./routes/auth.route');

const app = express();

app.use(express.json());
app.use(cors());


app.use("/user",userRouter)
app.use("/auth", authRouter)

app.get('/', (req,res)=>{
    res.redirect("https://skilcraft-india.netlify.app/")
})

app.listen(process.env.port, async()=>{
    try {
        await connection;
        console.log("Connected to Database")
    } catch (error) {
        console.log(error)
        console.log("Unable to connect to Database")
    }
    console.log(`Server is running on port ${process.env.port}`);
})