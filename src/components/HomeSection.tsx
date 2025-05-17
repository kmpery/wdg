import React from 'react';
import { motion } from 'framer-motion';
import { FaInstagram } from 'react-icons/fa';
import BorderFrame from '../assets/border2.svg?react';

const HomeSection: React.FC = () => {
  return (
    <section className='py-20 bg-amber-50 dark:bg-gray-900' id='home'>
      <div className='container mx-auto px-4'>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className='text-center mb-12'
        >
          <h2 className='text-4xl font-bold text-amber-900 dark:text-sky-400 mb-4'>
            The Wedding
          </h2>
          <div className='w-16 h-1 bg-amber-800 dark:bg-sky-400 mx-auto mb-10'></div>

          <h3 className='mb-2 font-bold text-amber-800 dark:text-sky-300'>
            بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْم
          </h3>
          <h3 className='mb-2 font-bold text-amber-800 dark:text-sky-300'>
            Assalamu'alaikum Warohmatullahi Wabarokatuh
          </h3>
          <p className='text-amber-800 dark:text-sky-200 max-w-2xl mx-auto'>
            Dengan memohon Ridho serta Rahmat Allah SWT dan tanpa mengurangi
            rasa hormat, kami bermaksud mengundang Bapak/Ibu/Saudara/i untuk
            menghadiri acara pernikahan kami
          </p>
        </motion.div>

        <div className='max-w-4xl mx-auto'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-12 items-center'>
            {/* Groom */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className='text-center'
            >
              <div className='relative w-64 h-64 mx-auto mb-6'>
                <img
                  src='https://ik.imagekit.io/kmpery/home/1.jpg?updatedAt=1747508311554'
                  alt='Groom'
                  className='w-64 h-64 rounded-full object-cover relative z-0'
                />
                <div className='absolute inset-0 w-full h-full scale-[1.4] z-10 pointer-events-none'>
                  <div className='w-full h-full origin-center'>
                    <BorderFrame
                      className='w-full h-full'
                      preserveAspectRatio='xMidYMid meet'
                    />
                  </div>
                </div>
              </div>
              <h3 className='text-2xl font-bold text-amber-900 dark:text-sky-100 mb-2 mt-10'>
                Nursalim S.H Dg.Nuntung
              </h3>
              <a
                href='https://www.instagram.com/_aaaalim?igsh=MmFjYTZhYjBvOWxk&utm_source=qr'
                target='_blank'
                rel='noopener noreferrer'
                className='inline-flex items-center text-amber-800 hover:text-amber-600 dark:text-sky-200 dark:hover:text-sky-400 transition-colors duration-300'
              >
                <FaInstagram size={20} className='mr-1' />
                @_aaaalim
              </a>
              <p className='mt-4 text-amber-800 dark:text-sky-200'>
                <br />
                Putra Pertama dari Bapak Haeruddin Dg. Gassing <br />
                dan <br />
                Ibu Hj. Nurbaya Dg. Sabbe
              </p>
            </motion.div>

            {/* Bride */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className='text-center'
            >
              <div className='relative w-64 h-64 mx-auto mb-6'>
                <img
                  src='https://ik.imagekit.io/kmpery/home/2.jpg?updatedAt=1747508230408'
                  alt='Groom'
                  className='w-64 h-64 rounded-full object-cover relative z-0'
                />
                <div className='absolute inset-0 w-full h-full z-10 pointer-events-none'>
                  <div className='w-full h-full scale-[1.4] origin-center'>
                    <BorderFrame
                      className='w-full h-full'
                      style={{
                        transform: 'scaleX(-1)',
                      }}
                      preserveAspectRatio='xMidYMid meet'
                    />
                  </div>
                </div>
              </div>
              <h3 className='text-2xl font-bold text-amber-900 dark:text-sky-100 mt-10 mb-2'>
                Risa Inda Sari Dg.Nginga
              </h3>
              <a
                href='https://www.instagram.com/rhisaaaaaaa_?utm_source=qr&igsh=MXZnanV1ZW9tcDBqOQ=='
                target='_blank'
                rel='noopener noreferrer'
                className='inline-flex items-center text-amber-800 hover:text-amber-600 dark:text-sky-200 dark:hover:text-sky-400 transition-colors duration-300'
              >
                <FaInstagram size={20} className='mr-1' />
                @rhisaaaaaaa_
              </a>
              <p className='mt-4 text-amber-800 dark:text-sky-200'>
                <br />
                Putri ke 3 dari Bapak Muh. Rusydi Dg.Ngudding
                <br />
                dan <br />
                Ibu Rahma Dg. Baji
              </p>
            </motion.div>
          </div>

          {/* Quots */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className='mt-16 text-center bg-amber-200 dark:bg-sky-950 p-8 rounded-lg'
          >
            <h3 className='text-2xl font-semibold text-amber-800 dark:text-sky-400 mb-4'>
              (Q.S. Ar-Rum: 21)
            </h3>
            <p className='text-amber-800 dark:text-sky-200'>
              وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُمْ مِنْ أَنْفُسِكُمْ أَزْوَاجًا
              لِتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُمْ مَوَدَّةً وَرَحْمَةً
              إِنَّ فِي ذَلِكَ لَآيَاتٍ لِقَوْمٍ يَتَفَكَّرُونَ
            </p>
            <p className='italic text-amber-700 dark:text-sky-300 mt-2'>
              " Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan
              pasangan-pasangan untukmu dari jenismu sendiri, agar kamu
              cenderung dan merasa tenteram kepadanya, dan Dia menjadikan di
              antaramu rasa kasih dan sayang. Sungguh, pada yang demikian itu
              benar-benar terdapat tanda-tanda (kebesaran Allah) bagi kaum yang
              berpikir."
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HomeSection;
