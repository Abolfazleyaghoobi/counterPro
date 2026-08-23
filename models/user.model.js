const mongoose=require("mongoose");
const dotenv=require("dotenv")
dotenv.config()
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    nationalNumber:{
        type:Number,
        required: true
    },
    isActive:{
        type:Boolean,
        default:false
    },
    date: {
        type: Date,
        default: Date.now
    }
})
module.exports = mongoose.model("User", UserSchema);