// src/database/index.js
import mongoose from "mongoose";
let isConnected = false;
export const connectToDB = async () => {
    if(isConnected) {
        console.log("Database Is Already Connected!");
        return;
    }
    try {
        const dbURI = process.env.MONGODB_URL;
        await mongoose.connect(dbURI);
        isConnected = true;
        console.log("Database Is Connected!");
    } catch (error) {
        console.error('Database connection failed:', error);
        throw new Error('Failed to connect to the database');
    }
}