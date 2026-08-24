const adminModel = require("../models/admin.model");

const findAdminByEmail = async (email) => {
  try {
    const admin = await adminModel.findOne({
      email: email.trim().toLowerCase(),
    });

    return admin;
  } catch (error) {
    console.error("Error finding admin:", error);
    throw error;
  }
};

module.exports = {
  findAdminByEmail,
};