import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    contact: Number,
    password: String

}, {timestamps:true});

const User = mongoose.model('User', UserSchema, 'users');
export default User;