import { getAuth } from "@clerk/nextjs/server";
import connectDB from "@/config/db";
import Order from "@/models/Order";
import { NextResponse } from "next/server";
import Address from "@/models/Address";

import authSeller from "@/lib/authSeller";

export async function GET(request) {
  try {
    const { userId } = getAuth(request);

    const isSeller = await authSeller(userId);
    if (!isSeller) {
      return NextResponse.json({ success: false, message: "You are not a seller" });
    }

    await connectDB();

    const orders = await Order.find({})
      .populate("items.product")
      .populate("address");

    console.log(orders[0]);

    return NextResponse.json({ success: true, orders });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message });
  }
}
