import mongoose from "mongoose";

const Schema = new mongoose.Schema({
    conversationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Title',
        required: true
    },


    role: {
        type: String,
        enum: ['user', 'assistant'],
        required: true
    },

    content: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ['image', 'text'],
        required: true,
        default: 'text'
    },
    createdAt: Date
},
{timestamps: true}
)


export const Conversationmodel = mongoose.model('Conversation', Schema) 
