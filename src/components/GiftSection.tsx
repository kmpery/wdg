import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  MdOutlineFileCopy,
  MdOutlineInventory,
  MdOutlineCardGiftcard,
} from 'react-icons/md';

interface GiftOption {
  title: string; // untuk copy
  titleDisplay: React.ReactNode; // untuk tampilan
  icon: React.ReactNode;
  description: string;
  details?: string;
}

const GiftSection: React.FC = () => {
  const [copiedDetail, setCopiedDetail] = useState<string | null>(null);

  const giftOptions: GiftOption[] = [
    {
      title: 'bca',
      titleDisplay: (
        <div className='flex items-center justify-center gap-2'>
          <img
            src='/gifts/bca.png'
            alt='BCA'
            className='w-16 h-16 object-contain'
          />
        </div>
      ),
      icon: <MdOutlineCardGiftcard size={24} />,
      description: 'Risa Inda Sari',
      details: '7990360582',
    },
    {
      title: 'isaku',
      titleDisplay: (
        <div className='flex items-center justify-center gap-2'>
          <img
            src='/gifts/isaku.png'
            alt='i.saku'
            className='w-16 h-16 object-contain'
          />
        </div>
      ),
      icon: <MdOutlineCardGiftcard size={24} />,
      description: 'Risa Inda Sari',
      details: '085298614812',
    },
  ];

  const copyToClipboard = (text: string, detailType: string) => {
    navigator.clipboard.writeText(text);
    setCopiedDetail(detailType);

    setTimeout(() => {
      setCopiedDetail(null);
    }, 3000);
  };

  return (
    <section className='py-20 bg-amber-100 dark:bg-gray-900' id='gifts'>
      <div className='container mx-auto px-4'>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className='text-center mb-12'
        >
          <h2 className='text-4xl font-bold text-amber-900 dark:text-sky-400 mb-4'>
            Gifts
          </h2>
          <div className='w-16 h-1 bg-amber-800 dark:bg-sky-400 mx-auto mb-8'></div>
          <p className='text-amber-800 dark:text-sky-200 max-w-2xl mx-auto'>
            Doa restu Bapak/Ibu sekalian adalah karunia yang sangat berarti bagi
            kami. Jika Bapak/Ibu ingin memberikan tanda kasih, kami menyediakan
            pilihan pemberian kado secara cashless.
            <br />
            Terima kasih atas perhatian dan dukungannya.
          </p>
        </motion.div>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto'>
          {giftOptions.map((option, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className='bg-amber-50 dark:bg-sky-950 rounded-lg p-8 shadow-md'
            >
              <div className='w-16 h-16 text-amber-800 dark:text-sky-300 bg-amber-100 dark:bg-sky-800 rounded-full flex items-center justify-center mx-auto mb-6'>
                {option.icon}
              </div>
              <h3 className=' text-center mb-1'>{option.titleDisplay}</h3>
              <p className='text-amber-800 dark:text-sky-300 text-center mb-6'>
                {option.description}
              </p>

              {option.details && (
                <div className='bg-white dark:bg-sky-900 p-4 rounded-md border border-amber-200 dark:border-sky-700'>
                  <p className='text-amber-800 dark:text-sky-200 whitespace-pre-line text-center font-sans'>
                    {option.details}
                  </p>
                  <button
                    onClick={() =>
                      copyToClipboard(option.details ?? '', option.title)
                    }
                    className='mt-4 flex items-center justify-center text-amber-900 dark:text-sky-200 transition-colors duration-300 mx-auto'
                  >
                    {copiedDetail === option.title ? (
                      <>
                        <MdOutlineInventory size={24} />
                      </>
                    ) : (
                      <>
                        <MdOutlineFileCopy size={24} />
                      </>
                    )}
                  </button>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GiftSection;
