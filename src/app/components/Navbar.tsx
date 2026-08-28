"use client"

import { motion } from "motion/react"
import React, { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import AuthModal from "./AuthModal"
import { useSelector } from "react-redux"
import { RootState } from "@/redux/store"

const NAV_Items = ["Home", "Bookings", "About Us", "Contact"]

const Navbar = () => {
    const pathname = usePathname()
    // console.log(pathname);

    const [authOpen, setAuthOpen] = useState<boolean>(false);

    const { userData } = useSelector((state: RootState) => state.user)

    console.log(`userData : ${userData}`);
    console.log(`name : ${userData?.name}`);




    return (
        <>
            <motion.div
                initial={{ y: -60, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="
            py-2 px-5
            flex justify-between items-center
            fixed top-3 left-1/2 -translate-x-1/2
            w-[94%] md:w-[86%]
            z-50
            rounded-full
            bg-black text-white
            shadow-[0_15px_50px_rgba(0,0,0,0.7)]
            "
            >

                {/* Logo */}
                <div className="flex items-center">
                    <Image
                        src="/logo.png"
                        alt="logo"
                        width={44}
                        height={44}
                        priority
                    />
                </div>


                {/* Navigation */}
                <div className="flex items-center gap-6">
                    {
                        NAV_Items.map((item, index) => {

                            let href = `/${item.toLowerCase().replace(" ", "-")}`
                            let active = href === pathname


                            if (item == 'Home') {
                                href = '/'
                                active = true;
                            }

                            return (
                                <Link
                                    href={href}
                                    key={index}
                                    className={`
                                text-sm md:text-base
                                transition-colors duration-300
                                ${active
                                            ? "text-white"
                                            : "text-gray-400 hover:text-white"
                                        }
                                `}
                                >
                                    {item}
                                </Link>
                            )
                        })
                    }
                </div>

                <div className="flex items-center gap-3 relative">

                    <div className=" md:block relative">
                        {
                            !userData ?
                                (
                                    <button
                                        onClick={() => setAuthOpen(true)}
                                        className="px-4 py-1.5 rounded-full bg-white text-black text-sm hover:cursor-pointer">
                                        Login
                                    </button>
                                ) :
                                (
                                    <button
                                        className="w-11 h-11 rounded-full bg-white text-black font-bold hover:cursor-pointer">
                                        {
                                            userData.name.charAt(0).toUpperCase()
                                        }
                                    </button>
                                )
                        }
                    </div>



                </div>


            </motion.div>

            <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} />
        </>
    )
}

export default Navbar