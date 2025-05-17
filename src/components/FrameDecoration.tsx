import React from 'react';

const FrameDecoration = () => (
  <svg
    viewBox='0 0 512 512'
    className='absolute inset-0 w-full h-full text-amber-300 dark:text-sky-800 opacity-20 pointer-events-none z-0'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
  >
    {/* Contoh isi SVG. Anda bisa ganti path sesuai frame.svg Anda */}
    <rect
      x='10'
      y='10'
      width='492'
      height='492'
      rx='30'
      stroke='currentColor'
      strokeWidth='20'
    />
    <circle
      cx='256'
      cy='256'
      r='220'
      stroke='currentColor'
      strokeWidth='8'
      strokeDasharray='10 20'
    />
  </svg>
);

export default FrameDecoration;
