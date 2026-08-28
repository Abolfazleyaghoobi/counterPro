const {  rejectUserService, activateUser, getUserByNationalNumber, createUser } = require("../services/user.service.js");
// const { rejectUser } =require("../services/user.service");

const {
  
  getAdminByEmail,
} = require("../services/admin.service");

const {
  generateAdminToken,
} = require("../services/adminToken");


const loginAdmin = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "ایمیل الزامی است",
      });
    }

    const admin = await getAdminByEmail(email);

    if (!admin) {
      return res.status(404).json({
        success: false,
        message: "ادمین پیدا نشد",
      });
    }

    const token = generateAdminToken(admin);

    res.cookie("adminToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      success: true,
      message: "ورود موفقیت‌آمیز بود",
      admin: {
        id: admin.id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
      },
    });
  } catch (error) {
    console.error("Login admin error:", error);

    return res.status(500).json({
      success: false,
      message: "خطا در ورود ادمین",
    });
  }
};







const activateUserController = async (req, res) => {
  try {
    const { nationalNumber } = req.body;

    if (!nationalNumber) {
      return res.status(400).json({
        success: false,
        message: "کد ملی ارسال نشده است",
      });
    }

    const user = await activateUser(nationalNumber);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "کاربر پیدا نشد یا قبلاً فعال شده است",
      });
    }

    return res.status(200).json({
      success: true,
      message: "کاربر با موفقیت فعال شد",
      user,
    });
  } catch (error) {
    console.error("Activate user error:", error);

    return res.status(500).json({
      success: false,
      message: "خطا در فعال کردن کاربر",
    });
  }
};







const rejectUserController = async (req, res) => {
  try {
    const { nationalNumber } = req.body;

    if (!nationalNumber) {
      return res.status(400).json({
        success: false,
        message: "کد ملی ارسال نشده است",
      });
    }

    const user = await rejectUserService(nationalNumber);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "کاربر پیدا نشد یا قبلاً حذف شده است",
      });
    }

    return res.status(200).json({
      success: true,
      message: "ثبت‌نام کاربر رد شد و اطلاعات او حذف شد",
    });
  } catch (error) {
    console.error("Reject user controller error:", error);

    return res.status(500).json({
      success: false,
      message: "خطایی در رد کردن کاربر رخ داد",
    });
  }
};






const addUserHandController = async (req, res) => {
  try {
    const user = await getUserByNationalNumber(
      req.body.nationalNumber
    );

    if (user) {
      return res.status(400).json({
        message: "کاربر قبلا ثبت نام کرده ",
      });
    }

    const newUser = await createUser(req.body);

    return res.status(201).json({
      message: "عملیات ثبت نام موفقیت آمیز بوده",
      user: newUser,
    });

  } catch (error) {
    console.error("Add user controller error:", error);

    return res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  loginAdmin,
  activateUserController,
  rejectUserController,
  addUserHandController
};