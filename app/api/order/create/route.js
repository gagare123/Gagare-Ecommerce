import { inngest } from "@/config/inngest";
import User from "@/models/User";
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import Product from "@/models/Product";

export async function POST(request){
    try {
        
        const {userId} = getAuth(request);
        const {address, items} = await request.json();

        if(!address || items.length === 0){
            return NextResponse.json({success: false, message: 'Invalid data'});
        }

        // Calculate amount - OPTIMIZED (fetches all products in parallel)
        const productPromises = items.map(item => Product.findById(item.product));
        const products = await Promise.all(productPromises);
        
        const amount = items.reduce((acc, item, index) => {
            const product = products[index];
            if (product) {
                return acc + product.offerPrice * item.quantity;
            }
            return acc;
        }, 0);
       
        await inngest.send({
            name: 'order/created',
            data: {
                userId,
                address,
                items,
                amount: amount + Math.floor(amount * 0.02),
                date: Date.now()
            }
        });

        // Clear user cart
        const user = await User.findById(userId);
        user.cartItems = {};
        await user.save();

        return NextResponse.json({success: true, message: 'Order Placed'});

    } catch (error) {
        console.log(error);
        return NextResponse.json({success: false, message: error.message});
    }
}