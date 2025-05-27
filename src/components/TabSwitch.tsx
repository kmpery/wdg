import React from 'react';
import { motion } from 'framer-motion';

interface TabSwitchProps {
  activeTab: 'wanita' | 'pria';
  onChange: (tab: 'wanita' | 'pria') => void;
}

const TabSwitch: React.FC<TabSwitchProps> = ({ activeTab, onChange }) => {
  return (
    <div className='relative flex hidden items-center justify-center mx-auto w-64 h-12 bg-amber-100 dark:bg-sky-950 rounded-full p-1 cursor-pointer shadow-md '>
      {/* Background slider */}
      <motion.div
        className='absolute top-1 bottom-1 w-[calc(50%-4px)] rounded-full bg-amber-900 dark:bg-sky-700'
        animate={{
          left: activeTab === 'wanita' ? '2px' : 'calc(50% + 2px)',
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      />

      {/* Buttons */}
      <div className='relative flex w-full h-full'>
        <button
          onClick={() => onChange('wanita')}
          className={`flex-1 rounded-full flex items-center justify-center text-sm font-medium z-10 transition-colors duration-200
            ${
              activeTab === 'wanita'
                ? 'text-white'
                : 'text-amber-800 dark:text-sky-200'
            }`}
        >
          Mempelai Wanita
        </button>
        <button
          onClick={() => onChange('wanita')} //lock
          className={`flex-1 rounded-full flex items-center justify-center text-sm font-medium z-10 transition-colors duration-200
            ${
              activeTab === 'pria'
                ? 'text-white'
                : 'text-amber-800 dark:text-sky-200'
            }`}
        >
          Mempelai Pria
        </button>
      </div>
    </div>
  );
};

export default TabSwitch;
