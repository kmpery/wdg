import express from 'express';
import Rsvp from '../models/Rsvp';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const rsvps = await Rsvp.find().sort({ createdAt: -1 });
    res.json(rsvps);
  } catch (error) {
    console.error('Error fetching RSVPs:', error);
    res.status(500).json({ error: 'Failed to fetch RSVPs' });
  }
});

router.post('/', async (req, res) => {
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
    console.error('Error saving RSVP:', error);
    res.status(500).json({ error: 'Failed to save RSVP' });
  }
});

export default router;
