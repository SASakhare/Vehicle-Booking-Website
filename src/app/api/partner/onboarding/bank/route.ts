import { auth } from "@/auth";
import connectDB from "@/lib/db";
import PartnerBank from "@/models/partnerBank.model";
import User from "@/models/user.model";

export async function POST(req: Request) {

    try {


        await connectDB();

        const session = await auth();

        if (!session || !session.user?.email) {
            return Response.json({
                message: "unauthorized"
            }, {
                status: 400
            })
        }

        const user = await User.findOne({
            email: session.user.email,
        })

        if (!user) {
            return Response.json({
                message: "unauthorized"
            }, {
                status: 400
            })
        }

        const { accountHolder, accountNumber, upi, ifsc, mobileNumber } = await req.json()


        if (!accountHolder || !accountNumber || !ifsc || mobileNumber) {
            return Response.json({
                message: "send all bank details & mobile number"
            }, {
                status: 400
            })
        }


        const partnerBank = PartnerBank.findOneAndUpdate(
            { owner: user._id, },
            {
                accountHolder,
                accountNumber,
                ifsc,
                upi,
                status: "added"
            },
            {
                upsert: true,
                new: true
            }
        )

        user.mobileNumber = mobileNumber

        if (user.partnerOnBoardingSteps < 3) {
            user.partnerOnBoardingSteps = 3
        }

        await user.save()

        return Response.json(partnerBank, { status: 200 })

    } catch (error) {
        console.log("Error-Partner Bank :");
        console.log(error);


        return Response.json({
            message: "Server Error"
        }, {
            status: 500
        })
    }
}


export async function GET(req: Request) {

    try {

        // * connect to DB 

        await connectDB();

        const session = await auth();

        if (!session || !session.user?.email) {
            return Response.json({
                message: "unauthorized"
            }, {
                status: 400
            })
        }

        const user = await User.findOne({
            email: session.user.email,
        })

        if (!user) {
            return Response.json({
                message: "unauthorized"
            }, {
                status: 400
            })
        }

        const partnerBank = await PartnerBank.findOne({
            owner: user._id,
        })


        if (!partnerBank) {

            return Response.json({
                message: "bank document not found"
            }, {
                status: 404
            })
        }

        return Response.json({
            partnerBank
        }, {
            status: 200
        })

    } catch (error) {
        console.log("Error-Partner Bank:");
        console.log(error);


        return Response.json({
            message: "Server Error"
        }, {
            status: 500
        })
    }

}















































