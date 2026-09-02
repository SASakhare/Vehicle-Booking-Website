"use client"

import useGetMe from "@/hooks/useGetMe"
import { RootState } from "@/redux/store"
import { useSelector } from "react-redux"
import PartnerDashboard from "./PartnerDashboard"
import AdminDashboard from "./AdminDashboard"
import PublicHome from "./PublicHome"


const HomePageWrapper = () => {
    useGetMe(true)

    const userData = useSelector((state: RootState) => state.user.userData)

    return (
        <>
            {
                userData?.role == 'partner' ?
                    <PartnerDashboard /> :
                    (
                        userData?.role == 'admin' ?
                            <AdminDashboard /> :
                            <PublicHome />
                    )
            }

        </>
    )
}

export default HomePageWrapper