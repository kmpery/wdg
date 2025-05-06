import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mail, MailOpen } from 'lucide-react';
import CountdownTimer from './CountdownTimer';
import useStore from '../store/useStore';
import { useSearchParams } from 'react-router-dom';

const HeroSection: React.FC = () => {
  const {
    isOpen,
    setIsOpen,
    setRecipientName: setGlobalRecipientName,
  } = useStore();
  const [searchParams] = useSearchParams();
  const recipientParam = searchParams.get('to') || '';

  const [pronoun, setPronoun] = useState('Bapak/Ibu/Saudara/i');
  const [recipientName, setRecipientName] = useState('');

  useEffect(() => {
    if (!recipientParam) {
      setPronoun('Bapak/Ibu/Saudara/i');
      setGlobalRecipientName('');
      setRecipientName('');
      return;
    }

    const parts = recipientParam.toLowerCase().split('.');
    const title = parts[0];
    const name = parts.slice(1).join(' ');

    let prefix = '';
    if (title === 'bpk') prefix = name ? 'Bpk :' : 'Bpk';
    else if (title === 'ibu') prefix = name ? 'Ibu :' : 'Ibu';
    else if (title === 'sda' || title === 'sdra') prefix = 'Saudara :';
    else if (title === 'sdi' || title === 'sdri') prefix = 'Saudari :';
    else prefix = '';

    const capitalizedName = name
      .split(' ')
      .map((n) => n.charAt(0).toUpperCase() + n.slice(1))
      .join(' ');

    setPronoun(prefix || 'Bapak/Ibu/Saudara/i');
    setRecipientName(capitalizedName);
    setGlobalRecipientName(capitalizedName);
  }, [recipientParam, setGlobalRecipientName]);

  const weddingDate = new Date('June 18, 2025 09:30:00');

  useEffect(() => {
    if (isOpen) {
      const timeout = setTimeout(() => {
        const homeSection = document.getElementById('home');
        if (homeSection) {
          homeSection.scrollIntoView({ behavior: 'smooth' });
        }
      }, 500);

      return () => clearTimeout(timeout);
    }
  }, [isOpen]);

  const handleOpenInvitation = () => {
    setIsOpen(true);
  };

  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const html = document.documentElement;

    const checkDarkMode = () => {
      setIsDarkMode(html.classList.contains('dark'));
    };

    checkDarkMode(); // inisialisasi awal

    const observer = new MutationObserver(() => {
      checkDarkMode(); // update saat class berubah
    });

    observer.observe(html, { attributes: true, attributeFilter: ['class'] });

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id='hero'
      className='min-h-screen w-full flex flex-col md:flex-row text-center bg-cover bg-center bg-repeat bg-amber-100 dark:bg-gray-800'
      style={{
        backgroundImage: isDarkMode
          ? "url('/hero/bg-dark-1.png')"
          : "url('/hero/bg-light-1.png')",
      }}
    >
      {/* Gambar & Konten dalam 1 kolom (untuk layar kecil) */}
      <div className='flex-1 flex flex-col items-center justify-center md:justify-center pt-6 md:pt-0'>
        {/* Konten */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className='w-[80%] max-w-md bg-amber-50 bg-opacity-90 dark:bg-gray-900 dark:bg-opacity-90 rounded-lg shadow-2xl p-6 mb-10'
        >
          <h3 className='text-lg text-amber-800 dark:text-sky-400 mb-4 font-light'>
            Undangan
          </h3>

          <p className='text-amber-800 dark:text-sky-200 mb-4'>
            Kepada {pronoun}{' '}
            <span className='font-semibold'>{recipientName}</span>,
          </p>

          <motion.h1
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className='text-4xl md:text-5xl font-serif font-bold text-amber-900 dark:text-sky-100 mb-2'
          >
            Alim{' '}
            <span className='font-light text-amber-700 dark:text-sky-300'>
              &
            </span>{' '}
            Risa
          </motion.h1>

          <div className='w-16 h-1 bg-amber-800 dark:bg-sky-300 mx-auto my-4'></div>

          <p className='text-amber-800 dark:text-sky-200 mb-4'>
            Akan melangsungkan resepsi pernikahan dalam:
          </p>

          <CountdownTimer targetDate={weddingDate} />

          <motion.button
            onClick={handleOpenInvitation}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className='mt-6 bg-amber-800 text-white dark:text-sky-200 px-6 py-3 rounded-full flex items-center justify-center mx-auto transition-all duration-300 hover:bg-amber-900 dark:bg-sky-700 dark:hover:bg-sky-600'
          >
            {isOpen ? (
              <>
                <MailOpen className='mr-2' size={20} />
                <span>Di Buka</span>
              </>
            ) : (
              <>
                <Mail className='mr-2' size={20} />
                <span>Buka Undangan</span>
              </>
            )}
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
