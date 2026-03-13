import mongoose from 'mongoose'


const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        select: false
    },
    googleId: {
        type: String,
    },
    avatar:{
        type: String, 
        default: ''
    }
}, {timestamps: true});

export const UserModel = mongoose.model("User", UserSchema) 