import mongoose from "mongoose";

const progressSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true
    },
    slug: {
        type: String,
    },
    content: {
        type: String,
    },
    author: {
       Type: String
    },
    investedTime: {
        type: String,
        required: true,
    }

}, {timestamps: true});

const Progress = mongoose.model("Progress", progressSchema, "progresses");

export default Progress;