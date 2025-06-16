import Product from "@/models/product";
import { NextResponse } from "next/server";
import connectDB from "@/config/db";

export async function GET() {
  try {
    await connectDB();
    const products = await Product.find({});
    return NextResponse.json({ success: true, products });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message });
  }
}
