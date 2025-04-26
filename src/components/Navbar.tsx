import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
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
      const yOffset = -70; // tinggi navbar
      const y =
        element.getBoundingClientRect().top + window.pageYOffset + yOffset;

      window.scrollTo({ top: y, behavior: 'smooth' });

      setTimeout(() => {
        setIsMenuOpen(false);
      }, 500); // kasih delay 0.5 detik biar scroll smooth dulu baru close
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md' : 'bg-transparent'
      }`}
    >
      <div className='container mx-auto px-4'>
        <div className='flex items-center justify-between h-16'>
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className='text-2xl font-serif font-bold text-amber-900'
          >
            A&R
          </motion.h1>

          {/* Desktop Menu */}
          {isOpen && (
            <div className='hidden md:flex space-x-8'>
              {menuItems.map((item) => (
                <button
                  key={item.href}
                  onClick={() => scrollToSection(item.href)}
                  className={`text-amber-900 hover:text-amber-700 transition-colors duration-300 ${
                    isScrolled ? 'py-2' : 'py-1'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          )}

          {/* Mobile Menu Button */}
          {isOpen && (
            <button
              className='md:hidden text-amber-900'
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className='md:hidden bg-white border-t border-amber-100'
          >
            <div className='container mx-auto px-4 py-4'>
              {menuItems.map((item) => (
                <button
                  key={item.href}
                  onClick={() => scrollToSection(item.href)}
                  className='block w-full text-left py-3 text-amber-900 hover:text-amber-700 transition-colors duration-300'
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
