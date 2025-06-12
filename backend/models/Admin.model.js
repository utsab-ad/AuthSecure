import mongoose from 'mongoose';

const adminSchema = new mongoose.Schema({

    name: {
        type: String,
    },
    email:{
        type: String,
    },
    password: {
        type: String,
    },
    avatar: {
        type: String,
    }
    

}, {timestamps: true});

const Admin = mongoose.model("Admin", adminSchema, "admins");

export default Admin;
