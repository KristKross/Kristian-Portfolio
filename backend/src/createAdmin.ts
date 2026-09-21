import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import readline from "readline";

import { connectDB } from "./db";
import Admin from "../models/Admin";

dotenv.config();

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

const askQuestion = (question: string): Promise<string> => {
    return new Promise((resolve) => {
        rl.question(question, resolve);
    });
};

const createAdmin = async () => {
    try {
        const username = await askQuestion("Username: ");
        const password = await askQuestion("Password: ");

        if (!username || !password) {
            console.error("Username and password are required.");
            rl.close();
            process.exit(1);
        }

        await connectDB();

        const existingAdmin = await Admin.findOne({ username });

        if (existingAdmin) {
            console.error("An admin with this username already exists.");
            rl.close();
            process.exit(1);
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        await Admin.create({
            username,
            password: hashedPassword,
        });

        console.log(`Admin "${username}" created successfully.`);

        rl.close();
        process.exit(0);
    } catch (error) {
        console.error("Failed to create admin:", error);

        rl.close();
        process.exit(1);
    }
};

createAdmin();