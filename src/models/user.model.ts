import mongoose from "mongoose";



interface IUser extends Document {

    name: string;
    email: string;
    password: string;
    createdAt: Date;
    role: "user" | "partner" | "admin"
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












