import React from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

// This component creates floating hearts as decorative elements for the hero section
const HeartFrame: React.FC = () => {
  // Create an array of heart configs with different sizes, positions, and animations
  const heartConfigs = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    size: Math.floor(Math.random() * 20) + 15, // Random size between 15-35px
    left: `${Math.floor(Math.random() * 90) + 5}%`, // Random horizontal position
    top: `${Math.floor(Math.random() * 80) + 10}%`, // Random vertical position
    duration: Math.floor(Math.random() * 8) + 4, // Random animation duration
    delay: Math.random() * 2,
    opacity: Math.random() * 0.7 + 0.3, // Random opacity between 0.3-1
    rotate: Math.floor(Math.random() * 360), // Random initial rotation
  }));

  return (
    <>
      {heartConfigs.map((heart) => (
        <motion.div
          key={heart.id}
          className='absolute'
          style={{
            left: heart.left,
            top: heart.top,
          }}
          initial={{
            opacity: 0,
            y: 20,
            rotate: heart.rotate,
            scale: 0,
          }}
          animate={{
            opacity: heart.opacity,
            y: [0, -15, 0, -10, 0],
            rotate: [
              heart.rotate,
              heart.rotate + 10,
              heart.rotate - 10,
              heart.rotate,
            ],
            scale: 1,
          }}
          transition={{
            duration: heart.duration,
            delay: heart.delay,
            repeat: Infinity,
            repeatType: 'reverse',
          }}
        >
          <Heart
            size={heart.size}
            className='text-red-400 dark:text-sky-400 fill-red-100 dark:fill-sky-900/30'
          />
        </motion.div>
      ))}
    </>
  );
};

export default HeartFrame;
