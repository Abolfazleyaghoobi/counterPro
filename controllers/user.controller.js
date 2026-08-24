const {
  addUser,
  findUserByNationalNumber,
  findUserByIsActive,
  findUserByIsNotActive,
} = require("../services/user.service");

const addUserController = async (req, res) => {
  try {
    const isSignup = await findUserByNationalNumber(req.body.nationalNumber);
    if (isSignup) {
      res.status(400).json({ message: "تو قبلا ثبت نام کردی" });
      return;
    }
    console.log('isSignup', isSignup)
    if (!isSignup) {
      const addUserService = await addUser(req.body);

      res.status(200).json({ message: "عملیات ثبت نام موفقیت امیز بوده" });
    } else {
      res.status(400).json({ message: "خطا در ثبت نام" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getAllUserActive= async (req,res)=>{
    const activeUser= await findUserByIsActive();
    res.status(200).json({message:activeUser})

}


const getAllUserNotActive= async (req,res)=>{
  try {
    const resutlUser= await findUserByIsNotActive();
    res.status(200).json({message:resutlUser})
  } catch (error) {
    
  }
}


module.exports = {
    addUserController,
    getAllUserActive,
    getAllUserNotActive
};
