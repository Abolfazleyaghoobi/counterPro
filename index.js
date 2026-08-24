const dotenv = require("dotenv");
dotenv.config();

const connectDB = require("./config/db");
connectDB();

const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
const userRoutes= require("./routes/user.routes");
const adminRoutes = require("./routes/admin.route");
const cors = require("cors")
app.use(express.json());
app.use(cookieParser());
app.use(cors())
app.use(userRoutes)
app.use(adminRoutes)


app.listen(3000, () => {
    console.log("server is running on port 3000");
})

