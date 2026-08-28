const {
  getUserByNationalNumber,
  createUser,
  getActiveUsersCount,
  getInactiveUsers,
  getAllActiveUsers,
  addLike,
} = require("../services/user.service");

const addUserController = async (req, res) => {
  try {
    const user = await getUserByNationalNumber(
      req.body.nationalNumber
    );

    if (user) {
      return res.status(400).json({
        message: "تو قبلا ثبت نام کردی",
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






const getAllUserActive = async (req, res) => {
  try {
    const activeUser = await getActiveUsersCount();

    return res.status(200).json({
      message: activeUser,
    });
  } catch (error) {
    console.error("Get active users error:", error);

    return res.status(500).json({
      message: error.message,
    });
  }
};



const getAllUserNotActive = async (req, res) => {
  try {
    const resultUser = await getInactiveUsers();

    return res.status(200).json({
      message: resultUser,
    });
  } catch (error) {
    console.error("Get inactive users error:", error);

    return res.status(500).json({
      message: error.message,
    });
  }
};


const getdAllUserFullInfo = async (req, res) => {
  try {
    const activeUser = await getAllActiveUsers();

    return res.status(200).json({
      message: activeUser,
    });
  } catch (error) {
    console.error("Get all users error:", error);

    return res.status(500).json({
      message: error.message,
    });
  }
};






const addLikeController = async (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "شناسه کاربر ارسال نشده است",
      });
    }

    const user = await addLike(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "کاربر پیدا نشد یا حساب کاربر فعال نیست",
      });
    }

    return res.status(200).json({
      success: true,
      message: "لایک با موفقیت ثبت شد",
      likes: user.likes,
    });
  } catch (error) {
    console.error("Add like controller error:", error);

    return res.status(500).json({
      success: false,
      message: "خطایی در ثبت لایک رخ داد",
    });
  }
};


module.exports = {
  addUserController,
  getAllUserActive,
  getAllUserNotActive,  addLikeController,
  getdAllUserFullInfo
};












































// const addUserController = async (req, res) => {
//   try {
//     const isSignup = await findUserByNationalNumber(req.body.nationalNumber);
//     if (isSignup) {
//       res.status(400).json({ message: "تو قبلا ثبت نام کردی" });
//       return;
//     }
//     console.log('isSignup', isSignup)
//     if (!isSignup) {
//       const addUserService = await addUser(req.body);

//       res.status(200).json({ message: "عملیات ثبت نام موفقیت امیز بوده" });
//     } else {
//       res.status(400).json({ message: "خطا در ثبت نام" });
//     }
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// const getAllUserActive= async (req,res)=>{
//     const activeUser= await findUserByIsActive();
//     res.status(200).json({message:activeUser})

// }


// const getAllUserNotActive= async (req,res)=>{
//   try {
//     const resutlUser= await findUserByIsNotActive();
//     res.status(200).json({message:resutlUser})
//   } catch (error) {
    
//   }
// }




// const getdAllUserForAdmin= async (req,res)=>{
//     const activeUser= await getAllUser();
//     res.status(200).json({message:activeUser})

// }


// module.exports = {
//     addUserController,
//     getAllUserActive,
//     getAllUserNotActive,
//     getdAllUserForAdmin
// };
