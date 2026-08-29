const validator = require("validator");

const validateUser = (req, res, next) => {
  const {
    fullName,
    topSkill,
    githubUrl,
    linkedinUrl,
    telegramUsername,
    instagramUsername,
    nationalNumber,
  } = req.body;

  // بررسی نام و نام خانوادگی
  if (!fullName) {
    return res.status(400).json({
      success: false,
      message: "نام و نام خانوادگی الزامی است",
    });
  }

  if (
    !validator.isLength(fullName.trim(), {
      min: 2,
      max: 100,
    })
  ) {
    return res.status(400).json({
      success: false,
      message: "نام و نام خانوادگی باید بین ۲ تا ۱۰۰ کاراکتر باشد",
    });
  }

  if (!validator.matches(fullName.trim(), /^[آ-یa-zA-Z\s]+$/)) {
    return res.status(400).json({
      success: false,
      message: "نام و نام خانوادگی فقط باید شامل حروف باشد",
    });
  }

  // بررسی مهارت برتر
  if (!topSkill) {
    return res.status(400).json({
      success: false,
      message: "مهارت برتر الزامی است",
    });
  }

  if (
    !validator.isLength(topSkill.trim(), {
      min: 1,
      max: 100,
    })
  ) {
    return res.status(400).json({
      success: false,
      message: "مهارت برتر باید بین ۲ تا ۱۰۰ کاراکتر باشد",
    });
  }

  // بررسی شماره ملی
  if (
    !nationalNumber ||
    !validator.isLength(String(nationalNumber), {
      min: 10,
      max: 10,
    })
  ) {
    return res.status(400).json({
      success: false,
      message: "شماره ملی وارد شده معتبر نیست",
    });
  }

  if (!/^\d{10}$/.test(String(nationalNumber))) {
    return res.status(400).json({
      success: false,
      message: "شماره ملی باید شامل ۱۰ رقم باشد",
    });
  }

  // بررسی GitHub
  if (githubUrl && !validator.isURL(githubUrl)) {
    return res.status(400).json({
      success: false,
      message: "لینک GitHub معتبر نیست",
    });
  }

  // بررسی LinkedIn
  if (linkedinUrl && !validator.isURL(linkedinUrl)) {
    return res.status(400).json({
      success: false,
      message: "لینک LinkedIn معتبر نیست",
    });
  }

  // بررسی Telegram
  if (telegramUsername) {
    const telegram = telegramUsername.replace("@", "");

    if (!/^[a-zA-Z0-9_]{5,32}$/.test(telegram)) {
      return res.status(400).json({
        success: false,
        message: "آیدی تلگرام معتبر نیست",
      });
    }
  }

  // بررسی Instagram
  if (instagramUsername) {
    const instagram = instagramUsername.replace("@", "");

    if (!/^[a-zA-Z0-9._]{1,30}$/.test(instagram)) {
      return res.status(400).json({
        success: false,
        message: "آیدی اینستاگرام معتبر نیست",
      });
    }
  }

  next();
};

module.exports = {
  validateUser,
};