// filepath: /Users/f/alim-risa/src/models/Rsvp.ts
import mongoose from 'mongoose';

const rsvpSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    willAttend: { type: String, required: true },
    numberOfGuests: { type: Number, required: true },
    message: { type: String },
  },
  { timestamps: true }
);

export default mongoose.models.Rsvp || mongoose.model('Rsvp', rsvpSchema);
