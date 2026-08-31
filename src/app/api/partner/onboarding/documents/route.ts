import { auth } from "@/auth";
import uploadOnClodinary from "@/lib/cloudinary";
import connectDB from "@/lib/db";
import PartnerDocs from "@/models/partnerDocs.model";
import User from "@/models/user.model";
import Vehicle from "@/models/vehicle.model";

const VEHICLE_REGEX = /^[A-Z]{2}[0-9]{1,2}[A-Z]{0,2}[0-9]{4}$/;

export async function POST(req: Request) {

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

        const formData = await req.formData();

        const aadhar = formData.get("aadhar") as Blob | null

        const license = formData.get("license") as Blob | null

        const rc = formData.get("rc") as Blob | null

        if (!aadhar || !license || !rc) {
            return Response.json({
                message: "all documents are required"
            }, {
                status: 400
            })
        }

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const updatePayload: any = {
            status: "pending"
        }


        if (aadhar) {
            const url = await uploadOnClodinary(aadhar)

            if (!url) {
                return Response.json({
                    message: "aadhar upload failed"
                }, {
                    status: 500
                })
            }

            updatePayload.aadharUrl = url
        }
        if (license) {
            const url = await uploadOnClodinary(license)

            if (!url) {
                return Response.json({
                    message: "license upload failed"
                }, {
                    status: 500
                })
            }

            updatePayload.licenseUrl = url
        }

        if (rc) {
            const url = await uploadOnClodinary(rc)

            if (!url) {
                return Response.json({
                    message: "rc upload failed"
                }, {
                    status: 500
                })
            }

            updatePayload.rcUrl = url
        }


        let partnerDocs = await PartnerDocs.findOne({
            owner: user._id,
        })

        if (partnerDocs) {
            partnerDocs.aadharUrl = updatePayload.aadharUrl
            partnerDocs.licenseUrl = updatePayload.licenseUrl
            partnerDocs.rcUrl = updatePayload.rcUrl
            partnerDocs.status = updatePayload.status

            await partnerDocs.save()

            return Response.json({ partnerDocs }, { status: 200 })
        }


        partnerDocs = await partnerDocs.create({
            owner: user._id,
            ...updatePayload
        })

        if (user.partnerOnBoardingSteps < 2) {
            user.partnerOnBoardingSteps = 2
            await user.save()
        }

        return Response.json({
            partnerDocs
        }, {
            status: 201
        })


    } catch (error) {
        console.log("Error-Partner Docs:");
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

        const partnerDocs = await PartnerDocs.findOne({
            owner: user._id,
        })


        if (!partnerDocs) {

            return Response.json({
                message: "document not found"
            }, {
                status: 404
            })
        }

        return Response.json({
            partnerDocs
        }, {
            status: 200
        })

    } catch (error) {
        console.log("Error-Partner Docs:");
        console.log(error);


        return Response.json({
            message: "Server Error"
        }, {
            status: 500
        })
    }

}




















