const express=require("express");
// const { addUserController, getAllUserActive, getAllUserNotActive} = require("../controllers/user.controller");
const { validateUser } = require("../middlewares/validatore");
const isSignup = require("../middlewares/isSignup");
const { addUserController, getAllUserActive, getAllUserNotActive, getdAllUserFullInfo, addLikeController, getdAllUserFullInfoU, endLikeController } = require("../controllers/user.controller");

const router=express.Router();
router.post("/create",validateUser,addUserController);
router.get("/usersactive",getAllUserActive);
router.get("/usersnotactive",getAllUserNotActive);

router.get("/getalluserforuser", getdAllUserFullInfoU);
router.post("/like", addLikeController);
router.post("/endlike", endLikeController);





module.exports = router;