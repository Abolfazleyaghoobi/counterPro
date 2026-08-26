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


app.use(cors({
  origin: 'https://counter-pro-xi.vercel.app', // ← آدرس فرانت‌اند شما
  credentials: true, // ← اجازه ارسال کوکی
  methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
  
}));

app.use(userRoutes)
app.use(adminRoutes)


app.listen(3000, () => {
    console.log("server is running on port 3000");
})

