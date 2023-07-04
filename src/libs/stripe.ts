import Stripe from "stripe";


export const strip = new Stripe(
    process.env.STRIPE_SECRET_KEY ?? "",
    {
        apiVersion: "2022-11-15",
        appInfo: {
            name: "spotify_clone",
            version: "0.1.0"
        }
    }
)