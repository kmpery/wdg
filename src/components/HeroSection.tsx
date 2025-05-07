import { useState, useEffect } from 'react';
import { Parallax } from 'react-parallax';
import { motion } from 'framer-motion';
import { Mail, MailOpen } from 'lucide-react';
import CountdownTimer from './CountdownTimer';
import useStore from '../store/useStore';
import { useSearchParams } from 'react-router-dom';
import OrnamentFrame from '../assets/ornament-frame.svg?react';

function HeroSection() {
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
      setRecipientName('');
      setGlobalRecipientName('');
      return;
    }

    const parts = recipientParam.toLowerCase().split('.');
    const title = parts[0];
    const name = parts.slice(1).join(' ');

    let prefix = '';
    if (title === 'bpk') prefix = 'Bpk :';
    else if (title === 'ibu') prefix = 'Ibu :';
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

  return (
    <Parallax
      blur={{ min: -15, max: 15 }}
      bgImage='hero/bg.png'
      bgImageAlt='Wedding background'
      strength={300}
      className='h-screen'
    >
      <div
        className='h-screen flex flex-col items-center justify-center text-center relative opacity-90'
        id='hero'
      >
        <div className='absolute inset-0 bg-black bg-opacity-40'></div>

        <motion.div
          initial={{ opacity: 0, y: 50, filter: 'blur(8px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 1.2 }}
          className='relative z-10 px-6 py-12 md:px-8 md:py-20 rounded-3xl shadow-xl max-w-2xl mx-6 md:mx-auto border backdrop-blur-md bg-gradient-to-br from-amber-50 to-amber-100 dark:from-sky-900 dark:to-sky-950 bg-opacity-90 overflow-hidden'
        >
          <OrnamentFrame
            className='absolute inset-0 w-full h-full z-0 pointer-events-none text-amber-800 dark:text-sky-300'
            style={{ transform: 'scale(1.2)' }}
            preserveAspectRatio='xMidYMid slice'
          />
          <div className='relative z-10 p-8 md:p-12'>
            {' '}
            <h3 className='text-lg text-amber-800 dark:text-sky-400 mb-4 font-light'>
              Undangan
            </h3>
            <p className='text-amber-800 dark:text-sky-200 mb-6'>
              Kepada {pronoun}{' '}
              <span className='font-semibold'>{recipientName}</span>,
            </p>
            <motion.h1
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className='text-4xl md:text-6xl font-serif font-bold text-amber-900 dark:text-sky-100 mb-2'
            >
              Alim{' '}
              <span className='font-light text-amber-700 dark:text-sky-300'>
                &
              </span>{' '}
              Risa
            </motion.h1>
            <div className='w-16 h-1 bg-amber-800 dark:bg-sky-300 mx-auto my-6'></div>
            <p className='text-amber-800 dark:text-sky-200 mb-6'>
              Akan melangsungkan resepsi pernikahan dalam :
            </p>
            <CountdownTimer targetDate={weddingDate} />
            <motion.button
              onClick={handleOpenInvitation}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className='mt-8 bg-amber-800 text-white dark:text-sky-200 px-6 py-3 rounded-full flex items-center justify-center mx-auto transition-all duration-300 hover:bg-amber-900 dark:bg-sky-700 dark:hover:bg-sky-600'
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
          </div>
        </motion.div>
      </div>
    </Parallax>
  );
}

export default HeroSection;
