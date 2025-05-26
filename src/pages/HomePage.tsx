'use client';

import type React from 'react';
import { useEffect, useState } from 'react';
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
import TabSwitch from '../components/TabSwitch';

import useStore from '../store/useStore';

const HomePage: React.FC = () => {
  const isOpen = useStore((state) => state.isOpen);
  const [activeTab, setActiveTab] = useState<'wanita' | 'pria'>('wanita');

  // Lock scroll before invitation is opened
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'auto' : 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  const handleTabChange = (tab: 'wanita' | 'pria') => {
    setActiveTab(tab);
  };

  return (
    <div className='min-h-screen bg-cream dark:bg-gray-900 text-amber-900 dark:text-white font-serif transition-colors duration-300'>
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

            {/* Tab Switch */}
            <div className='flex justify-center my-8'>
              <TabSwitch activeTab={activeTab} onChange={handleTabChange} />
            </div>

            {/* Dynamic Sections */}
            <EventSection activeTab={activeTab} />
            <StorySection />
            <GallerySection />
            <RsvpSection />
            <GiftSection activeTab={activeTab} />
            <ThankYouSection />
            <Footer />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default HomePage;
