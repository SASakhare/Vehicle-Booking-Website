import { IUser } from '@/models/user.model'
import { AppDispatch } from '@/redux/store'
import { setUserData } from '@/redux/userSlice'
import { motion } from 'framer-motion'
import { Bike, Car, ChevronRight, LogOut, Truck } from 'lucide-react'
import { AnimatePresence } from 'motion/react'
import { signOut } from 'next-auth/react'
import React, { Dispatch } from 'react'
import { useDispatch } from 'react-redux'

const ProfileComponent = ({ profileOpen, setProfileOpen, userData }: { profileOpen: boolean, setProfileOpen: Dispatch<React.SetStateAction<boolean>>, userData: IUser | null }) => {


    const dispatch = useDispatch<AppDispatch>();
    const handleLogout = async () => {

        await signOut({ redirect: false })
        dispatch(setUserData(null));
        setProfileOpen(false)

    }

    return (
        <AnimatePresence>
            {
                profileOpen && (

                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}

                        className='absolute top-14 right-0 w-75 bg-white text-black  rounded-2xl shadow-xl border'
                    >
                        <motion.div className='p-5'>

                            <p
                                className='font-semibold text-lg'
                            >
                                {
                                    userData?.name
                                }
                            </p>

                            <p className='text-xs uppercase text-gray-500 mb-4'>
                                {
                                    userData?.role
                                }
                            </p>

                            {
                                userData?.role != "partner" && (
                                    <div className='w-full flex items-center gap-3 p-3 hover:bg-gray-100 rounded-xl'>

                                        <div className='flex -space-x-2'>
                                            <div className='w-6 h-6 rounded-full bg-black text-white flex justify-center items-center'>
                                                <Bike size={16} />
                                            </div>
                                            <div className='w-6 h-6 rounded-full bg-black text-white flex justify-center items-center'>
                                                <Car size={16} />
                                            </div>
                                            <div className='w-6 h-6 rounded-full bg-black text-white flex justify-center items-center'>
                                                <Truck size={16} />
                                            </div>
                                        </div>
                                        Become a Partner
                                        <ChevronRight size={16} className='ml-auto' />
                                    </div>)
                            }

                            <button
                                onClick={handleLogout}
                                className='w-full flex items-center gap-3 p-3 hover:bg-gray-100 rounded-xl mt-2'>
                                <LogOut size={16} />
                                Logout
                            </button>
                        </motion.div>


                    </motion.div>
                )
            }
        </AnimatePresence>
    )
}

export default ProfileComponent