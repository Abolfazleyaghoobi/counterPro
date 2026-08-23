const dotenv = require("dotenv");
dotenv.config();

const connectDB = require("./config/db");
connectDB();

const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
const userRoutes= require("./routes/user.routes");
app.use(express.json());
app.use(cookieParser());
app.use(userRoutes)



app.listen(3000, () => {
    console.log("server is running on port 3000");
})

