import React, { useState, useRef, useEffect } from 'react';
import { Music, Pause } from 'lucide-react';
import { motion } from 'framer-motion';
import useStore from '../store/useStore';

const AudioPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const isOpen = useStore((state) => state.isOpen);

  // Path file audio
  const audioSrc = '/audio/01 Sammy Simorangkir Tulang Rusuk(1).mp3';

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio
        .play()
        .then(() => setIsPlaying(true))
        .catch((error) => console.error('Audio play gagal:', error));
    }
  };

  // Auto-play saat undangan dibuka dan audio siap
  useEffect(() => {
    const audio = audioRef.current;
    if (isOpen && audio) {
      const handleCanPlay = () => {
        audio
          .play()
          .then(() => setIsPlaying(true))
          .catch((error) => console.error('Audio play gagal:', error));
      };

      audio.addEventListener('canplaythrough', handleCanPlay);

      return () => {
        audio.removeEventListener('canplaythrough', handleCanPlay);
      };
    }
  }, [isOpen]);

  return (
    <div>
      <audio ref={audioRef} src={audioSrc} loop preload='auto' />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className='fixed bottom-4 right-4 z-50 transform translate-x-0 translate-y-0'
      >
        <motion.button
          onClick={togglePlay}
          animate={{ rotate: isPlaying ? 360 : 0 }}
          transition={{
            duration: 2,
            repeat: isPlaying ? Infinity : 0,
            ease: 'linear',
          }}
          className='flex items-center justify-center w-14 h-14 bg-amber-800 text-white rounded-full shadow-lg hover:bg-amber-900 transition-colors duration-300'
        >
          {isPlaying ? (
            <>
              <Pause size={20} />
              <span className='sr-only'>Pause</span>
            </>
          ) : (
            <>
              <Music size={20} />
              <span className='sr-only'>Play</span>
            </>
          )}
        </motion.button>
      </motion.div>
    </div>
  );
};

export default AudioPlayer;
