const express=require("express");
const addUser = require("../controllers/user.controller");
const { validateUser } = require("../middlewares/validatore");
const isSignup = require("../middlewares/isSignup");

const router=express.Router();
router.post("/create",validateUser,isSignup,addUser);
router.get("/users",isSignup,(req,res)=>res.send("hello world"));


module.exports = router;