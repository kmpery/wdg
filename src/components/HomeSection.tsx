import React from 'react';
import { motion } from 'framer-motion';
import { FaInstagram } from 'react-icons/fa';

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
          <h2 className='text-4xl font-bold text-amber-900 dark:text-white mb-4'>
            The Wedding
          </h2>
          <div className='w-16 h-1 bg-amber-800 dark:bg-amber-300 mx-auto mb-10'></div>

          <h3 className='mb-2 font-bold text-amber-800 dark:text-amber-200'>
            بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْم
          </h3>
          <h3 className='mb-2 font-bold text-amber-800 dark:text-amber-200'>
            Assalamu'alaikum Warohmatullahi Wabarokatuh
          </h3>
          <p className='text-amber-800 dark:text-amber-200 max-w-2xl mx-auto'>
            Dengan memohon Ridho serta Rahmat Allah SWT dan tanpa mengurangi
            rasa hormat, kami bermaksud mengundang Bapak/Ibu/Saudara/i untuk
            menghadiri acara pernikahan kami
          </p>
        </motion.div>

        <div className='max-w-4xl mx-auto'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-12 items-center'>
            {/* Groom */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className='text-center'
            >
              <div className='mb-6'>
                <img
                  src='https://images.pexels.com/photos/8100784/pexels-photo-8100784.jpeg'
                  alt='Groom'
                  className='w-64 h-64 rounded-full mx-auto mt-4 object-cover border-4 border-amber-200 dark:border-gray-700'
                />
              </div>
              <h3 className='text-2xl font-bold text-amber-900 dark:text-white mb-2'>
                Nursalim S.H Dg.Nuntung
              </h3>
              <a
                href='https://www.instagram.com/_aaaalim?igsh=MmFjYTZhYjBvOWxk&utm_source=qr'
                target='_blank'
                rel='noopener noreferrer'
                className='inline-flex items-center text-amber-800 hover:text-amber-600 dark:text-amber-200 dark:hover:text-amber-400 transition-colors duration-300'
              >
                <FaInstagram size={20} className='mr-1' />
                @_aaaalim
              </a>
              <p className='mt-4 text-amber-800 dark:text-amber-200'>
                <br />
                Putra Pertama dari Bapak Haeruddin dg. Gassing <br />
                dan <br />
                Ibu Hj. Nurbaya dg. Sabbe
              </p>
            </motion.div>

            {/* Bride */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className='text-center'
            >
              <div className='mb-6'>
                <img
                  src='https://images.pexels.com/photos/8100584/pexels-photo-8100584.jpeg'
                  alt='Bride'
                  className='w-64 h-64 rounded-full mx-auto mt-4 object-cover border-4 border-amber-200 dark:border-gray-700'
                />
              </div>
              <h3 className='text-2xl font-bold text-amber-900 dark:text-white mb-2'>
                Risa Inda Sari Dg.Nginga
              </h3>
              <a
                href='https://www.instagram.com/rhisaaaaaaa_?utm_source=qr&igsh=MXZnanV1ZW9tcDBqOQ=='
                target='_blank'
                rel='noopener noreferrer'
                className='inline-flex items-center text-amber-800 hover:text-amber-600 dark:text-amber-200 dark:hover:text-amber-400 transition-colors duration-300'
              >
                <FaInstagram size={20} className='mr-1' />
                @rhisaaaaaaa_
              </a>
              <p className='mt-4 text-amber-800 dark:text-amber-200'>
                <br />
                Putri ke 3 dari Bapak Muh. Rusydi
                <br />
                dan <br />
                Ibu Rahma dg. Baji
              </p>
            </motion.div>
          </div>

          {/* Ayat */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className='mt-16 text-center bg-amber-50 dark:bg-gray-800 p-8 rounded-lg'
          >
            <h3 className='text-2xl font-semibold text-amber-800 dark:text-amber-200 mb-4'>
              (Q.S. Ar-Rum: 21)
            </h3>
            <p className='text-amber-800 dark:text-amber-200'>
              وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُمْ مِنْ أَنْفُسِكُمْ أَزْوَاجًا
              لِتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُمْ مَوَدَّةً وَرَحْمَةً
              إِنَّ فِي ذَلِكَ لَآيَاتٍ لِقَوْمٍ يَتَفَكَّرُونَ
            </p>
            <p className='italic text-amber-700 dark:text-amber-300 mt-2'>
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
