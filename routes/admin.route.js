const express = require("express");

const { loginAdmin, activateUser } = require("../controllers/admin.controller");

const { adminAuth } = require("../middlewares/adminAuth");
const { getdAllUserForAdmin } = require("../controllers/user.controller");

const router = express.Router();

router.post("/login", loginAdmin);

router.patch("/users/activate", adminAuth, activateUser);
router.get("/alluserforadmin",adminAuth, getdAllUserForAdmin)

module.exports = router;
