import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  cartItems: {
    type: Map,
    of: mongoose.Schema.Types.Mixed,
    default: {}
  }
}, { minimize: false });

const User = mongoose.models.user || mongoose.model("User", userSchema);
export default User;
