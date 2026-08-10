import connectDB from "@/lib/db";
import { sendMail } from "@/lib/sendMail";
import User from "@/models/user.model";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import { use } from "react";


export async function POST(req: NextRequest) {

    try {

        const { name, email, password } = await req.json();

        // console.log(`${name}`);

        await connectDB();

        console.log("Database connected");


        let user = await User.findOne({ email });

        if (user && user.isEmailVerified) {
            return NextResponse.json(
                { message: "Email already exist" },
                { status: 400 }
            )
        }


        if (password.length < 6) {
            return NextResponse.json(
                { message: "password must be at least 6 character" },
                { status: 400 }
            )
        }

        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const otpExpiresAt = new Date(Date.now() + 10 * 60 * 1000);

        if (user && !user.isEmailVerified) {

            user.otp = otp;
            user.otpExpiresAt = otpExpiresAt;

            await user.save();

        } else {


            const hashedPassword = await bcrypt.hash(password, 10)

            console.log("password hashed");

            user = await User.create({
                name,
                email,
                password: hashedPassword,
                otp,
                otpExpiresAt,
            })

            console.log("user created");

        }


        const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Your OTP</title>
</head>

<body style="
  margin: 0;
  padding: 0;
  background-color: #f4f4f5;
  font-family: Arial, Helvetica, sans-serif;
">

  <table
    width="100%"
    cellpadding="0"
    cellspacing="0"
    border="0"
    style="background-color: #f4f4f5; padding: 40px 20px;"
  >
    <tr>
      <td align="center">

        <table
          width="100%"
          cellpadding="0"
          cellspacing="0"
          border="0"
          style="
            max-width: 500px;
            background-color: #ffffff;
            border-radius: 12px;
            overflow: hidden;
          "
        >

          <!-- Header -->
          <tr>
            <td style="
              padding: 28px 30px;
              background-color: #18181b;
              text-align: center;
            ">
              <h1 style="
                margin: 0;
                color: #ffffff;
                font-size: 24px;
              ">
                RYDEX
              </h1>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding: 35px 30px;">

              <h2 style="
                margin: 0 0 15px;
                color: #18181b;
                font-size: 22px;
              ">
                Verify your email
              </h2>

              <p style="
                margin: 0 0 25px;
                color: #52525b;
                font-size: 15px;
                line-height: 1.6;
              ">
                Use the OTP below to verify your email address.
                This OTP is valid for <strong>10 minutes</strong>.
              </p>

              <!-- OTP -->
              <div style="
                text-align: center;
                margin: 30px 0;
              ">
                <div style="
                  display: inline-block;
                  padding: 16px 30px;
                  background-color: #f4f4f5;
                  border: 1px solid #e4e4e7;
                  border-radius: 8px;
                  color: #18181b;
                  font-size: 32px;
                  font-weight: bold;
                  letter-spacing: 8px;
                ">
                  ${otp}
                </div>
              </div>

              <p style="
                margin: 0;
                color: #71717a;
                font-size: 13px;
                line-height: 1.5;
              ">
                If you did not request this OTP, you can safely ignore
                this email. Never share your OTP with anyone.
              </p>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="
              padding: 20px 30px;
              background-color: #fafafa;
              border-top: 1px solid #e4e4e7;
              text-align: center;
            ">
              <p style="
                margin: 0;
                color: #a1a1aa;
                font-size: 12px;
              ">
                © 2026 RYDEX. All rights reserved.
              </p>
            </td>
          </tr>

        </table>

      </td>
    </tr>
  </table>

</body>
</html>`
        try {
            await sendMail(
                email,
                "Your OTP for Email Verification",
                html
            );
        } catch (error) {
            console.log('Email Error - Register');
            console.log(error);
            
            
            return NextResponse.json(
                { message: "Invalid Email ,Enter Correct Email." },
                { status: 400 }
            )
        }

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






























