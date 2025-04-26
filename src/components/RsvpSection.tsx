'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X, Users } from 'lucide-react';

interface FormData {
  name: string;
  phone: string;
  willAttend: string;
  numberOfGuests: number;
  message: string;
}

interface GuestEntry {
  _id: string;
  name: string;
  willAttend: string;
  numberOfGuests: number;
  message: string;
}

const RsvpSection: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    phone: '',
    willAttend: '',
    numberOfGuests: 1,
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const [showGuestbook, setShowGuestbook] = useState(false);
  const [guestbook, setGuestbook] = useState<GuestEntry[]>([]);
  const [loadingGuestbook, setLoadingGuestbook] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'numberOfGuests' ? parseInt(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');

    if (!formData.name || !formData.phone || !formData.willAttend) {
      setErrorMessage('Please fill out all required fields.');
      setIsSubmitting(false);
      return;
    }

    try {
      const res = await fetch('/api/rsvp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        throw new Error('Failed to submit RSVP');
      }

      setIsSubmitted(true);
    } catch (error) {
      console.error(error);
      setErrorMessage(
        'There was an error submitting your RSVP. Please try again.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const fetchGuestbook = async () => {
    setLoadingGuestbook(true);
    try {
      const res = await fetch('/api/rsvp', { method: 'GET' });
      if (!res.ok) {
        throw new Error('Failed to fetch guestbook');
      }
      const data = await res.json();
      setGuestbook(data);
      setShowGuestbook(true);
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingGuestbook(false);
    }
  };

  return (
    <section
      className='py-20 bg-amber-800 text-white'
      id='rsvp'
      style={{
        backgroundImage: `url("https://images.pexels.com/photos/1731710/pexels-photo-1731710.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2")`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className='container mx-auto px-4 relative'>
        <div className='absolute inset-0 bg-amber-900 bg-opacity-70'></div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className='text-center mb-12 relative z-10'
        >
          <h2 className='text-4xl font-bold text-white mb-4'>RSVP</h2>
          <div className='w-16 h-1 bg-amber-300 mx-auto mb-8'></div>
          <p className='text-amber-100 max-w-2xl mx-auto'>
            Please let us know if you'll be able to join us on our special day.
          </p>
        </motion.div>

        <div className='max-w-2xl mx-auto relative z-10'>
          {isSubmitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className='bg-white rounded-lg p-8 text-center text-amber-900'
            >
              <div className='w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4'>
                <Check size={32} className='text-green-600' />
              </div>
              <h3 className='text-2xl font-bold mb-4'>Thank You!</h3>
              <p>
                Your RSVP has been submitted successfully. We're excited to
                celebrate with you!
              </p>
            </motion.div>
          ) : (
            <motion.form
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              onSubmit={handleSubmit}
              className='bg-white rounded-lg p-8 shadow-xl text-amber-900'
            >
              {errorMessage && (
                <div className='mb-6 p-4 bg-red-100 border-l-4 border-red-500 text-red-700'>
                  <div className='flex'>
                    <X size={20} className='mr-2' />
                    <p>{errorMessage}</p>
                  </div>
                </div>
              )}

              {/* Form Fields */}
              <div className='mb-6'>
                <label
                  className='block text-amber-800 text-sm font-medium mb-2'
                  htmlFor='name'
                >
                  Full Name <span className='text-red-500'>*</span>
                </label>
                <input
                  type='text'
                  id='name'
                  name='name'
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className='w-full px-4 py-2 border border-amber-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500'
                  placeholder='Your name'
                />
              </div>

              <div className='mb-6'>
                <label
                  className='block text-amber-800 text-sm font-medium mb-2'
                  htmlFor='phone'
                >
                  Phone Number <span className='text-red-500'>*</span>
                </label>
                <input
                  type='tel'
                  id='phone'
                  name='phone'
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className='w-full px-4 py-2 border border-amber-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500'
                  placeholder='Your phone number'
                />
              </div>

              <div className='mb-6'>
                <label
                  className='block text-amber-800 text-sm font-medium mb-2'
                  htmlFor='willAttend'
                >
                  Will you attend? <span className='text-red-500'>*</span>
                </label>
                <select
                  id='willAttend'
                  name='willAttend'
                  value={formData.willAttend}
                  onChange={handleChange}
                  required
                  className='w-full px-4 py-2 border border-amber-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500'
                >
                  <option value=''>Please select</option>
                  <option value='yes'>Yes, I will attend</option>
                  <option value='no'>Sorry, I cannot attend</option>
                </select>
              </div>

              {formData.willAttend === 'yes' && (
                <div className='mb-6'>
                  <label
                    className='block text-amber-800 text-sm font-medium mb-2'
                    htmlFor='numberOfGuests'
                  >
                    Number of Guests
                  </label>
                  <input
                    type='number'
                    id='numberOfGuests'
                    name='numberOfGuests'
                    value={formData.numberOfGuests}
                    onChange={handleChange}
                    min='1'
                    max='5'
                    className='w-full px-4 py-2 border border-amber-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500'
                  />
                </div>
              )}

              <div className='mb-6'>
                <label
                  className='block text-amber-800 text-sm font-medium mb-2'
                  htmlFor='message'
                >
                  Message
                </label>
                <textarea
                  id='message'
                  name='message'
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className='w-full px-4 py-2 border border-amber-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500'
                  placeholder='Your message for the couple'
                ></textarea>
              </div>

              <button
                type='submit'
                disabled={isSubmitting}
                className={`w-full py-3 px-4 bg-amber-800 hover:bg-amber-900 text-white rounded-md transition-colors duration-300 ${
                  isSubmitting ? 'opacity-75 cursor-not-allowed' : ''
                }`}
              >
                {isSubmitting ? 'Submitting...' : 'Send RSVP'}
              </button>

              {/* Tombol lihat buku tamu */}
              <button
                type='button'
                onClick={fetchGuestbook}
                disabled={loadingGuestbook}
                className='w-full mt-4 py-3 px-4 flex items-center justify-center bg-amber-600 hover:bg-amber-700 text-white rounded-md transition-colors duration-300'
              >
                <Users className='mr-2' size={20} />
                {loadingGuestbook ? 'Loading...' : 'Lihat Buku Tamu'}
              </button>
            </motion.form>
          )}
        </div>

        {/* Daftar buku tamu */}
        <AnimatePresence>
          {showGuestbook && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.5 }}
              className='max-w-3xl mx-auto mt-12 bg-white rounded-lg p-8 text-amber-900 relative z-10'
            >
              <h3 className='text-2xl font-bold mb-6 text-center'>
                Guest Book
              </h3>
              <div className='space-y-6'>
                {guestbook.length === 0 ? (
                  <p className='text-center text-gray-600'>No guests yet.</p>
                ) : (
                  guestbook.map((guest) => (
                    <div key={guest._id} className='border-b pb-4'>
                      <h4 className='text-lg font-semibold'>{guest.name}</h4>
                      <p className='text-sm text-gray-700'>
                        {guest.willAttend === 'yes'
                          ? 'Will Attend'
                          : 'Cannot Attend'}{' '}
                        - Guests: {guest.numberOfGuests}
                      </p>
                      {guest.message && (
                        <p className='mt-2 text-gray-800'>“{guest.message}”</p>
                      )}
                    </div>
                  ))
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default RsvpSection;
