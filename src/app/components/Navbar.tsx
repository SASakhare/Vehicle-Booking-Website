"use client"

import { AnimatePresence, motion } from "motion/react"
import React, { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import AuthModal from "./AuthModal"
import { useSelector } from "react-redux"
import { RootState } from "@/redux/store"
import ProfileComponent from "./ProfileComponent"
import {Menu, X } from "lucide-react"
const NAV_Items = ["Home", "Bookings", "About Us", "Contact"]

const Navbar = () => {
    const pathname = usePathname()
    // console.log(pathname);

    const [authOpen, setAuthOpen] = useState<boolean>(false);
    const [profileOpen, setProfileOpen] = useState<boolean>(false);

    const [menuOpen, setMenuOpen] = useState<boolean>(false);

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
                <div className="hidden md:flex items-center gap-6">
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
                                        className="w-11 h-11 rounded-full bg-white text-black font-bold hover:cursor-pointer"
                                        onClick={() => setProfileOpen((p) => !p)}
                                    >
                                        {
                                            userData.name.charAt(0).toUpperCase()
                                        }
                                    </button>

                                )
                        }

                        {
                            <ProfileComponent profileOpen={profileOpen} setProfileOpen={setProfileOpen} userData={userData} />
                        }
                    </div>

                    {
                        <button className="block md:hidden text-white"
                            onClick={() => setMenuOpen((p) => !p)}
                        >
                            {
                                !menuOpen ? (<Menu size={26} />) : (<X size={26} />)
                            }

                        </button>
                    }


                </div>


            </motion.div>

            {
                menuOpen && (
                    <AnimatePresence>
                        {/* Navigation */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.9 }}
                            exit={{ opacity: 0 }}

                            onClick={() => setMenuOpen(false)}
                            className="fixed inset-0 bg-black z-30 md:hidden"
                        />
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.2 }}
                            className="fixed top-21.25 left-1/2 z-50 -translate-x-1/2 w-[92%] bg-black rounded-2xl shadow-2xl md:hidden overflow-hidden"
                        >
                            <div
                                className="flex flex-col gap-5 divide-y justify-center items-center divide-white/10"
                            >

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
                                            outline-none
                                            outline-0
                                            text-3xl
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
                        </motion.div>

                    </AnimatePresence>


                )
            }


            <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} />
        </>
    )
}

export default Navbar