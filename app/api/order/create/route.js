import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import Product from "@/models/Product";
import User from "@/models/User";
import Order from "@/models/Order";
import { inngest } from "@/config/inngest";

export async function POST(request) {
  try {
    const { userId } = getAuth(request);
    const { address, items } = await request.json();

    if (!address || !items || items.length === 0) {
      return NextResponse.json({ success: false, message: "Invalid data" });
    }

    // calculate total amount
    let amount = 0;
    for (const item of items) {
      const product = await Product.findById(item.productId);
      if (!product) {
        return NextResponse.json({
          success: false,
          message: `Product with ID ${item.productId} not found`,
        });
      }
      amount += product.offerPrice * item.quantity;
    }

    const totalAmount = amount + Math.floor(amount * 0.02);

    // create order in DB
    const newOrder = await Order.create({
      userId,
      items: items.map((item) => ({
        product: item.productId,
        quantity: item.quantity,
      })),
      amount: totalAmount,
      address,
    });

    // send order created event to inngest
    await inngest.send({
      name: "order/created",
      data: {
        userId,
        orderId: newOrder._id,
        items,
        address,
        amount: totalAmount,
        date: Date.now(),
      },
    });

    // clear user's cart
    const user = await User.findById(userId);
    user.cartItems = {};
    await user.save();

    return NextResponse.json({
      success: true,
      message: "Order placed successfully",
      orderId: newOrder._id,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ success: false, message: error.message });
  }
}
