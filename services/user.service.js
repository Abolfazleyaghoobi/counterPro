const userModel = require("../models/user.model");
const { findUserByNationalNumber,addUser, findUserByIsNotActive, findUserByIsActive, activeUser, rejectUser,getAllUser, addLikeToUser } = require("../repository/user.repository");


const createUser = async (user) => {
  try {
    const newUser = await addUser(user);

    return newUser;
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
};

const getUserByNationalNumber = async (nationalNumber) => {
  try {
    const user = await findUserByNationalNumber(nationalNumber);

    return user;
  } catch (error) {
    console.error("Error finding user:", error);
    throw error;
  }
};


const getInactiveUsers = async () => {
  try {
    const users = await findUserByIsNotActive();

    return users;
  } catch (error) {
    console.error("Error finding inactive users:", error);
    throw error;
  }
};

const getActiveUsersCount = async () => {
  try {
    const count = await findUserByIsActive();

    return count;
  } catch (error) {
    console.error("Error counting active users:", error);
    throw error;
  }
};



const activateUser = async (nationalNumber) => {
  try {
    const user = await activeUser(nationalNumber);

    return user;
  } catch (error) {
    console.error("Error activating user:", error);
    throw error;
  }
};


const rejectUserService = async (nationalNumber) => {
  try {
    const user = await rejectUser(nationalNumber);

    return user;
  } catch (error) {
    console.error("Error rejecting user:", error);
    throw error;
  }
};

const getAllActiveUsers = async () => {
  try {
    const users = await getAllUser();

    return users;
  } catch (error) {
    console.error("Error finding active users:", error);
    throw error;
  }
};




const addLike = async (userId) => {
  try {
    const user = await addLikeToUser(userId);

    return user;
  } catch (error) {
    console.error("Error adding like to user:", error);
    throw error;
  }
};


module.exports = {
  createUser,
  getUserByNationalNumber,
  getInactiveUsers,
  getActiveUsersCount,
  activateUser,
  rejectUserService,
    addLike,
  getAllActiveUsers
  
};



































// const addUser = async (user) => {
//   const { name, nationalNumber } = user;
//   try {
//     const user = await userModel.create({
//       name,
//       nationalNumber,
//     });

//     return user;
//   } catch (error) {
//     console.log("Error:", error.message);
//   }
// };

// const findUserByNationalNumber = async (nationalNumber) => {

//   try {
//     const user = await userModel.findOne({
//       nationalNumber: nationalNumber,
//     });

//     return user;
//   } catch (error) {
//     console.error("Error finding user:", error);
//     throw error;
//   }
// };
// const findUserByIsNotActive = async () => {
//   try {
//     const user = await userModel.find({
   
//       isActive: false,
//     });

//     return user;
//   } catch (error) {
//     console.error("Error finding active user:", error);
//     throw error;
//   }
// };

// const findUserByIsActive = async () => {
//   try {
//     const user = await userModel.countDocuments({
   
//       isActive: true,
//     });

//     return user;
//   } catch (error) {
//     console.error("Error finding active user:", error);
//     throw error;
//   }
// };



// const activeUser = async (nationalNumber) => {
//   try {
//     const user = await userModel.findOneAndUpdate(
//       {
//         nationalNumber: nationalNumber,
//         isActive: false,
//       },
//       {
//         $set: {
//           isActive: true,
//         },
//       },
//       {
//         new: true,
//       }
//     );

//     return user;
//   } catch (error) {
//     console.error("Error activating user:", error);
//     throw error;
//   }
// };

// const rejectUser = async (nationalNumber) => {
//   try {
//     const user = await userModel.findOneAndDelete({
//       nationalNumber,
//       isActive: false,
//     });

//     return user;
//   } catch (error) {
//     console.error("Error rejecting user:", error);
//     throw error;
//   }
// };
// const getAllUser = async () => {
//   try {
//     const user = await userModel.find({
   
//       isActive: true,
//     });

//     return user;
//   } catch (error) {
//     console.error("Error finding active user:", error);
//     throw error;
//   }
// };
// module.exports = {
//   // addUser,
//   // findUserByNationalNumber,
//   // findUserByIsActive,
//   // findUserByIsNotActive,
//   // activeUser,
//   // getAllUser,
//   // rejectUser
// };
