'use client';

export async function getRsvps() {
  const res = await fetch('/api/rsvp', { method: 'GET' });
  if (!res.ok) throw new Error('Failed to fetch RSVPs');
  return res.json();
}

export async function postRsvp(rsvpData: {
  name: string;
  phone: string;
  willAttend: string;
  numberOfGuests: number;
  message?: string;
}) {
  const res = await fetch('/api/rsvp', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(rsvpData),
  });
  if (!res.ok) throw new Error('Failed to submit RSVP');
  return res.json();
}
