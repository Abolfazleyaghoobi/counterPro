const jwt = require("jsonwebtoken");

const adminAuth = (req, res, next) => {
  try {
    const token = req.cookies.adminToken;
tok="de0e72aa3391c96fedbb1b909d0dcdc92d041ec320c8c45ae73e7ad171513d16fc440d763c8fd80149e4289c8bacb1e75ad69cb29e136293fe5f94a5ba6d71ac"
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "توکن ارسال نشده است",
      });
    }

    const decoded = jwt.verify(
      token,
    tok
    );

    if (decoded.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "دسترسی غیرمجاز",
      });
    }

    req.admin = decoded;

    next();

  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        success: false,
        message: "توکن منقضی شده است",
      });
    }

    return res.status(401).json({
      success: false,
      message: "توکن نامعتبر است",
    });
  }
};

module.exports = {
  adminAuth,
};