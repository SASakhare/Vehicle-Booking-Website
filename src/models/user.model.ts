import mongoose from "mongoose";



export interface IUser extends Document {

    name: string;
    email: string;
    password: string;
    createdAt: Date;
    role: "user" | "partner" | "admin";
    isEmailVerified?: boolean;
    partnerOnBoardingSteps?: number
    otp?: string;
    otpExpiresAt?: Date;
    updatedAt: Date;
}


const userSchema = new mongoose.Schema<IUser>({

    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },

    password: {
        type: String,
        required: true,
    },
    isEmailVerified: {
        type: Boolean,
        default: false
    },
    partnerOnBoardingSteps: {
        type: Number,
        min: 0,
        max: 8
    }
    ,
    otp: {
        type: String,
    },
    otpExpiresAt: {
        type: Date,
    },

    role: {
        type: String,
        required: true,
        enum: ['user', 'partner', 'admin'],
        default: "user"
    }
}, {
    timestamps: true
})



const User = mongoose.models.User || mongoose.model("User", userSchema)

export default User;












