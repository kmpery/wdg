import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Send } from 'lucide-react';
import axios from 'axios';

interface Comment {
  _id: string;
  name: string;
  message: string;
  createdAt: string;
}

const API_BASE_URL = import.meta.env.VITE_BACKEND_URL; // ⬅️ Ambil dari .env

const ThankYouSection: React.FC = () => {
  const [commentName, setCommentName] = useState('');
  const [commentMessage, setCommentMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [comments, setComments] = useState<Comment[]>([]);

  useEffect(() => {
    fetchComments();
  }, []);

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
      setCommentName('');
      setCommentMessage('');
      fetchComments();
    } catch (error) {
      console.error('Gagal mengirim komentar:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getColorFromName = (name: string): string => {
    const colors = [
      'text-blue-600',
      'text-purple-600',
      'text-green-600',
      'text-red-600',
      'text-pink-600',
      'text-indigo-600',
    ];
    const hash = name
      .split('')
      .reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return colors[hash % colors.length];
  };

  const formatDateToIndonesian = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    };
    return new Date(dateString).toLocaleDateString('id-ID', options);
  };

  return (
    <section className='py-20 bg-amber-50' id='thankyou'>
      <div className='container mx-auto px-4'>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className='text-center mb-12'
        >
          <h2 className='text-4xl font-bold text-amber-900 mb-4'>Thank You</h2>
          <div className='w-16 h-1 bg-amber-800 mx-auto mb-8'></div>
          <p className='text-amber-800 max-w-2xl mx-auto'>
            Tinggalkan doa terbaik Anda untuk momen bahagia kami
          </p>
          <p className='text-amber-800 font-bold mt-4'>
            Salam cinta,
            <br />
            Nursalim & Risa Inda Sari
          </p>
        </motion.div>

        <div className='max-w-3xl mx-auto'>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className='bg-white rounded-lg shadow-md p-8 mb-8'
          >
            <h3 className='text-2xl font-semibold text-amber-900 mb-6'>
              Ucapan ({comments.length})
            </h3>
            <form onSubmit={handleSubmit}>
              <div className='mb-4'>
                <label
                  className='block text-amber-800 text-sm font-medium mb-2'
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
                  className='w-full px-4 py-2 border border-amber-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500'
                  placeholder='Isi Nama Anda'
                />
              </div>

              <div className='mb-6'>
                <label
                  className='block text-amber-800 text-sm font-medium mb-2'
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
                  className='w-full px-4 py-2 border border-amber-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500'
                  placeholder='Tulis Ucapan'
                ></textarea>
              </div>

              <button
                type='submit'
                disabled={isSubmitting}
                className={`flex items-center justify-center px-6 py-3 bg-amber-800 hover:bg-amber-900 text-white rounded-md transition-colors duration-300 ${
                  isSubmitting ? 'opacity-75 cursor-not-allowed' : ''
                }`}
              >
                <Send size={16} className='mr-2' />
                <span>{isSubmitting ? 'Mengirim...' : 'Kirim'}</span>
              </button>
            </form>
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
                  className='bg-white rounded-lg shadow-sm p-6 border-l-4 border-amber-500'
                >
                  <div className='flex justify-between items-start mb-2'>
                    <h4
                      className={`font-semibold ${getColorFromName(
                        comment.name
                      )}`}
                    >
                      {comment.name}
                    </h4>
                    <span className='text-xs text-gray-500'>
                      {formatDateToIndonesian(comment.createdAt)}
                    </span>
                  </div>
                  <p className='text-amber-800'>{comment.message}</p>
                </motion.div>
              ))
            ) : (
              <p className='text-center text-amber-800'>
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
