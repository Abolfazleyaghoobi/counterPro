const validator = require("validator");



const validateUser = (req, res, next) => {
  const { name, nationalNumber } = req.body;
  

  // بررسی نام
  if (!name) {
    return res.status(400).json({
      success: false,
      message: "نام الزامی است",
    });
  }
  if (!name || !validator.isLength(name.trim(), { min: 2, max: 50 })) {
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

  // بررسی شماره ملی
  if (!validator.isLength(String(nationalNumber), { min: 10, max: 10 })) {
    return res.status(400).json({
      success: false,
      message: "شماره ملی وارد شده معتبر نیست",
    });
  }

  next();
};

// export default validateUser;
module.exports = { validateUser };
