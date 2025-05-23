'use client';

import type React from 'react';
import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import HomeSection from '../components/HomeSection';
import EventSection from '../components/EventSection';
import StorySection from '../components/StorySection';
import GallerySection from '../components/GallerySection';
import RsvpSection from '../components/RsvpSection';
import GiftSection from '../components/GiftSection';
import ThankYouSection from '../components/ThankYouSection';
import Footer from '../components/Footer';

import useStore from '../store/useStore';

const HomePage: React.FC = () => {
  const isOpen = useStore((state) => state.isOpen);

  // Lock scroll before invitation is opened
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'auto' : 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  return (
    <div className='min-h-screen bg-cream dark:bg-gray-900 text-amber-900 dark:text-white font-serif transition-colors duration-300'>
      {/* Hero section is always visible */}
      <HeroSection />

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
          >
            <Navbar />
            <HomeSection />
            <EventSection />
            <StorySection />
            <GallerySection />
            <RsvpSection />
            <GiftSection />
            <ThankYouSection />
            <Footer />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default HomePage;
