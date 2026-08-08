import connectDB from "@/lib/db";
import User from "@/models/user.model";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req: NextRequest) {

    try {

        const { name, email, password } = await req.json();

        // console.log(`${name}`);
        
        await connectDB();

        console.log("Database connected");
        

        let user = await User.findOne({ email });

        if (user) {
            return NextResponse.json(
                { message: "Email already exist" },
                { status: 400 }
            )
        }


        const hashedPassword = await bcrypt.hash(password, 10)

        console.log("password hashed");
        
        user = await User.create({
            name,
            email,
            password: hashedPassword,
        })
        
        console.log("user created");

        return NextResponse.json(
            { user },
            { status: 201 }
        )

    } catch (error) {

        return NextResponse.json(
            { message: `register error ${error}` },
            { status: 400 }
        )
    }

}






























