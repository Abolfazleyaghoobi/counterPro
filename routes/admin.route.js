const express = require("express");

const {
  loginAdmin,
  activateUser,
  rejectUserController,
  activateUserController,
  addUserHandController,
} = require("../controllers/admin.controller");

const { adminAuth } = require("../middlewares/adminAuth");
const {  getdAllUserFullInfo } = require("../controllers/user.controller");

const router = express.Router();

router.post("/login", loginAdmin);
router.post("/addforadmin",adminAuth,addUserHandController)
router.patch("/users/activate", adminAuth, activateUserController);

router.get("/alluserinfo", getdAllUserFullInfo);

router.delete("/users/reject", adminAuth, rejectUserController);
module.exports = router;
