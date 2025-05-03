'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X, Users } from 'lucide-react';
import useStore from '../store/useStore';

interface FormData {
  name: string;
  willAttend: string;
}

interface GuestEntry {
  _id: string;
  name: string;
  willAttend: string;
}

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const RsvpSection: React.FC = () => {
  const { recipientName } = useStore();

  const [formData, setFormData] = useState<FormData>({
    name: '',
    willAttend: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showGuestbook, setShowGuestbook] = useState(false);
  const [guestbook, setGuestbook] = useState<GuestEntry[]>([]);
  const [loadingGuestbook, setLoadingGuestbook] = useState(false);

  useEffect(() => {
    if (recipientName) {
      setFormData((prev) => ({ ...prev, name: recipientName }));
    }
  }, [recipientName]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const fetchGuestbook = async () => {
    setLoadingGuestbook(true);
    try {
      const res = await fetch(`${backendUrl}/api/rsvp`);
      if (!res.ok) {
        throw new Error('Gagal mengambil data buku tamu');
      }
      const data = await res.json();
      setGuestbook(data);
    } catch (error) {
      console.error('Error fetching guestbook:', error);
    } finally {
      setLoadingGuestbook(false);
    }
  };

  const toggleGuestbook = async () => {
    if (!showGuestbook) {
      await fetchGuestbook();
    }
    setShowGuestbook((prev) => !prev);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');

    if (!formData.name || !formData.willAttend) {
      setErrorMessage('Mohon lengkapi semua field yang wajib diisi.');
      setIsSubmitting(false);
      return;
    }

    try {
      const res = await fetch(`${backendUrl}/api/rsvp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.status === 409) {
        setErrorMessage('Kamu sudah pernah mengisi RSVP. Terima kasih!');
        setIsSubmitting(false);
        return;
      }

      if (!res.ok) {
        throw new Error('Gagal mengirim RSVP');
      }

      setIsSubmitted(true);
      await fetchGuestbook();
    } catch (error) {
      console.error(error);
      setErrorMessage('Gagal mengirimkan RSVP. Silakan coba lagi.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className='py-20 bg-amber-100 dark:bg-gray-900' id='rsvp'>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className='text-center mb-12 relative z-10'
      >
        <h2 className='text-4xl font-bold text-amber-900 dark:text-sky-400 mb-4'>
          RSVP
        </h2>
        <div className='w-16 h-1 bg-amber-900 dark:bg-sky-400 mx-auto mb-8'></div>
        <p className='text-amber-800 dark:text-sky-200 max-w-2xl mx-auto'>
          Mohon isi form dibawah ini untuk melakukan konfirmasi kehadiran.
        </p>
      </motion.div>

      <div className='container mx-auto px-4 relative'>
        <div className='max-w-2xl mx-auto relative z-10'>
          {isSubmitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className='bg-white dark:bg-sky-950 rounded-lg p-8 text-center text-amber-900 dark:text-sky-200'
            >
              <div className='w-16 h-16 rounded-full bg-green-100 dark:bg-sky-800 flex items-center justify-center mx-auto mb-4'>
                <Check size={32} className='text-green-600 dark:text-sky-500' />
              </div>
              <h3 className='text-2xl font-bold mb-4 text-white dark:text-sky-400'>
                Terima kasih!
              </h3>
              <p className='text-amber-800 dark:text-sky-200 max-w-2xl mx-auto'>
                RSVP berhasil dikirim. Status konfirmasi disimpan dalam buku
                tamu!
              </p>
            </motion.div>
          ) : (
            <motion.form
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              onSubmit={handleSubmit}
              className='bg-amber-50 dark:bg-sky-950 rounded-lg p-8 shadow-xl text-amber-900 dark:text-sky-200'
            >
              {errorMessage && (
                <div className='mb-6 p-4 bg-red-100 dark:bg-red-900 border-l-4 border-red-500 text-red-700 dark:text-red-300'>
                  <div className='flex'>
                    <X size={20} className='mr-2' />
                    <p>{errorMessage}</p>
                  </div>
                </div>
              )}

              <div className='mb-6'>
                <label
                  htmlFor='name'
                  className='block text-amber-800 dark:text-sky-300 text-sm font-medium mb-2'
                >
                  Nama Lengkap <span className='text-red-500'>*</span>
                </label>
                <input
                  type='text'
                  id='name'
                  name='name'
                  value={formData.name}
                  onChange={handleChange}
                  required
                  readOnly={!!recipientName}
                  className='w-full px-4 py-2 border border-amber-300 dark:border-sky-600 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 dark:focus:ring-sky-400 dark:bg-sky-950 dark:text-sky-200 disabled:opacity-60'
                  placeholder='Nama'
                />
              </div>

              <div className='mb-6'>
                <label
                  htmlFor='willAttend'
                  className='block text-amber-800 dark:text-sky-300 text-sm font-medium mb-2'
                >
                  Apakah Anda akan hadir?{' '}
                  <span className='text-red-500'>*</span>
                </label>
                <select
                  id='willAttend'
                  name='willAttend'
                  value={formData.willAttend}
                  onChange={handleChange}
                  required
                  className='w-full px-4 py-2 border bg-white border-amber-300 dark:border-sky-600 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 dark:focus:ring-sky-400 dark:bg-sky-950 dark:text-sky-200'
                >
                  <option value=''>Pilih salah satu</option>
                  <option value='yes'>Ya, saya akan hadir</option>
                  <option value='no'>Maaf, saya tidak bisa hadir</option>
                </select>
              </div>

              <div className='text-center mt-6'>
                <button
                  type='submit'
                  disabled={isSubmitting}
                  className='inline-flex items-center px-6 py-3 bg-amber-700 text-white dark:text-sky-200 font-semibold rounded-md shadow-md hover:bg-amber-600 dark:bg-sky-700 dark:hover:bg-sky-600 focus:outline-none focus:ring-2 transition'
                >
                  {isSubmitting ? 'Mengirim...' : 'Kirim RSVP'}
                </button>
              </div>
            </motion.form>
          )}

          <div className='text-center mt-8'>
            <button
              type='button'
              onClick={toggleGuestbook}
              className='inline-flex items-center px-5 py-2 bg-amber-700 text-white dark:text-sky-200 font-semibold rounded-md shadow hover:bg-amber-800 dark:bg-sky-700 dark:hover:bg-sky-600 transition mt-2'
            >
              <Users size={20} className='mr-2' />
              {showGuestbook ? 'Tutup Buku Tamu' : 'Lihat Buku Tamu'}
            </button>
          </div>

          <AnimatePresence>
            {showGuestbook && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.5 }}
                className='overflow-hidden mt-4'
              >
                {loadingGuestbook ? (
                  <p className='text-center text-amber-800 dark:text-sky-300 mt-4'>
                    Memuat buku tamu...
                  </p>
                ) : guestbook.length > 0 ? (
                  <div className='overflow-y-auto max-h-64 mt-4 rounded-md border border-amber-900 dark:border-sky-700'>
                    <table className='w-full text-sm'>
                      <thead>
                        <tr className='bg-amber-900 dark:bg-sky-950 text-white dark:text-sky-200 font-extrabold opacity-90 border-b dark:last:border-sky-400'>
                          <th className='py-2 px-3 text-center'>No.</th>
                          <th className='py-2 px-3 text-center'>Nama</th>
                          <th className='py-2 px-3 text-center'>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {guestbook.map((entry, index) => (
                          <tr
                            key={entry._id}
                            className={`${
                              index % 2 === 0
                                ? 'bg-gray-50 dark:bg-sky-900'
                                : 'bg-amber-50 dark:bg-sky-800'
                            } border-b border-amber-200 dark:border-sky-700 last:border-none opacity-90`}
                          >
                            <td className='py-2 px-3 text-center text-amber-800 dark:text-sky-200'>
                              {index + 1}
                            </td>
                            <td className='py-2 px-3 text-center text-amber-800 dark:text-sky-200'>
                              {entry.name}
                            </td>
                            <td className='py-2 px-3 text-center text-amber-800 dark:text-sky-200'>
                              {entry.willAttend === 'yes'
                                ? 'Hadir'
                                : 'Tidak Hadir'}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <p className='text-center text-amber-800 dark:text-sky-300 mt-4'>
                    Buku tamu masih kosong
                  </p>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default RsvpSection;
