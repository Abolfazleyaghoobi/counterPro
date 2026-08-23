const { addUser } = require("../services/user.service");

const addUserController= async (req,res)=>{
    try{
        
        const addUserService = await addUser(req.body);
        if(addUserService){
            res.status(200).json({message:"user added successfully"})
        }else{
            res.status(400).json({message:"user not added"})

        }



    }catch(err){
        res.status(500).json({message:err.message})
    }
}



module.exports = addUserController ;