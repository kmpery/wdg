import React from 'react';
import { ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';

const MapLocation: React.FC = () => {
  const mapSrc =
    'https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3972.9264102669254!2d119.43295707498312!3d-5.274165994703939!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zNcKwMTYnMjcuMCJTIDExOcKwMjYnMDcuOSJF!5e0!3m2!1sid!2sid!4v1744434675941!5m2!1sid!2sid';

  const googleMapsUrl = 'https://maps.app.goo.gl/4kw6z5nDqvNiNxFw9';

  return (
    <div className='bg-amber-50 dark:bg-neutral-800 rounded-lg shadow-lg overflow-hidden'>
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
          className='inline-flex items-center justify-center px-6 py-3 bg-amber-800 text-white rounded-full hover:bg-amber-900 transition-colors duration-300 dark:bg-white dark:text-black dark:hover:bg-neutral-300'
        >
          <ExternalLink size={16} className='mr-2' />
          <span>View Map</span>
        </motion.a>
      </div>
    </div>
  );
};

export default MapLocation;
