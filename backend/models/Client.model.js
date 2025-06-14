import mongoose from 'mongoose';

const clientSchema = new mongoose.Schema({

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

const Client = mongoose.model("Client", clientSchema, "clients");

export default Client;
