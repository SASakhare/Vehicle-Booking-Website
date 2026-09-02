"use client"

import { setUserData } from "@/redux/userSlice"
import axios from "axios"
import { useEffect } from "react"
import { useDispatch } from "react-redux"


const useGetMe = (enabled: boolean) => {

    const dispatch = useDispatch();

    useEffect(() => {
        if (!enabled) {
            return;
        }
        const getMe = async () => {
            const { data } = await axios.get("/api/user/me");
            console.log("use get me");
            
            console.log(data);
            dispatch(setUserData(data))

        }

        getMe()
    }, [enabled,dispatch])
}

export default useGetMe