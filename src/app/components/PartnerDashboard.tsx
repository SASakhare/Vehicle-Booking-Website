"use client"

import { RootState } from "@/redux/store";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

type Step = {

    id: number,
    title: string,
    route?: string
}

const STEPS: Step[] = [
    { id: 1, title: "Vehicle", route: "/partner/onboarding/vehicle" },
    { id: 2, title: "Documents", route: "/partner/onboarding/documents" },
    { id: 3, title: "Bank", route: "/partner/onboarding/bank" },
    { id: 4, title: "Review" },
    { id: 5, title: "Video KYC" },
    { id: 6, title: "Pricing" },
    { id: 7, title: "Final Review" },
    { id: 8, title: "Live" },
];

const TOTAL_STEPS = STEPS.length

const PartnerDashboard = () => {
    const [activateStep, setActivateStep] = useState<number>(0);

    const userData = useSelector((state: RootState) => state.user.userData)
    console.log(userData);

    useEffect(() => {
        if (userData) {
            setActivateStep(userData.partnerOnBoardingSteps as number)
        }
    }, [userData])

    const progressPercentage = ((activateStep) / (TOTAL_STEPS)) * 100;

    return (
        <div
            className='min-h-screen bg-linear-to-br from-gray-100 to-gray-200 px-4 pt-28 pb-20'
        >
            <div
                className='max-w-7xl mx-auto space-y-16'
            >
                <div>
                    <h1 className='text-4xl font-bold' >Partner Onboarding</h1>
                    <p className='text-gray-600 mt-3'>Complete all Step to activate your account</p>
                </div>

                <div
                    className="bg-white rounded-3xl p-10 shadow-xl border overflow-x-auto"
                >
                    <div
                        className="relative min-w-200"
                    >
                        <div
                            className="absolute top-7 left-0 w-full h-0.75 bg-gray-200 rounded-full"
                        />
                        <motion.div
                            animate={{ width: `${progressPercentage}%` }}
                            transition={{ duration: 0.6 }}
                            className="absolute top-7 left-0 h-0.75 bg-black rounded-full"
                        />

                    </div>

                </div>

            </div>

        </div>
    )
}

export default PartnerDashboard