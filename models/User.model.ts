import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
    username: string;
    email: string;
    password: string;
}

const UserSchema: Schema = new Schema({
        username: {
            type: String,
            required: [true, "Username is required"],
            trim: true,
            maxLength: [30, "Username must be 30 characters or less"]
        },
        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true,
            trim: true,
            lowercase: true
        },
        password: {
            type: String,
            required: [true, "Password is required"],
            minLength: [9, "Password must be at least 9 characters"]
        },
    },
    {
        timestamps: true,
    }
)

const User = mongoose.models.User || mongoose.model<IUser>("User", UserSchema);

export default User;