const jwt = require("jsonwebtoken");

const generateAdminToken = (admin) => {
  const tok="de0e72aa3391c96fedbb1b909d0dcdc92d041ec320c8c45ae73e7ad171513d16fc440d763c8fd80149e4289c8bacb1e75ad69cb29e136293fe5f94a5ba6d71ac"
  return jwt.sign(
    {
      id: admin._id,
      email: admin.email,
      role: admin.role,
    },
   tok,
    {
      expiresIn: "7d",
    }
  );
};

module.exports = {
  generateAdminToken,
};