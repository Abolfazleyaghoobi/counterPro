const express=require("express");
// const { addUserController, getAllUserActive, getAllUserNotActive} = require("../controllers/user.controller");
const { validateUser } = require("../middlewares/validatore");
const isSignup = require("../middlewares/isSignup");
const { addUserController, getAllUserActive, getAllUserNotActive, getdAllUserFullInfo, addLikeController } = require("../controllers/user.controller");

const router=express.Router();
router.post("/create",validateUser,addUserController);
router.get("/usersactive",getAllUserActive);
router.get("/usersnotactive",getAllUserNotActive);
router.get("/alluserinfo", getdAllUserFullInfo);
router.post("/like", addLikeController);





module.exports = router;