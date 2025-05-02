'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Send } from 'lucide-react';
import axios from 'axios';
import { FaCommentDots } from 'react-icons/fa';
import useStore from '../store/useStore';

interface Comment {
  _id: string;
  name: string;
  message: string;
  createdAt: string;
}

const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;
const WS_URL = API_BASE_URL.replace(/^http/, 'ws');

const ThankYouSection: React.FC = () => {
  const { recipientName } = useStore();
  const [commentName, setCommentName] = useState('');
  const [commentMessage, setCommentMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [comments, setComments] = useState<Comment[]>([]);
  const wsRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    fetchComments();

    const socket = new WebSocket(WS_URL);
    wsRef.current = socket;

    socket.onopen = () => {
      console.log('WebSocket connected');
    };

    socket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data?.event === 'new-comment') {
          fetchComments();
        }
      } catch {
        console.error('Data WebSocket tidak valid:', event.data);
      }
    };

    socket.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    socket.onclose = () => {
      console.log('WebSocket closed');
    };

    return () => {
      socket.close();
    };
  }, []);

  useEffect(() => {
    if (recipientName) {
      setCommentName(recipientName);
    }
  }, [recipientName]);

  const fetchComments = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/comments`);
      if (Array.isArray(response.data)) {
        setComments(response.data);
      } else {
        console.error('Data komentar tidak valid:', response.data);
        setComments([]);
      }
    } catch (error) {
      console.error('Gagal mengambil data komentar:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentName.trim() || !commentMessage.trim()) return;

    setIsSubmitting(true);
    try {
      await axios.post(`${API_BASE_URL}/api/comments`, {
        name: commentName,
        message: commentMessage,
      });

      if (wsRef.current?.readyState === WebSocket.OPEN) {
        wsRef.current.send(JSON.stringify({ event: 'new-comment' }));
      }

      setCommentName(recipientName || '');
      setCommentMessage('');
    } catch (error) {
      console.error('Gagal mengirim komentar:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getColorFromName = (name: string): string => {
    const colors = [
      'text-blue-800',
      'text-pink-800',
      'text-indigo-800',
      'text-yellow-800',
      'text-teal-800',
      'text-emerald-800',
    ];
    const hash = name
      .split('')
      .reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return colors[hash % colors.length];
  };

  const formatDateToIndonesian = (dateString: string) => {
    const now = new Date();
    const pastDate = new Date(dateString);
    const diffInSeconds = Math.floor(
      (now.getTime() - pastDate.getTime()) / 1000
    );

    const minutes = Math.floor(diffInSeconds / 60);
    const hours = Math.floor(diffInSeconds / 3600);
    const days = Math.floor(diffInSeconds / 86400);
    const weeks = Math.floor(diffInSeconds / 604800);
    const months = Math.floor(diffInSeconds / 2592000);
    const years = Math.floor(diffInSeconds / 31536000);

    if (diffInSeconds < 60) return `${diffInSeconds} detik yang lalu`;
    if (minutes < 60) return `${minutes} menit yang lalu`;
    if (hours < 24) return `${hours} jam yang lalu`;
    if (days < 7) return `${days} hari yang lalu`;
    if (weeks < 4) return `${weeks} minggu yang lalu`;
    if (months < 12) return `${months} bulan yang lalu`;
    return `${years} tahun yang lalu`;
  };

  return (
    <section className='py-20 bg-amber-100 dark:bg-gray-900' id='thankyou'>
      <div className='container mx-auto px-4'>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className='text-center mb-12'
        >
          <h2 className='text-4xl font-bold text-amber-900 dark:text-sky-400 mb-4'>
            Thank You
          </h2>
          <div className='w-16 h-1 bg-amber-800 dark:bg-sky-400 mx-auto mb-8'></div>
          <p className='text-amber-800 dark:text-sky-200 max-w-2xl mx-auto'>
            Tinggalkan doa terbaik Anda untuk momen bahagia kami
          </p>
        </motion.div>

        <div className='max-w-3xl mx-auto'>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className='bg-amber-50 dark:bg-sky-950 rounded-lg shadow-md p-8 mb-8'
          >
            <form onSubmit={handleSubmit}>
              <div className='mb-4'>
                <label
                  className='block text-amber-800 dark:text-sky-300 text-sm font-medium mb-2'
                  htmlFor='name'
                >
                  Nama
                </label>
                <input
                  type='text'
                  id='name'
                  value={commentName}
                  onChange={(e) => setCommentName(e.target.value)}
                  required
                  className='w-full px-4 py-2 border border-amber-300 dark:border-sky-600 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 dark:focus:ring-sky-400 dark:bg-sky-950 dark:text-sky-200 bg-white text-gray-900 placeholder-gray-400 dark:placeholder-sky-400'
                  placeholder='Nama Anda'
                />
              </div>

              <div className='mb-6'>
                <label
                  className='block text-amber-800 dark:text-sky-300 text-sm font-medium mb-2'
                  htmlFor='message'
                >
                  Pesan
                </label>
                <textarea
                  id='message'
                  value={commentMessage}
                  onChange={(e) => setCommentMessage(e.target.value)}
                  required
                  rows={4}
                  className='w-full px-4 py-2 border border-amber-300 dark:border-sky-600 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white dark:focus:ring-sky-400 dark:bg-sky-950 dark:text-sky-200 text-gray-900 placeholder-gray-400 dark:placeholder-sky-400'
                  placeholder='Tulis Ucapan'
                ></textarea>
              </div>

              <button
                type='submit'
                disabled={isSubmitting}
                className={`flex items-center justify-center px-6 py-3 bg-amber-800 dark:bg-sky-700 dark:hover:bg-sky-600 text-white dark:text-sky-200 rounded-md transition-colors duration-300 ${
                  isSubmitting ? 'opacity-75 cursor-not-allowed' : ''
                }`}
              >
                <Send size={16} className='mr-2' />
                <span>{isSubmitting ? 'Mengirim...' : 'Kirim'}</span>
              </button>
            </form>

            <h3 className='text-2xl font-semibold text-amber-900 dark:text-sky-300 mt-8 flex items-center'>
              <FaCommentDots className='mr-2' />
              <span>({comments.length}) Ucapan</span>
            </h3>
          </motion.div>

          <div className='space-y-6'>
            {comments.length > 0 ? (
              comments.map((comment) => (
                <motion.div
                  key={comment._id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                  className='bg-amber-50 dark:bg-sky-950/50 rounded-lg shadow-sm p-6 border-l-4 border-amber-500 dark:border-sky-400/50'
                >
                  <div className='flex justify-between items-start mb-2'>
                    <h4
                      className={`font-extrabold ${getColorFromName(
                        comment.name
                      )}`}
                    >
                      {comment.name}
                    </h4>
                    <span className='text-xs text-gray-500 dark:text-sky-700'>
                      {formatDateToIndonesian(comment.createdAt)}
                    </span>
                  </div>
                  <p className='text-amber-800 dark:text-sky-200/50'>
                    {comment.message}
                  </p>
                </motion.div>
              ))
            ) : (
              <p className='text-center text-amber-800 dark:text-gray-300'>
                Belum ada ucapan. Jadilah yang pertama!
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ThankYouSection;
