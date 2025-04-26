// filepath: /Users/f/alim-risa/src/models/Comment.ts
import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    message: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.models.Comment ||
  mongoose.model('Comment', commentSchema);
