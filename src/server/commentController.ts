import connectDB from './connectDB';
import Comment from '@/models/Comment';

export async function createComment(data: { name: string; comment: string }) {
  await connectDB();
  const newComment = await Comment.create(data);
  return newComment;
}

export async function getAllComments() {
  await connectDB();
  const comments = await Comment.find().sort({ createdAt: -1 });
  return comments;
}
