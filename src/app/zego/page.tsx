"use client"
import { RootState } from '@/redux/store';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import { useRef } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'sonner';

const Page = () => {

    const containerRef = useRef<HTMLDivElement>(null);
    const { userData } = useSelector((state: RootState) => state.user)

    const startCall = async () => {
        try {
            if (!containerRef) {
                return null
            }

            const appId = Number(process.env.NEXT_PUBLIC_ZEGO_APP_ID);
            const serverSecret = process.env.NEXT_PUBLIC_ZEGO_SERVER_SECRET as string;

            const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
                appId,
                serverSecret,
                "room-1",
                userData?._id.toString(),
                "sejal",
            )

            const zp = ZegoUIKitPrebuilt.create(kitToken);

            zp.joinRoom({
                container: containerRef.current,
                scenario: {
                    mode: ZegoUIKitPrebuilt.OneONoneCall, // To implement 1-on-1 calls, modify the parameter here to [ZegoUIKitPrebuilt.OneONoneCall].
                },
                showPreJoinView: false
            });

        } catch (error:any) {
            console.log(error);
            toast.error(error.response.data.message ?? "something went wrong")
            
        }
    }
    return (
        <div
            className="h-screen"
            ref={containerRef}
        >
            <button
            className='w-50 h-20 bg-gray-700 rounded-2xl'
            onClick={startCall}
            >Click</button>
        </div>
    )
}

export default Page