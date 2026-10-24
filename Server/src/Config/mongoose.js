import mongoose from "mongoose";
import { config } from "./environments.js";

export const connectDB = async () => {
    try {
        const connect = await mongoose.connect(config.mongoUri, {
            serverSelectionTimeoutMS: 10000, // 10 second timeout for initial server selection
        });
        console.log(`MongoDB Connected: ${connect.connection.host}`);
    }
    catch (error) {
        console.error(`Error connecting to MongoDB: ${error.message}`);
        if (error.message.includes('bad auth') || error.message.includes('Authentication failed')) {
            console.error('MongoDB Auth Error: Check your username and password in MONGO_URI.');
        } else if (error.message.includes('whitelist') || error.message.includes('selection timed out')) {
            console.error('MongoDB Network Error: Ensure Atlas Network Access allows 0.0.0.0/0 (required for Render dynamic IPs).');
        }
        process.exit(1);
    }
};

mongoose.connection.on('error', (err) => {
    console.error('MongoDB runtime error:', err.message);
});

mongoose.connection.on('disconnected', () => {
    console.warn('MongoDB connection lost. Reconnecting...');
});