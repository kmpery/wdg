import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Gift, Copy, Check } from 'lucide-react';

interface GiftOption {
  title: string;
  icon: React.ReactNode;
  description: string;
  details?: string;
}

const GiftSection: React.FC = () => {
  const [copiedDetail, setCopiedDetail] = useState<string | null>(null);

  const giftOptions: GiftOption[] = [
    {
      title: 'Cash Gift',
      icon: <Gift size={24} />,
      description:
        'If you wish to give a cash gift to help us start our new life together.',
      details: 'Bank Account: 1234567890 (Bank BCA)\nAccount Name: Nursalim',
    },
    {
      title: 'Gift Registry',
      icon: <Gift size={24} />,
      description:
        "We've created a registry with a selection of items that would be meaningful to us.",
      details: 'Registry Link: https://registry.example.com/alim-risa',
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
    <section className='py-20 bg-white' id='gifts'>
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
            Your presence at our wedding is the greatest gift of all. However,
            if you wish to honor us with a gift, we've included some options
            below.
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
                {option.title}
              </h3>
              <p className='text-amber-800 text-center mb-6'>
                {option.description}
              </p>

              {option.details && (
                <div className='bg-white p-4 rounded-md border border-amber-200'>
                  <p className='text-amber-800 whitespace-pre-line'>
                    {option.details}
                  </p>
                  <button
                    onClick={() =>
                      copyToClipboard(option.details, option.title)
                    }
                    className='mt-4 flex items-center justify-center px-4 py-2 bg-amber-700 text-white rounded-md hover:bg-amber-800 transition-colors duration-300 mx-auto'
                  >
                    {copiedDetail === option.title ? (
                      <>
                        <Check size={16} className='mr-2' />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy size={16} className='mr-2' />
                        <span>Copy Details</span>
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
