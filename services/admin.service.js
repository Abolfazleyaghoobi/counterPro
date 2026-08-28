const {
  findAdminByEmail,
} = require("../repository/admin.repository");

const getAdminByEmail = async (email) => {
  try {
    const admin = await findAdminByEmail(email);

    return admin;
  } catch (error) {
    console.error("Error finding admin:", error);
    throw error;
  }
};

module.exports = {
  getAdminByEmail,
};