const userModel = require("../models/user.model");

const addUser = async (user) => {
  const { name, nationalNumber } = user;
  try {
    const user = await userModel.create({
      name,
      nationalNumber,
    });

    return user;
  } catch (error) {
    console.log("Error:", error.message);
  }
};

const findUserByNationalNumber = async (nationalNumber) => {

  try {
    const user = await userModel.findOne({
      nationalNumber: nationalNumber,
    });

    return user;
  } catch (error) {
    console.error("Error finding user:", error);
    throw error;
  }
};
const findUserByIsNotActive = async () => {
  try {
    const user = await userModel.find({
   
      isActive: false,
    });

    return user;
  } catch (error) {
    console.error("Error finding active user:", error);
    throw error;
  }
};

const findUserByIsActive = async () => {
  try {
    const user = await userModel.countDocuments({
   
      isActive: true,
    });

    return user;
  } catch (error) {
    console.error("Error finding active user:", error);
    throw error;
  }
};



const activeUser = async (nationalNumber) => {
  try {
    const user = await userModel.findOneAndUpdate(
      {
        nationalNumber: nationalNumber,
        isActive: false,
      },
      {
        $set: {
          isActive: true,
        },
      },
      {
        new: true,
      }
    );

    return user;
  } catch (error) {
    console.error("Error activating user:", error);
    throw error;
  }
};


module.exports = {
  addUser,
  findUserByNationalNumber,
  findUserByIsActive,
  findUserByIsNotActive,
  activeUser
};
