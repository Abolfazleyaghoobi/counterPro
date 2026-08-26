const mongoos = require("mongoose");

const connectDB = async () => {
    try {
        await mongoos.connect(MONGODB_URI="mongodb+srv://Vercel-Admin-aliooo:Kh8Pxrw6wJvos2kH@aliooo.kwxeidk.mongodb.net/?retryWrites=true&w=majority");
        
        console.log("MongoDB connected successfully");
    } catch (error) {
        console.error("MongoDB connection failed:", error.message);
        process.exit(1);
    }
};


module.exports = connectDB;
