import React from 'react';
import { FaLinkedin, FaInstagram, FaRegHeart, FaGithub } from 'react-icons/fa';

const Footer: React.FC = () => {
  return (
    <footer
      className='py-8 bg-amber-900 text-amber-100 dark:bg-gray-950 dark:text-sky-200'
      id='footer'
    >
      <div className='container mx-auto px-4'>
        <div className='flex justify-center space-x-8 mb-8'>
          <a
            href='https://www.instagram.com/perrikembali?igsh=MWlyNXFxcWN2bzJxYg%3D%3D&utm_source=qr'
            target='_blank'
            rel='noopener noreferrer'
            className='transition-colors duration-300 hover:text-red-400 dark:hover:text-sky-400'
          >
            <FaInstagram size={24} />
          </a>
          <a
            href='https://github.com/kmpery'
            target='_blank'
            className='transition-colors duration-300 hover:text-red-400 dark:hover:text-sky-400'
          >
            <FaGithub size={24} />
          </a>
          <a
            href='https://www.linkedin.com/in/km-pery-permana-327552200/'
            target='_blank'
            className='transition-colors duration-300 hover:text-red-400 dark:hover:text-sky-400'
          >
            <FaLinkedin size={24} />
          </a>
        </div>

        <div className='text-center'>
          <p className='flex items-center justify-center'>
            Design by{' '}
            <FaRegHeart
              size={16}
              className='mx-2 text-red-400 dark:text-sky-400'
            />
            <a
              className='transition-colors duration-300 hover:text-red-400 dark:hover:text-sky-400'
              href=''
              target='_blank'
            >
              @kmpery
            </a>
          </p>
          <p className='mt-4 text-sm opacity-75'>
            &copy; {new Date().getFullYear()} wdg . All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
