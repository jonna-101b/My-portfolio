import validator from "validator";
import { hashPassword } from "../Utils/auth.js";
import mongoose from "mongoose";
import { config } from "../config/environments.js";
import AdminModel from "../Models/admin.js";


const admins = [
    {
        email: config.myGmail,
        password: config.myPortfolioPassword,
    }
];

async function seedAdmins() {
    console.log("Starting admin seeder...\n");

    for (const admin of admins) {
        const exists = await AdminModel.findOne({ email: admin.email });

        if (exists) {
            console.log(`Admin admin ${admin.email} is already signed up!`);
            continue;
        }

        if (!validator.isStrongPassword(admin.password)) {
            console.log("Password not strong enough!");
            continue;
        }

        const hashed = await hashPassword(admin.password, 10);

        await AdminModel.create({ ...admin, password: hashed });

        console.log(`Created admin (${admin.email})`);
    }

    console.log("\nSeeding complete.");
};

async function main() {
    try {
        await mongoose.connect(config.mongoUri);
        console.log("MongoDB connected\n");
        await seedAdmins();
    } catch (error) {
        console.error("Error during seeding:", error instanceof Error ? error.message : error);
        process.exitCode = 1;
    } finally {
        if (mongoose.connection.readyState !== 0) {
            await mongoose.disconnect();
            console.log("\nMongoDB disconnected");
        }
    }
}

void main();