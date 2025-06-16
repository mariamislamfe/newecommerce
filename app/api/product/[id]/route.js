import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import connectDB from "@/config/db";
import Product from "@/models/product";
import authSeller from "@/lib/authSeller";

export async function DELETE(request, { params }) {
  try {
    await connectDB();
    const { userId } = getAuth(request);
    const isSeller = await authSeller(userId);

    if (!isSeller) {
      return NextResponse.json({ success: false, message: "You are not a seller" });
    }

    const { id } = params;

    const product = await Product.findById(id);

    if (!product) {
      return NextResponse.json({ success: false, message: "Product not found" });
    }

    // تأكيد إن اليوزر هو صاحب المنتج
    if (product.userId !== userId) {
      return NextResponse.json({ success: false, message: "Unauthorized action" });
    }

    await Product.findByIdAndDelete(id);

    return NextResponse.json({ success: true, message: "Product deleted successfully" });

  } catch (error) {
    return NextResponse.json({ success: false, message: error.message });
  }
}
