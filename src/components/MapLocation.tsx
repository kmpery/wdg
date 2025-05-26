import React from 'react';
import { motion } from 'framer-motion';

interface MapLocationProps {
  mapSrc: string;
  googleMapsUrl: string;
}

const MapLocation: React.FC<MapLocationProps> = ({ mapSrc, googleMapsUrl }) => {
  return (
    <div className='bg-amber-50 dark:bg-sky-950 rounded-lg shadow-lg overflow-hidden'>
      <div className='h-96 w-full'>
        <iframe
          src={mapSrc}
          width='100%'
          height='100%'
          style={{ border: 0 }}
          allowFullScreen={false}
          loading='lazy'
          referrerPolicy='no-referrer-when-downgrade'
          title='Wedding Location'
          className='w-full h-full'
        ></iframe>
      </div>
      <div className='p-4 text-center'>
        <motion.a
          href={googleMapsUrl}
          target='_blank'
          rel='noopener noreferrer'
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className='inline-flex items-center justify-center px-4 py-1 bg-amber-900 text-white rounded-md hover:bg-amber-800 transition-colors duration-300 dark:bg-sky-800 dark:text-sky-100 dark:hover:bg-sky-600'
        >
          <span className='mr-2'>Open in Google Maps</span>
        </motion.a>
      </div>
    </div>
  );
};

export default MapLocation;
