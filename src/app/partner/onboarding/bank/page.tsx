"use client"

import axios from 'axios'
import { ArrowLeft, BadgeCheck, CheckCircle, CreditCardIcon, Landmark, Loader2, Phone } from 'lucide-react'
import { motion } from 'motion/react'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { MdBookOnline } from "react-icons/md";
import { toast } from 'sonner'
const Page = () => {

    //* accountHolder, accountNumber, upi, ifsc, mobileNumber 
    const router = useRouter();
    const [loading, setLoading] = useState<boolean>(false);
    const [accountHolder, setAccountHolder] = useState<string>("");
    const [accountNumber, setAccountNumber] = useState<string>("");
    const [upi, setUpi] = useState<string>("");
    const [ifsc, setIfsc] = useState<string>("");
    const [mobileNumber, setMobileNumber] = useState<string>("");

    const handleBankDocs = async () => {
        try {
            setLoading(true)

            const { data } = await axios.post("/api/partner/onboarding/bank", {
                accountHolder, accountNumber, upi, ifsc, mobileNumber
            });
            console.log(data);
            toast.success("Bank documents uploaded successfully")
            setLoading(false)
            router.push('/partner/onboarding/bank')

        } catch (error: any) {
            setLoading(false)
            console.log(error.response.data);
            toast.error(error?.response?.data?.message ?? "server error")
        }
    }

    return (
        <div
            className='min-h-screen bg-white flex items-center justify-center px-4'
        >
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className='w-full max-w-xl bg-white rounded-3xl border border-gray-200 
                shadow-[0_25px_70px_rgba(0,0,0,0.15)] p-6 sm:p-8'
            >


                <div
                    className='relative text-center'
                >
                    <button
                        className='absolute left-0 top-0 w-9 h-9 rounded-full border border-gray-300 
                    flex items-center justify-center hover:bg-gray-100 transition
                    '
                        onClick={() => router.back()}
                    >
                        <ArrowLeft size={18} />
                    </button>

                    <p className='text-xs text-gray-500 font-medium'>
                        Step 3 of 3
                    </p>
                    <h1
                        className='text-3xl font-bold mt-1'
                    >
                        Bank & Payout Setup
                    </h1>

                    <p className='text-sm text-gray-500 mt-2'>
                        Used for partner Payout
                    </p>

                </div>

                <div
                    className='mt-8 space-y-6'
                >
                    <div>
                        <label
                            htmlFor='ahn'
                            className='text-xs font-semibold text-gray-500'
                        >
                            Account Holder name
                        </label>
                        <div
                            className='flex items-center gap-2 mt-2'
                        >
                            <div
                                className='text-gray-400'
                            >
                                <BadgeCheck />
                            </div>
                            <input
                                value={accountHolder}
                                onChange={(e) => setAccountHolder(e.target.value)}
                                id='ahn'
                                type='text'
                                placeholder='As per Bank records'
                                className='flex-1 border-b pb-2 text-sm focus:outline-none'
                            />
                        </div>
                    </div>
                    <div>
                        <label
                            htmlFor='ahn'
                            className='text-xs font-semibold text-gray-500'
                        >
                            Bank Account Number
                        </label>
                        <div
                            className='flex items-center gap-2 mt-2'
                        >
                            <div
                                className='text-gray-400'
                            >
                                <CreditCardIcon />
                            </div>
                            <input
                                value={accountNumber}
                                onChange={(e) => setAccountNumber(e.target.value)}
                                id='ahn'
                                type='text'
                                placeholder='enter account number'
                                className='flex-1 border-b pb-2 text-sm focus:outline-none'
                            />
                        </div>
                    </div>
                    <div>
                        <label
                            htmlFor='ahn'
                            className='text-xs font-semibold text-gray-500'
                        >
                            IFSC Code
                        </label>
                        <div
                            className='flex items-center gap-2 mt-2'
                        >
                            <div
                                className='text-gray-400'
                            >
                                <Landmark />
                            </div>
                            <input
                                value={ifsc}
                                onChange={(e) => setIfsc(e.target.value)}
                                id='ahn'
                                type='text'
                                placeholder='HDFC000'
                                className='flex-1 border-b pb-2 text-sm focus:outline-none'
                            />
                        </div>
                    </div>
                    <div>
                        <label
                            htmlFor='ahn'
                            className='text-xs font-semibold text-gray-500'
                        >
                            Mobile Number
                        </label>
                        <div
                            className='flex items-center gap-2 mt-2'
                        >
                            <div
                                className='text-gray-400'
                            >
                                <Phone />
                            </div>
                            <input
                                value={mobileNumber}
                                onChange={(e) => setMobileNumber(e.target.value)}
                                id='ahn'
                                type='text'
                                placeholder='10 digit mobile number'
                                className='flex-1 border-b pb-2 text-sm focus:outline-none'
                            />
                        </div>
                    </div>
                    <div>
                        <label
                            htmlFor='ahn'
                            className='text-xs font-semibold text-gray-500'
                        >
                            UPI ID (optional)
                        </label>
                        <div
                            className='flex items-center gap-2 mt-2'
                        >
                            <div
                                className='text-gray-400'
                            >
                                <MdBookOnline size={28} />
                            </div>
                            <input
                                value={upi}
                                onChange={(e) => setUpi(e.target.value)}
                                id='ahn'
                                type='text'
                                placeholder='username@ybl'
                                className='flex-1 border-b pb-2 text-sm focus:outline-none'
                            />
                        </div>
                    </div>

                </div>

                <div
                    className='mt-6 flex items-start gap-3 text-xs text-gray-500'
                >
                    <CheckCircle />
                    <p>
                        Bank details are verified before first payout.
                        This usually takes 24-48 hours.
                    </p>

                </div>
                {
                    !loading ? (
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.97 }}
                            onClick={async () => {
                                await handleBankDocs();
                            }}

                            className='mt-8 w-full h-14 rounded-2xl bg-black text-white font-semibold 
                    flex items-center justify-center gap-2 disabled:opacity-40 transition'
                        >
                            Continue
                        </motion.button>
                    ) : (
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.97 }}

                            disabled
                            className='mt-8 w-full h-14 rounded-2xl bg-black text-white font-semibold 
                    flex items-center justify-center gap-2 disabled:opacity-40 transition'
                        >
                            <Loader2 className='h-8 w-8 text-white animate-spin' size={8} />
                        </motion.button>
                    )
                }



            </motion.div>
        </div >
    )
}

export default Page