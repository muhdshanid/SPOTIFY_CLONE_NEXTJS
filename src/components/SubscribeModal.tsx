"use client"

import { Price, ProductWithPrice } from "@/types/types"
import Modal from "./Modal"
import Button from "./Button"
import { useState } from "react"
import { useUser } from "@/hooks/useUser"
import { toast } from "react-hot-toast"
import { postData } from "@/libs/helpers"
import { getStripe } from "@/libs/stripeClient"
import { stripe } from "@/libs/stripe"
import { useSubscribeModal } from "@/hooks/useSubscribeModal"

type SubscribeModalProviderProps = {
    products: ProductWithPrice[]
  }

const SubscribeModal = ({products}: SubscribeModalProviderProps) => {
    let content = (
        <div className="text-center">
            No products available
        </div>
    )
    const subscribeModal = useSubscribeModal()
    const [priceIdLoading, setPriceIdLoading] = useState<string>()
    const {user, isLoading, subscription} = useUser()
    const onChange = (open: boolean) => {

        if(!open) subscribeModal.onClose()
    }
    const formatPrice = (price: Price) => {

    const priceString = new Intl.NumberFormat('en-US', {
        style: "currency",
        currency: price.currency,
        minimumFractionDigits: 0
    }).format((price.unit_amount || 0) / 100)

    return priceString
    }
    const handleCheckout = async(price: Price) => {

        setPriceIdLoading(price.id)
        if(!user){
         setPriceIdLoading(undefined)

        return toast.error("Must be loggedin")
        }

        if(subscription){
            setPriceIdLoading(undefined)
            return toast("Already subscribed")
        }

        try {
            const {sessionId} = await postData({
                url: "/api/create-checkout-session",
                data: {price}
            })

            const stripe = await getStripe()
            stripe?.redirectToCheckout({sessionId})
        } catch (error) {
            toast.error((error as Error)?.message)
        }finally{
            setPriceIdLoading(undefined)
        }
    }
    if (products.length) {
        content = (
          <div>
            {products.map((product) => {
              if (!product.prices?.length) {
                return (
                  <div key={product.id}>
                    No prices available
                  </div>
                );
              }
    
              return product.prices.map((price) => (
                <Button 
                  key={price.id} 
                  onClick={() => handleCheckout(price)}
                  disabled={isLoading || price.id === priceIdLoading}
                  className="mb-4"
                >
                  {`Subscribe for ${formatPrice(price)} a ${price.interval}`}
                </Button>
              ))
            })}
          </div>
        )
      }
    if(subscription){
        content = (
            <div className="text-center">
                Already subscribed
            </div>
        )
    }
  return (
    <Modal title="Only for premium users" desc="Listen to music with spotify premium"
    isOpen={subscribeModal.isOpen} onChange={onChange} >
        {content}
    </Modal>
  )
}

export default SubscribeModal