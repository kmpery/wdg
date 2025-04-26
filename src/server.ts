import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './server/connectDB';
import commentRoutes from './server/commentController';
import rsvpRoutes from './server/rsvpController';

dotenv.config(); // Load .env file

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json()); // Untuk menerima JSON dari body request

// Routes
app.use('/api/comments', commentRoutes);
app.use('/api/rsvps', rsvpRoutes);

// Debugging middleware untuk log request
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Connect ke DB dan mulai server
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server berjalan di http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Gagal konek ke database:', err);
  });

// Default route untuk menangani endpoint yang tidak ditemukan
app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint not found' });
});
