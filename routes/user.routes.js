const express=require("express");
const { addUserController, getAllUserActive, getAllUserNotActive} = require("../controllers/user.controller");
const { validateUser } = require("../middlewares/validatore");
const isSignup = require("../middlewares/isSignup");

const router=express.Router();
router.post("/create",validateUser,isSignup,addUserController);
router.get("/usersactive",getAllUserActive);
router.get("/usersnotactive",getAllUserNotActive);






module.exports = router;