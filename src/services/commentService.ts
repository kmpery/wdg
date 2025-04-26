const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export async function getComments() {
  const res = await fetch(`${BASE_URL}/api/comments`, { method: 'GET' });
  if (!res.ok) throw new Error('Failed to fetch comments');
  return res.json();
}

export async function postComment(commentData: {
  name: string;
  comment: string;
}) {
  const res = await fetch(`${BASE_URL}/api/comments`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(commentData),
  });
  if (!res.ok) throw new Error('Failed to post comment');
  return res.json();
}
