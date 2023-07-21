const express = require('express');
const cors = require('cors');
const cloudinary = require("cloudinary");
const fileupload = require("express-fileupload");
const bodyParser = require("body-parser");

require("dotenv").config();

const {connection} = require("./config/db")
const {userRouter} = require("./routes/user.route");
const {videoRouter} = require("./routes/video.route");
const {courseRouter} = require("./routes/course.route");
const { authRouter } = require('./routes/auth.route');

const app = express();

app.use(express.json());
app.use(
	cors({
		origin: "*",
		credentials: true,
	})
);
app.use(
	fileupload({
		useTempFiles: true,
	})
);
app.use(bodyParser.json());

cloudinary.config({
	cloud_name: process.env.cloudName,
	api_key: process.env.apiKey,
	api_secret: process.env.apiSecret,
});


app.use("/user",userRouter)
app.use("/auth", authRouter)
app.use("/video", videoRouter)
app.use("/course", courseRouter)

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