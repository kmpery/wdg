import express, { Request, Response } from 'express';
import Rsvp from '../models/Rsvp';

const router = express.Router();

router.get('/', async (_req: Request, res: Response) => {
  try {
    const rsvps = await Rsvp.find().sort({ createdAt: -1 });
    res.json(rsvps);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch RSVPs' });
  }
});

router.post('/', async (req: Request, res: Response) => {
  try {
    const { name, phone, willAttend, numberOfGuests, message } = req.body;
    const newRsvp = new Rsvp({
      name,
      phone,
      willAttend,
      numberOfGuests,
      message,
    });
    await newRsvp.save();
    res.status(201).json(newRsvp);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create RSVP' });
  }
});

export default router;
