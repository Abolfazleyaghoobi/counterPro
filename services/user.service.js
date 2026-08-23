const userModel = require("../models/user.model");

const addUser=async (user)=>{
    
    const {name,nationalNumber}=user;
    try {
            const user = await userModel.create({
      name,
      nationalNumber,
    });

    return user;
    } catch (error) {
            console.log("Error:", error.message);
    }
    
} 


module.exports={
    addUser
}