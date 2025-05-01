import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Gift, Copy, Check } from 'lucide-react';

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
      icon: <Gift size={24} />,
      description: 'Risa Inda Sari',
      details: '799036058',
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
      icon: <Gift size={24} />,
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
    <section className='py-20 bg-amber-100' id='gifts'>
      <div className='container mx-auto px-4'>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className='text-center mb-12'
        >
          <h2 className='text-4xl font-bold text-amber-900 mb-4'>Gifts</h2>
          <div className='w-16 h-1 bg-amber-800 mx-auto mb-8'></div>
          <p className='text-amber-800 max-w-2xl mx-auto'>
            Doa restu Bapak/Ibu sekalian merupakan karunia yang sangat berarti
            bagi kami. Dan jika memberi merupakan ungkapan tanda kasih,
            Bapak/Ibu dapat memberi kado secara cashless.
            <br />
            Terima kasih
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
              className='bg-amber-50 rounded-lg p-8 shadow-md'
            >
              <div className='w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6'>
                {option.icon}
              </div>
              <h3 className='text-2xl font-semibold text-amber-900 text-center mb-4'>
                {option.titleDisplay}
              </h3>
              <p className='text-amber-800 text-center mb-6'>
                {option.description}
              </p>

              {option.details && (
                <div className='bg-white p-4 rounded-md border border-amber-200'>
                  <p className='text-amber-800 whitespace-pre-line text-center font-mono'>
                    {option.details}
                  </p>
                  <button
                    onClick={() =>
                      copyToClipboard(option.details ?? '', option.title)
                    }
                    className='mt-4 flex items-center justify-center px-4 py-2 bg-amber-700 text-white rounded-md hover:bg-amber-800 transition-colors duration-300 mx-auto'
                  >
                    {copiedDetail === option.title ? (
                      <>
                        <Check size={16} className='mr-2' />
                        <span>Disalin</span>
                      </>
                    ) : (
                      <>
                        <Copy size={16} className='mr-2' />
                        <span>Salin</span>
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
