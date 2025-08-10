const mongoose = require("mongoose");

const MONGODB_URI = process.env.MONGODB_URI;

const connectDB = async () => {
    try {
        if (!MONGODB_URI) {
            throw new Error("MONGODB_URI is not defined in environment variables");
        }

        const connection = await mongoose.connect(`${MONGODB_URI}/stylewise`);

        console.log(`✅ MongoDB Connected: ${connection.connection.host}`);
    } catch (error) {
        console.error("❌ Database connection failed:", error.message);
        process.exit(1); // Stop app if DB connection fails
    }
};

module.exports = connectDB;
