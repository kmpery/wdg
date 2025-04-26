import connectDB from './connectDB';
import Rsvp from '@/models/Rsvp';

export async function createRsvp(data: {
  name: string;
  phone: string;
  willAttend: string;
  numberOfGuests: number;
  message?: string;
}) {
  await connectDB();
  const newRsvp = await Rsvp.create(data);
  return newRsvp;
}

export async function getAllRsvps() {
  await connectDB();
  const rsvps = await Rsvp.find().sort({ createdAt: -1 });
  return rsvps;
}
