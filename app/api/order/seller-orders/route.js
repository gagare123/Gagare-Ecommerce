import { getAuth } from "@clerk/nextjs/server";
import authSeller from "@/lib/authSeller";
import { NextResponse } from "next/server";
import connectDb from "@/config/db";
import Address from "@/models/Address";
import Product from "@/models/Product"; 
import Order from "@/models/Order"; // ← Add this line back!

export async function GET(request){
    try {
        
        const {userId} = getAuth(request);
        
        const isSeller = await authSeller(userId);

        if(!isSeller){
            return NextResponse.json({success: false, message: 'Not authorized'});
        }

        await connectDb();
        
        Address.modelName;
        Product.modelName;

        const orders = await Order.find({})
            .populate('address')
            .populate('items.product');
            
        return NextResponse.json({success: true, orders});

    } catch (error) {
        console.log(error);
        return NextResponse.json({success: false, message: error.message});
    }
}