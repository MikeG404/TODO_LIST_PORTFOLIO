'use server'

import connectDB from "@/lib/db";
import User from "@/models/User.model";
import bcrypt from "bcrypt";

export async function registerUser({username, email, password}: {username: string, email: string, password: string}) {
    await connectDB();

    const existingUser = await User.findOne({ email });
    if (existingUser) {
        throw new Error("Email is already registered");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    return newUser;
}

export async function loginUser({email, password}: {email: string, password: string}) {
    await connectDB();

    const user = await User.findOne({ email });
    if (!user) {
        throw new Error("Invalid email or password");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        throw new Error("Invalid email or password");
    }

    return user;
}