// const mongoos = require("mongoose");

// const connectDB = async () => {
//     try {
//         await mongoos.connect("mongodb+srv://Vercel-Admin-atlas-cordovan-drum:INHiDZMl6zgJKiz0@atlas-cordovan-drum.s0z6rwl.mongodb.net/?retryWrites=true&w=majority");
        
//         console.log("MongoDB connected successfully");
//     } catch (error) {
//         console.error("MongoDB connection failed:", error.message);
//         process.exit(1);
//     }
// };


// module.exports = connectDB;






const mysql = require('mysql2/promise');
const dotenv=require('dotenv')

dotenv.config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  charset: 'utf8mb4',
});

const connectDatabase = async () => {
  try {
    const connection = await pool.getConnection();
    console.log('Database connected successfully');
    connection.release();
  } catch (error) {
    console.log(`Database connection failed: ${error.message}`);
    process.exit(1);
  }
};

module.exports = {
  pool,
  connectDatabase,
};
