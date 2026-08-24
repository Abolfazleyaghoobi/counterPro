const { activeUser } = require("../services/user.service");
const {
  findAdminByEmail,
} = require("../services/admin.service");

const {
  generateAdminToken,
} = require("../services/adminToken");
0
const loginAdmin = async (req, res) => {
  try {
    const { email } = req.body;

    const admin = await findAdminByEmail(email);

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
        id: admin._id,
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











const activateUser = async (req, res) => {
  try {
    const { nationalNumber } = req.body;

    const user = await activeUser(nationalNumber);

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



module.exports = {
  loginAdmin,
  activateUser
};