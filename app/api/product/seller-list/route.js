import authSeller from "@/lib/authSeller";
import { getAuth } from "@clerk/nextjs/server";
import Product from "@/models/product";
import { NextResponse } from "next/server";
import connectDB from "@/config/db";  // 👈 ضيف ده

export async function GET(request) {
  try {
    await connectDB(); // 👈 ضيف ده الأول

    const { userId } = getAuth(request);
    const isSeller = await authSeller(userId); // 👈 ضيف await

    if (!isSeller) {
      return NextResponse.json({ success: false, message: "You are not a seller" });
    }

    const products = await Product.find({ userId }); // 👈 عدل هنا بدل seller

    return NextResponse.json({ success: true, products });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message });
  }
}
