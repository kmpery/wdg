'use client';

import type React from 'react';
import { useState, useEffect } from 'react';
import { Parallax } from 'react-parallax';
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
      bgImage='https://images.pexels.com/photos/19861141/pexels-photo-19861141.jpeg'
      bgImageAlt='Wedding background with wisteria'
      strength={300}
      className='h-screen'
    >
      <div className='h-screen flex items-center justify-center relative'>
        <div className='absolute'></div>

        <div className='z-10 flex flex-col md:flex-row items-center justify-center max-w-6xl mx-auto px-4 gap-6 md:gap-12'>
          {/* Ornate Frame with Photo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.2 }}
            className='relative mb-8 md:mb-0'
          >
            <div className='w-64 h-64 md:w-96 md:h-96 relative'>
              {/* SVG Decorative Frame */}
              <svg className='absolute w-full h-full' viewBox='0 0 400 400'>
                {/* Outer decorative circle with animation */}
                <motion.circle
                  cx='200'
                  cy='200'
                  r='190'
                  fill='none'
                  stroke='url(#goldGradient)'
                  strokeWidth='2'
                  strokeDasharray='15,10'
                  initial={{ rotate: 0 }}
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 120,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: 'linear',
                  }}
                />

                {/* Decorative elements around the circle */}
                {[...Array(12)].map((_, i) => (
                  <motion.g
                    key={i}
                    transform={`rotate(${i * 30} 200 200) translate(200 30)`}
                    initial={{ scale: 0.8, opacity: 0.6 }}
                    animate={{
                      scale: [0.8, 1, 0.8],
                      opacity: [0.6, 1, 0.6],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Number.POSITIVE_INFINITY,
                      delay: i * 0.3,
                      ease: 'easeInOut',
                    }}
                  >
                    <path
                      d='M0,0 L5,10 L0,20 L-5,10 Z'
                      // fill='url(#goldGradient)'
                      opacity='0.8'
                    />
                  </motion.g>
                ))}

                {/* Elegant floral corner decorations */}
                {[45, 135, 225, 315].map((angle, i) => (
                  <motion.g
                    key={`corner-${i}`}
                    transform={`rotate(${angle} 200 200) translate(240 0)`}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 1.5, delay: 0.8 + i * 0.2 }}
                  >
                    <path
                      d='M0,0 C10,-15 20,-10 15,0 C25,-5 30,5 20,10 C30,15 25,25 15,20 C20,30 10,35 0,25 C-10,35 -20,30 -15,20 C-25,25 -30,15 -20,10 C-30,5 -25,-5 -15,0 C-20,-10 -10,-15 0,0 Z'
                      fill='url(#goldGradient)'
                      opacity='0.7'
                    />
                  </motion.g>
                ))}

                {/* Gradient definitions */}
                <defs>
                  <linearGradient
                    id='goldGradient'
                    x1='0%'
                    y1='0%'
                    x2='100%'
                    y2='100%'
                  >
                    <stop offset='0%' stopColor='#f9d29d' />
                    <stop offset='50%' stopColor='#eac786' />
                    <stop offset='100%' stopColor='#d4af37' />
                  </linearGradient>
                </defs>
              </svg>

              {/* Ornate border with gradient and decorative elements */}
              <div className='absolute inset-0 bg-gradient-to-br from-amber-100/90 via-amber-200/90 to-amber-300/90 rounded-full border-[12px] border-amber-200/80 shadow-xl overflow-hidden transform -rotate-3'>
                {/* Inner decorative ring */}
                <div className='absolute inset-0 rounded-full border-[8px] border-amber-100/40'></div>

                {/* Couple photo */}
                <img
                  src='https://images.pexels.com/photos/1415131/pexels-photo-1415131.jpeg'
                  alt='Wedding Couple'
                  className='w-full h-full object-cover scale-110'
                />

                {/* Subtle overlay gradient */}
                <div className='absolute inset-0 bg-gradient-to-t from-amber-500/20 to-transparent'></div>
              </div>

              {/* Animated decorative elements */}
              <motion.div
                className='absolute -top-8 -right-8 text-amber-200 text-6xl filter drop-shadow-lg'
                initial={{ rotate: 0, scale: 0.8 }}
                animate={{
                  rotate: 360,
                  scale: [0.8, 1.1, 0.8],
                }}
                transition={{
                  rotate: {
                    duration: 20,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: 'linear',
                  },
                  scale: {
                    duration: 4,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: 'easeInOut',
                  },
                }}
              >
                ✦
              </motion.div>
              <motion.div
                className='absolute -bottom-8 -left-8 text-amber-200 text-6xl filter drop-shadow-lg'
                initial={{ rotate: 0, scale: 0.8 }}
                animate={{
                  rotate: -360,
                  scale: [0.8, 1.1, 0.8],
                }}
                transition={{
                  rotate: {
                    duration: 20,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: 'linear',
                  },
                  scale: {
                    duration: 4,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: 'easeInOut',
                    delay: 1,
                  },
                }}
              >
                ✦
              </motion.div>

              {/* Additional smaller decorative elements */}
              <motion.div
                className='absolute top-1/4 -right-4 text-amber-200 text-3xl filter drop-shadow-lg'
                animate={{
                  opacity: [0.4, 1, 0.4],
                  scale: [0.8, 1, 0.8],
                }}
                transition={{
                  duration: 3,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: 'easeInOut',
                  delay: 0.5,
                }}
              >
                ✧
              </motion.div>
              <motion.div
                className='absolute bottom-1/4 -left-4 text-amber-200 text-3xl filter drop-shadow-lg'
                animate={{
                  opacity: [0.4, 1, 0.4],
                  scale: [0.8, 1, 0.8],
                }}
                transition={{
                  duration: 3,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: 'easeInOut',
                  delay: 1.5,
                }}
              >
                ✧
              </motion.div>
            </div>
          </motion.div>

          {/* Invitation Content */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className='z-10 px-8 py-12 relative overflow-hidden rounded-lg shadow-2xl max-w-lg'
            style={{
              background:
                'linear-gradient(135deg, rgba(255,248,240,0.95) 0%, rgba(255,243,224,0.9) 50%, rgba(253,230,190,0.85) 100%)',
            }}
          >
            {/* Decorative background patterns */}
            <div className='absolute inset-0 opacity-10'>
              <svg
                width='100%'
                height='100%'
                xmlns='http://www.w3.org/2000/svg'
              >
                <pattern
                  id='pattern-circles'
                  x='0'
                  y='0'
                  width='40'
                  height='40'
                  patternUnits='userSpaceOnUse'
                  patternContentUnits='userSpaceOnUse'
                >
                  <circle
                    id='pattern-circle'
                    cx='20'
                    cy='20'
                    r='3.5'
                    fill='#b45309'
                  />
                </pattern>
                <rect
                  x='0'
                  y='0'
                  width='100%'
                  height='100%'
                  fill='url(#pattern-circles)'
                />
              </svg>
            </div>

            {/* Decorative corner flourishes */}
            <div className='absolute top-0 left-0 w-16 h-16 opacity-30'>
              <svg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'>
                <path
                  d='M0,0 C30,10 40,30 30,50 C50,40 70,50 80,80 C50,70 30,50 10,80 C30,50 10,30 0,0 Z'
                  fill='#b45309'
                />
              </svg>
            </div>
            <div className='absolute bottom-0 right-0 w-16 h-16 opacity-30 rotate-180'>
              <svg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'>
                <path
                  d='M0,0 C30,10 40,30 30,50 C50,40 70,50 80,80 C50,70 30,50 10,80 C30,50 10,30 0,0 Z'
                  fill='#b45309'
                />
              </svg>
            </div>
            <div className='text-center'>
              <h3 className='text-lg text-amber-800 dark:text-sky-400 font-light relative z-10'>
                Undangan
              </h3>

              <p className='text-amber-800 dark:text-sky-200 mb-2 relative z-10'>
                Kepada {pronoun}{' '}
                <span className='font-semibold'>{recipientName}</span>,
              </p>

              <motion.h1
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className='text-4xl md:text-6xl font-serif font-bold text-amber-900 dark:text-sky-100 mb-2 relative z-10'
              >
                Alim{' '}
                <span className='font-light text-amber-700 dark:text-sky-300'>
                  &
                </span>{' '}
                Risa
              </motion.h1>

              <div className='w-16 h-1 bg-gradient-to-r from-amber-600 via-amber-800 to-amber-600 dark:from-sky-400 dark:via-sky-300 dark:to-sky-400 mx-auto my-6 relative z-10'></div>

              <p className='text-amber-800 dark:text-sky-200 mb-2 relative z-10'>
                Akan melangsungkan resepsi pernikahan dalam:
              </p>
            </div>

            <div className='relative z-10'>
              <CountdownTimer targetDate={weddingDate} />
            </div>

            <motion.button
              onClick={handleOpenInvitation}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className='mt-8 bg-gradient-to-r from-amber-700 via-amber-800 to-amber-700 text-white dark:from-sky-800 dark:via-sky-700 dark:to-sky-800 dark:text-sky-200 px-6 py-3 rounded-full flex items-center justify-center mx-auto transition-all duration-300 hover:from-amber-800 hover:to-amber-900 dark:hover:from-sky-700 dark:hover:to-sky-600 shadow-lg relative z-10'
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
      </div>
    </Parallax>
  );
};

export default HeroSection;
