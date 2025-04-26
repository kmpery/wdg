import express, { Request, Response } from 'express';
import Comment from '../models/Comment';

const router = express.Router();

router.get('/', async (_req: Request, res: Response) => {
  try {
    const comments = await Comment.find().sort({ createdAt: -1 });
    res.json(comments);
  } catch (error) {
    console.error('Error fetching comments:', error); // Optional: Log the error
    res.status(500).json({ error: 'Failed to fetch comments' });
  }
});

router.post('/', async (req: Request, res: Response) => {
  try {
    const { name, comment } = req.body;
    const newComment = new Comment({ name, message: comment });
    await newComment.save();
    res.status(201).json(newComment);
  } catch (error) {
    console.error('Error saving comment:', error); // Optional: Log the error
    res.status(500).json({ error: 'Failed to save comment' });
  }
});

export default router;
