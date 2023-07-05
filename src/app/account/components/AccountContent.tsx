"use client"

import Button from "@/components/Button"
import { useSubscribeModal } from "@/hooks/useSubscribeModal"
import { useUser } from "@/hooks/useUser"
import { postData } from "@/libs/helpers"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { toast } from "react-hot-toast"

const AccountContent = () => {
    const router = useRouter()
    const subscribeModal = useSubscribeModal()
    const {user, subscription, isLoading} = useUser()
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if(!loading && !user) return router.replace("/")
    },[ user, router, loading])

    const redirectToCustomerPortal = async () => {

        try {
            setLoading(true)
            const {url , error} = await postData({
                url: "/api/create-portal-link"
            })
            window.location.assign(url)
        } catch (error: any) {
            toast.error(error.message)
        }
    }
  return (
    <div className="mb-7 px-6 ">
        {!subscription && (
            <div className="flex flex-col gap-y-4">
               <p>
                 No active plan
                </p>
                <Button className="w-[300px]" onClick={subscribeModal.onOpen}> Subscribe</Button>
            </div>
        )}
        {
            subscription && (
                <div className="flex flex-col gap-y-4">
                    <p>
                        You are currently on the <b>{subscription.prices?.products?.name}</b>
                    </p>
                    <Button onClick={redirectToCustomerPortal} className="w-[300px] " disabled={loading || isLoading}>
                        Open customer portal
                    </Button>
                </div>
            )
        }
    </div>
  )
}

export default AccountContent