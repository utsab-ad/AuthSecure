import mongoose from "mongoose";

const hiremeSchema = new mongoose.Schema(
  {
    companyName: String,
    address: String,
    email: String,
    category: String,
    contact: String,
    noOfEmployees: Number,
    description: String,
    source: String,
    status: {
      type: String,
      enum: ["pending", "accepted", "rejected"],
      default: "pending",
    },
  },
  { timestamps: true }
);

const HiremeReq = mongoose.model("HiremeReq", hiremeSchema, "hiremereqs");

export default HiremeReq;
