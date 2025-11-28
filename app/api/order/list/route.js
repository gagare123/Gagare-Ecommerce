import connectDb from "@/config/db";
import Address from "@/models/Address"; // ← Add this import
import Order from "@/models/Order";
import Product from "@/models/Product"; // ← Add this if not already imported
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET(request){
    try {
        const {userId} = getAuth(request);

        await connectDb();

        const orders = await Order.find({userId})
            .populate('address')
            .populate('items.product');
         
        return NextResponse.json({success: true, orders});

    } catch (error) {
        console.log(error);
        return NextResponse.json({success: false, message: error.message});
    }
}







// import connectDb from "@/config/db";
// import Address from "@/models/Address";
// import Order from "@/models/Order";
// import Product from "@/models/Product";
// import { getAuth } from "@clerk/nextjs/server";
// import { NextResponse } from "next/server";



// export async function GET(request){
//     try {
        
//         const {userId} = getAuth(request)

//         await connectDb()

//         Address.length
//         Product.length

//         const orders = await Order.find({userId}).populate('Address items.product')
         
//         return NextResponse.json({success: false, orders})

//     } catch (error) {
//         return NextResponse.json({success: false, message:error.message})
        
//     }

// }