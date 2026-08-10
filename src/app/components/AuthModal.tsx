"use client"

import axios from 'axios'
import { Loader2, Lock, Mail, User, X } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { em, span } from 'motion/react-client'
import { signIn, useSession } from 'next-auth/react'
import Image from 'next/image'
import React, { useState } from 'react'

type propType = {
    open: boolean,
    onClose: () => void
}

type stepType = "login" | "signup" | "otp";

const AuthModal = ({ open, onClose }: propType) => {

    const [step, setSetp] = useState<stepType>("login");

    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState(null);

    const { data } = useSession();
    console.log(data);


    const handleSignUp = async () => {

        try {

            setLoading(true)
            const { data } = await axios.post('/api/auth/register', { email, name, password }, {
                headers: {
                    'Content-Type': "application/json"
                }
            })

            console.log(data);
            setLoading(false)


        } catch (error: any) {
            setLoading(false)
            console.log("login error :");
            console.log(error.response.data.message);
            setError(error.response.data.message! ?? "something went wrong");


        }

    }

    const handleLogin = async () => {
        try {
            setLoading(true)
            const response = await signIn("credentials", { email, password, redirect: false })
            console.log(response);
            setLoading(false)

        } catch (error: any) {

            setLoading(false)
            console.log("login error :");
            console.log(error.response.data.message);
            setError(error.response.data.message! ?? "something went wrong");


        }

    }
    const handleGoogleLogin = async () => {
        try {
            setLoading(true)
            const response = await signIn("google")
            console.log(response);
            setLoading(false)

        } catch (error: any) {

            setLoading(false)
            console.log("login error :");
            console.log(error.response.data.message);
            setError(error.response.data.message! ?? "something went wrong");


        }

    }

    return (
        <AnimatePresence>
            {
                open &&
                (
                    <>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className='fixed inset-0 z-90 bg-black/80 backdrop-blur-md'
                        >
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95, y: 40 }}
                                exit={{ opacity: 0, scale: 0.95, y: 40 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                transition={{ duration: 0.35, ease: "easeOut" }}
                                className='fixed inset-0 z-100 flex items-center justify-center px-4'

                            >
                                <div className='relative w-full max-w-md rounded-3xl bg-white border border-black/10 shadow-[0_40px_100px_rgba(0,0,0,0.35) p-6 sm:p-8] text-black'>
                                    <div className='absolute right-4 top-4 text-gray-500 hover:text-black transition' onClick={onClose}>
                                        <X size={20} />
                                    </div>
                                    <div className='mb-6 text-center'>
                                        <h1 className='text-3xl font-extrabold tracking-widest'>RYDEX</h1>
                                        <p className='mt-1 text-xs text-gray-500'>Premium Vehicle Booking</p>
                                    </div>

                                    <button
                                        onClick={handleGoogleLogin}
                                        className='w-full h-11 rounded-xl border  border-black/30 flex items-center justify-center gap-3 
                                text-sm font-semibold hover:bg-black hover:text-white transition hover:cursor-pointer
                                '
                                    >
                                        <Image src={"/google.png"} alt='google' width={20} height={20} />
                                        Continue with Google
                                    </button>

                                    <div className='flex items-center gap-4 my-6'>
                                        <div className='flex-1 h-px bg-black/10' />
                                        <div className='text-xs text-gray-500 '>
                                            OR
                                        </div>
                                        <div className='flex-1 h-px bg-black/10' />
                                    </div>

                                    <div>
                                        {
                                            step == "login" && (
                                                <motion.div
                                                    initial={{ opacity: 0, x: 20 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    exit={{ opacity: 0, x: 20 }}

                                                >
                                                    <h1 className='text-xl font-semibold'>Welcome Back</h1>
                                                    <div className='mt-5 space-y-4'>
                                                        <div
                                                            className='flex items-center gap-3 border border-black/20 rounded-xl px-4 py-3'
                                                        >
                                                            <Mail size={18} className='text-gray-500' />
                                                            <input type='email' placeholder='Email'
                                                                value={email}
                                                                onChange={(e) => setEmail(e.target.value)}
                                                                className='w-full bg-transparent outline-none text-sm'
                                                            />
                                                        </div>
                                                        <div
                                                            className='flex items-center gap-3 border border-black/20 rounded-xl px-4 py-3'
                                                        >
                                                            <Lock size={18} className='text-gray-500' />
                                                            <input type='password' placeholder='Password'
                                                                value={password}
                                                                onChange={(e) => setPassword(e.target.value)}
                                                                className='w-full bg-transparent outline-none text-sm'
                                                            />
                                                        </div>
                                                        {
                                                            error && <p className='text-red-500'>
                                                                *{error}
                                                            </p>
                                                        }
                                                        <button
                                                            onClick={handleLogin}
                                                            disabled={loading}
                                                            className='hover:cursor-pointer w-full h-11 rounded-xl bg-black text-white font-semibold hover:bg-gray-900 transition flex justify-center items-center'>
                                                            {
                                                                !loading ? <span>Login</span> : <Loader2 size={18} className='text-white animate-spin text-center' />
                                                            }
                                                        </button>
                                                        <div className='flex items-center justify-center gap-2'>
                                                            Dont have an account ?
                                                            <div
                                                                onClick={() => setSetp("signup")}
                                                                className='text-black font-medium hover:underline hover:cursor-pointer'
                                                            >
                                                                SignUp
                                                            </div>
                                                        </div>
                                                    </div>

                                                </motion.div>
                                            )
                                        }


                                    </div>

                                    <div>
                                        {
                                            step == "signup" && (
                                                <motion.div
                                                    initial={{ opacity: 0, x: 20 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    exit={{ opacity: 0, x: 20 }}
                                                >
                                                    <h1 className='text-xl font-semibold'>Create Account</h1>
                                                    <div className='mt-5 space-y-4'>
                                                        <div
                                                            className='flex items-center gap-3 border border-black/20 rounded-xl px-4 py-3'
                                                        >
                                                            <User size={18} className='text-gray-500' />
                                                            <input type='type' placeholder='Full Name'
                                                                value={name}
                                                                onChange={(e) => setName(e.target.value)}
                                                                className='w-full bg-transparent outline-none text-sm'
                                                            />
                                                        </div>
                                                        <div
                                                            className='flex items-center gap-3 border border-black/20 rounded-xl px-4 py-3'
                                                        >
                                                            <Mail size={18} className='text-gray-500' />
                                                            <input type='email' placeholder='Email'
                                                                value={email}
                                                                onChange={(e) => setEmail(e.target.value)}
                                                                className='w-full bg-transparent outline-none text-sm'
                                                            />
                                                        </div>
                                                        <div
                                                            className='flex items-center gap-3 border border-black/20 rounded-xl px-4 py-3'
                                                        >
                                                            <Lock size={18} className='text-gray-500' />
                                                            <input type='password' placeholder='Password'
                                                                value={password}
                                                                onChange={(e) => setPassword(e.target.value)}
                                                                className='w-full bg-transparent outline-none text-sm'
                                                            />
                                                        </div>
                                                        {
                                                            error && <p className='text-red-500'>
                                                                *{error}
                                                            </p>
                                                        }

                                                        <button
                                                            disabled={loading}
                                                            onClick={handleSignUp}
                                                            className='hover:cursor-pointer w-full h-11 rounded-xl bg-black text-white font-semibold hover:bg-gray-900 transition flex justify-center items-center'>
                                                            {
                                                                !loading ? <span>SignUp</span> : <span><Loader2 size={18} className='text-white animate-spin' /></span>
                                                            }

                                                        </button>
                                                        <div className='flex items-center justify-center gap-2'>
                                                            Do have an account ?
                                                            <div
                                                                onClick={() => setSetp("login")}
                                                                className='text-black font-medium hover:underline hover:cursor-pointer'
                                                            >
                                                                Login
                                                            </div>
                                                        </div>
                                                    </div>

                                                </motion.div>
                                            )
                                        }


                                    </div>


                                </div>

                            </motion.div>

                        </motion.div>
                    </>
                )
            }
        </AnimatePresence>
    )
}

export default AuthModal