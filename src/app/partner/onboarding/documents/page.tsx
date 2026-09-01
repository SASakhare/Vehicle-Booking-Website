"use client"

import axios from 'axios'
import { ArrowLeft, FileCheck, Loader2, UploadCloud } from 'lucide-react'
import { motion } from 'motion/react'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { toast } from 'sonner'

type docsType = "aadhar" | "license" | "rc"

const Page = () => {
    const router = useRouter();
    const [loading, setLoading] = useState<boolean>(false);

    const [docs, setDocs] = useState<Record<docsType, File | null>>({
        aadhar: null,
        license: null,
        rc: null
    });

    const handleImage = (doc: docsType, file: File | null) => {

        if (!file) {
            return
        }

        setDocs((prev: Record<docsType, File | null>) => ({ ...prev, [doc]: file }))
    }


    const handleDocs = async () => {

        try {
            setLoading(true)
            const formData = new FormData()

            if (!docs.aadhar || !docs.license || !docs.rc) {
                toast.error("upload all documents")
                setLoading(false)
                return null
            }

            formData.append("aadhar", docs?.aadhar)
            formData.append("license", docs?.license)
            formData.append("rc", docs?.rc)

            const { data } = await axios.post("/api/partner/onboarding/documents", formData);
            console.log(data);
            toast.success("vehicle data successfully uploaded")
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
                        Step 2 of 3
                    </p>
                    <h1
                        className='text-3xl font-bold mt-1'
                    >
                        Upload Documents
                    </h1>

                    <p className='text-sm text-gray-500 mt-2'>
                        Required for verification
                    </p>

                </div>

                <div
                    className='mt-8 space-y-5'
                >
                    <motion.label
                        whileHover={{ scale: 1.02 }}
                        className='flex items-center justify-between p-4 rounded-2xl border border-gray-200
                    cursor-pointer hover:border-black transition
                    '
                    >
                        <div
                        >
                            <p className='text-sm font-semibold'>
                                Aadhaar/ ID Proof
                            </p>
                            <p className='text-sm text-gray-500'>
                                Government issued ID
                            </p>
                        </div>
                        <div>
                            <span
                                className='text-s text-gray-400 mb-1 inline-block'
                            >
                                Upload
                            </span>
                            <div >
                                {
                                    docs?.aadhar?.name ? `${docs.aadhar.name}` :

                                        <div className='w-10 h-10 rounded-full bg-black text-white flex items-center justify-center'>
                                            <UploadCloud size={18} />
                                        </div>
                                }
                            </div>
                        </div>
                        <input type='file' accept='image/*,.pdf' hidden onChange={(e) => handleImage("aadhar", (e.target?.files?.[0] || null))} />

                    </motion.label>

                    <motion.label
                        whileHover={{ scale: 1.02 }}
                        className='flex items-center justify-between p-4 rounded-2xl border border-gray-200
                    cursor-pointer hover:border-black transition
                    '
                    >
                        <div
                        >
                            <p className='text-sm font-semibold'>
                                Driving License
                            </p>
                            <p className='text-sm text-gray-500'>
                                Valid driving License
                            </p>
                        </div>
                        <div>
                            <span
                                className='text-s text-gray-400 mb-1 inline-block'
                            >
                                Upload
                            </span>
                            <div >
                                {
                                    docs?.license?.name ? `${docs.license.name}` :
                                        <div className='w-10 h-10 rounded-full bg-black text-white flex items-center justify-center'>
                                            <UploadCloud size={18} />
                                        </div>
                                }
                            </div>
                        </div>
                        <input type='file' accept='image/*,.pdf' hidden onChange={(e) => handleImage("license", (e.target?.files?.[0] || null))} />

                    </motion.label>


                    <motion.label
                        whileHover={{ scale: 1.02 }}
                        className='flex items-center justify-between p-4 rounded-2xl border border-gray-200
                    cursor-pointer hover:border-black transition
                    '
                    >
                        <div
                        >
                            <p className='text-sm font-semibold'>
                                Vehicle RC
                            </p>
                            <p className='text-sm text-gray-500'>
                                Registration Certificate
                            </p>
                        </div>
                        <div>
                            <span
                                className='text-s text-gray-400 mb-1 inline-block'
                            >
                                Upload
                            </span>
                            <div >
                                {
                                    docs?.rc?.name ? `${docs.rc.name}` :
                                        <div className='w-10 h-10 rounded-full bg-black text-white flex items-center justify-center'>
                                            <UploadCloud size={18} />
                                        </div>
                                }
                            </div>
                        </div>
                        <input type='file' accept='image/*,.pdf' hidden onChange={(e) => handleImage("rc", (e.target?.files?.[0] || null))} />

                    </motion.label>


                </div>

                <div
                    className='mt-6 flex items-start gap-3 text-xs text-gray-500'
                >
                    <FileCheck />
                    <p>
                        Document are securely stored and manually verified by our team
                    </p>

                </div>

                {
                    !loading ? (
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.97 }}
                            onClick={async () => {
                                await handleDocs();
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


        </div>
    )
}
export default Page