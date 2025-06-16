import { getAuth } from "@clerk/nextjs/server";
import connectDB from "@/config/db";
import Order from "@/models/Order";
import Address from "@/models/Address"; // 🟢 أضف السطر دا
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    const { userId } = getAuth(request);

    await connectDB();

    const orders = await Order.find({ userId })
      .populate("items.product")
      .populate("address");  // 🟢 لو عايزه العنوان كامل

    return NextResponse.json({ success: true, orders });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ success: false, message: error.message });
  }
}
