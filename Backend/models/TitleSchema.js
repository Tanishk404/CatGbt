import mongoose from 'mongoose'

const TitleSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  title: {
    type: String,
    default: "New Chat"
  }
}, { timestamps: true });

export const TitleModel = mongoose.model("title", TitleSchema);
