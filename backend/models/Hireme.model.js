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
  },
  { timestamps: true }
);

const HiremeReq = mongoose.model("HiremeReq", hiremeSchema, "hiremereqs");

export default HiremeReq;
