import Product from "@/models/product";
import { NextResponse } from "next/server";
import connectDB from "@/config/db";
import { getAuth } from "@clerk/nextjs/server";
import authSeller from "@/lib/authSeller";

export async function GET(request) {
  try {
    const { userId } = getAuth(request);

    const isSeller = await authSeller(userId);
    if (!isSeller) {
      return NextResponse.json({ success: false, message: "You are not a seller" });
    }

    await connectDB();
    const products = await Product.find({ userId });  // كده userId موجود

    return NextResponse.json({ success: true, products });

  } catch (error) {
    return NextResponse.json({ success: false, message: error.message });
  }
}
