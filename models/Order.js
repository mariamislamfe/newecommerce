import mongoose from "mongoose";


const orderschema = new mongoose.Schema({
    userId: { type: String, required: true },
    items: [{
        product: {type: Number, required: true},
        quantity: {type: Number, required: true}
    }],
    amount: { type: Number, required: true },
    address: { type: String, required: true, ref: "address" },
    status: { type: String, required: true, default: "order placed" },
    date: { type: Number, required: true },
})

const Order = mongoose.models.Order || mongoose.model("Order", orderschema)

export default Order 