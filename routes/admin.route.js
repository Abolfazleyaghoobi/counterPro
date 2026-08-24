const express = require("express");

const {
  loginAdmin,
  activateUser,
} = require("../controllers/admin.controller");

const {
  adminAuth,
} = require("../middlewares/adminAuth");

const router = express.Router();

router.post("/login", loginAdmin);

router.patch(
  "/users/activate",
  adminAuth,
  activateUser
);

module.exports = router;