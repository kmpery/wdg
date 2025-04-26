import React from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

const StorySection: React.FC = () => {
  const timelineEvents = [
    {
      date: 'May 15, 2020',
      title: 'First Meeting',
      description:
        "We first met at a mutual friend's birthday party. Alim was instantly captivated by Risa's smile, while she was drawn to his sense of humor.",
      image:
        'https://images.pexels.com/photos/1415131/pexels-photo-1415131.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    },
    {
      date: 'December 24, 2021',
      title: 'First Date',
      description:
        'After months of friendship, we finally went on our first official date. We talked for hours over coffee and knew there was something special between us.',
      image:
        'https://images.pexels.com/photos/1024960/pexels-photo-1024960.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    },
    {
      date: 'August 10, 2023',
      title: 'The Proposal',
      description:
        'During a sunset beach walk in Bali, Alim surprised Risa with a heartfelt proposal. Surrounded by candles and roses, she said "Yes!" without hesitation.',
      image:
        'https://images.pexels.com/photos/3387577/pexels-photo-3387577.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    },
  ];

  return (
    <section id='story' className='py-20 px-4 bg-[#FFF8F0]'>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className='max-w-4xl mx-auto text-center'
      >
        <div className='mb-8 flex justify-center'>
          <Heart className='text-amber-400 h-8 w-8' />
        </div>

        <h2 className='text-4xl font-bold text-amber-900 mb-4'>
          Our Love Story
        </h2>
        <div className='w-16 h-1 bg-amber-800 mx-auto mb-8'></div>

        <div className='relative'>
          {/* Timeline line */}
          <div className='absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-amber-400 z-0'></div>

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
              <div className='absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-amber-400 rounded-full border-4 border-white z-20 hidden md:block'></div>

              {/* Image */}
              <div className='w-full md:w-1/2 flex justify-center md:justify-end'>
                <div className='w-64 h-64 rounded-full overflow-hidden border-4 border-white shadow-lg'>
                  <div
                    className='w-full h-full bg-cover bg-center'
                    style={{ backgroundImage: `url(${event.image})` }}
                  ></div>
                </div>
              </div>

              {/* Content */}
              <div className='w-full md:w-1/2 text-left p-6 bg-white rounded-lg shadow-md'>
                <div className='inline-block px-3 py-1 bg-amber-100 text-amber-800 text-sm rounded-full mb-2 font-serif'>
                  {event.date}
                </div>
                <h3 className='text-xl font-serif text-amber-900 mb-2'>
                  {event.title}
                </h3>
                <p className='text-amber-800 font-serif'>{event.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default StorySection;
