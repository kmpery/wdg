import React from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

const StorySection: React.FC = () => {
  const timelineEvents = [
    {
      date: 'Mei, 2019',
      title: 'Pertama kali bertemu',
      description: `Dia adalah kakak kelasku di tahun 2018, dan awal kedekatan kami terjadi pada Mei 2019, tepatnya di bulan puasa. Di bulan yang penuh berkah ini, dia memberanikan diri untuk membawa sekantong gorengan dan martabak, sebagai tanda niat baiknya, untuk pertama kali bertemu dengan keluargaku.`,
      image:
        'https://images.pexels.com/photos/1415131/pexels-photo-1415131.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    },
    {
      date: 'Maret, 2024',
      title: 'Mulai Serius',
      description:
        'Setelah Lebaran, keluarganya datang dalam tradisi Makassar yang dikenal dengan istilah ma’manu’ manu’, untuk berbicara serius tentang masa depan kami. Mereka menyampaikan niat baik untuk melamar di tahun depan, 2025.',
      image:
        'https://images.pexels.com/photos/1024960/pexels-photo-1024960.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    },
    {
      date: 'April, 2025',
      title: 'Tunangan',
      description: `Dan dia menepati janjinya. Setelah 6 tahun penantian, akhirnya dia melamarku. Insya Allah, dengan doa dan restu dari keluarga, hubungan ini akan terus langgeng dan abadi, sampai kita menua bersama.`,
      image:
        'https://images.pexels.com/photos/3387577/pexels-photo-3387577.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    },
  ];

  return (
    <section id='story' className='py-20 px-4 bg-amber-100 dark:bg-gray-900'>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className='max-w-4xl mx-auto text-center'
      >
        <div className='mb-8 flex justify-center'>
          <Heart className='text-amber-400 dark:text-sky-500 h-8 w-8' />
        </div>

        <h2 className='text-4xl font-bold text-amber-900 dark:text-sky-400 mb-4'>
          Our Love Story
        </h2>
        <div className='w-16 h-1 bg-amber-800 dark:bg-sky-400 mx-auto mb-8'></div>

        <p className='text-amber-800 dark:text-sky-200 max-w-2xl mx-auto mb-8'>
          Banyak cerita yang kami lalui sehingga akhirnya kami bisa bersatu,
          cerita yang akan kami kenang selalu, dan cerita itu kami bagi untuk
          anda.
        </p>

        <div className='relative'>
          {/* Timeline line */}
          <div className='absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-amber-200 dark:bg-sky-700 z-0'></div>

          {timelineEvents.map((event, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              className={`relative z-10 flex flex-col md:flex-row items-center gap-8 mb-16 ${
                index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
              }`}
            >
              {/* Timeline dot */}
              <div className='absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-amber-200 dark:bg-sky-700 rounded-full border-4 border-amber-50 dark:border-sky-300 z-20 hidden md:block'></div>

              {/* Image */}
              <div
                className={`w-full md:w-1/2 flex justify-center ${
                  index % 2 === 0 ? 'md:justify-end' : 'md:justify-start'
                }`}
              >
                <div className='w-64 h-64 rounded-full overflow-hidden border-4 border-amber-200 dark:border-sky-700 shadow-lg'>
                  <div
                    className='w-full h-full bg-cover bg-center'
                    style={{ backgroundImage: `url(${event.image})` }}
                  ></div>
                </div>
              </div>

              {/* Content */}
              <div className='w-full md:w-1/2 text-left p-6 bg-amber-50 dark:bg-sky-950 rounded-lg shadow-md'>
                <div className='inline-block px-3 py-1 bg-amber-100 dark:bg-sky-800 text-amber-800 dark:text-sky-300 text-sm rounded-full mb-2 font-serif'>
                  {event.date}
                </div>
                <h3 className='text-xl font-serif text-amber-900 dark:text-sky-300 mb-2'>
                  {event.title}
                </h3>
                <p className='text-amber-800 dark:text-sky-200 font-serif'>
                  {event.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default StorySection;
