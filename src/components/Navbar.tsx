import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaRegHeart } from 'react-icons/fa';
import useStore from '../store/useStore';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isOpen = useStore((state) => state.isOpen);

  const menuItems = [
    { href: '#home', label: 'Home' },
    { href: '#event', label: 'Event' },
    { href: '#story', label: 'Story' },
    { href: '#gallery', label: 'Gallery' },
    { href: '#rsvp', label: 'RSVP' },
    { href: '#gifts', label: 'Gifts' },
    { href: '#thankyou', label: 'Lives' },
    {
      href: '#footer',
      label: (
        <div className='flex justify-center items-center'>
          <FaRegHeart size={16} className='text-red-400' />
        </div>
      ),
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      const yOffset = -70;
      const y =
        element.getBoundingClientRect().top + window.pageYOffset + yOffset;

      window.scrollTo({ top: y, behavior: 'smooth' });

      setTimeout(() => {
        setIsMenuOpen(false);
      }, 500);
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/30 backdrop-blur-lg shadow-md' : 'bg-transparent'
      }`}
    >
      <div className='container mx-auto px-4'>
        <div className='flex items-center justify-between h-16'>
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => scrollToSection('#hero')}
            className='text-2xl font-serif font-bold text-amber-900 hover:text-amber-700 cursor-pointer transition-all duration-300'
          >
            A
            <span className='inline-flex items-center align-middle mx-1'>
              <FaRegHeart size={16} className='text-red-400' />
            </span>
            R
          </motion.h1>

          {/* Desktop Menu */}
          {isOpen && (
            <div className='hidden md:flex space-x-8'>
              {menuItems.map((item) => (
                <button
                  key={item.href}
                  onClick={() => scrollToSection(item.href)}
                  className='text-amber-900 hover:text-amber-700 transition-colors duration-300 py-2'
                >
                  {item.label}
                </button>
              ))}
            </div>
          )}

          {/* Mobile Menu Button */}
          {isOpen && (
            <button
              className='relative w-10 h-10 flex flex-col justify-center items-center md:hidden'
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <span
                className={`absolute block w-6 h-0.5 bg-amber-900 transition-all duration-300 ease-in-out ${
                  isMenuOpen ? 'rotate-45' : '-translate-y-1.5'
                }`}
              ></span>
              <span
                className={`absolute block w-6 h-0.5 bg-amber-900 transition-all duration-300 ease-in-out ${
                  isMenuOpen ? '-rotate-45' : 'translate-y-1.5'
                }`}
              ></span>
            </button>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
            className='absolute top-16 left-0 right-0 bg-white/80 backdrop-blur-lg rounded-b-3xl shadow-lg md:hidden'
          >
            <div className='container mx-auto px-4 py-8'>
              {menuItems.map((item) => (
                <button
                  key={item.href}
                  onClick={() => scrollToSection(item.href)}
                  className='block w-full text-center py-4 text-lg font-extrabold text-amber-900 hover:text-amber-500 transition-colors duration-300'
                >
                  {item.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
