const jwt = require("jsonwebtoken");

const adminAuth = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        success: false,
        message: "توکن ارسال نشده است",
      });
    }

    if (!authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "فرمت توکن صحیح نیست",
      });
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "توکن ارسال نشده است",
      });
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
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