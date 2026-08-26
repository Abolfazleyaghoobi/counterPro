const mongoos = require("mongoose");

const connectDB = async () => {
    try {
        await mongoos.connect("mongodb+srv://Vercel-Admin-atlas-cordovan-drum:INHiDZMl6zgJKiz0@atlas-cordovan-drum.s0z6rwl.mongodb.net/?retryWrites=true&w=majority");
        
        console.log("MongoDB connected successfully");
    } catch (error) {
        console.error("MongoDB connection failed:", error.message);
        process.exit(1);
    }
};


module.exports = connectDB;
