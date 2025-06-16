import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import Product from "@/models/product";
import User from "@/models/User";
import { inngest } from "@/config/inngest";

export async function POST(request) {
    try {
        const {userId} = getAuth(request)
        const {address} = await request.json()
        if (!address || item.length === 0) {
            return NextResponse.json({success: false, message: "invalid data"})
        }

        // calculate amount
        const amount = item.reduce(async (acc, curr) => {
            const product = await Product.findById(item.product)
            return acc + product.offerPrice * item.quantity;
        },0)
            await inngest.send({
        
                    name: "order/created",
                    data: {
                        userId,
                        items,
                        address,
                        amount: amount + Math.floor(amount * 0.02),
                        date: Date.now()
                    }
            })

            // clear cart
            const user = await User.findById(userId)
            user.cartItems = {}
            await user.save()
            return NextResponse.json({success: true, message: 'order placed successfully'})
            
    } catch (error) {
        console.log(error)
        return NextResponse.json({success: false, message: error.message})
    }
}