const validator = require("validator");

const validateAdmin = (req, res, next) => {
  const { name, email } = req.body;

  // بررسی نام
  if (!name) {
    return res.status(400).json({
      success: false,
      message: "نام الزامی است",
    });
  }

  if (!validator.isLength(name.trim(), { min: 2, max: 50 })) {
    return res.status(400).json({
      success: false,
      message: "نام باید بین ۲ تا ۵۰ کاراکتر باشد",
    });
  }

  if (!validator.matches(name.trim(), /^[آ-یa-zA-Z\s]+$/)) {
    return res.status(400).json({
      success: false,
      message: "نام فقط باید شامل حروف باشد",
    });
  }

  // بررسی ایمیل
  if (!email) {
    return res.status(400).json({
      success: false,
      message: "ایمیل الزامی است",
    });
  }

  if (!validator.isEmail(email.trim())) {
    return res.status(400).json({
      success: false,
      message: "ایمیل وارد شده معتبر نیست",
    });
  }

  next();
};

module.exports = { validateAdmin };