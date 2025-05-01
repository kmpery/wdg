import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Calendar, Clock } from 'lucide-react';
import MapLocation from './MapLocation';

const EventSection: React.FC = () => {
  return (
    <section className='py-20 bg-amber-100' id='event'>
      <div className='container mx-auto px-4'>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className='text-center mb-12'
        >
          <h2 className='text-4xl font-bold text-amber-900 mb-4'>
            Wedding Ceremony & Reception
          </h2>
          <div className='w-16 h-1 bg-amber-800 mx-auto mb-8'></div>

          <p className='text-amber-800 max-w-2xl mx-auto'>
            Dengan segala kerendahan hati kami berharap kehadiran
            Bapak/Ibu/Saudara/i dalam acara pernikahan kami yang akan
            diselenggarakan pada:
          </p>
        </motion.div>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto'>
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className='bg-amber-50 p-8 rounded-lg shadow-md'
          >
            <div className='w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6'>
              <Calendar className='text-amber-800' size={28} />
            </div>
            <h3 className='text-2xl font-bold text-amber-900 text-center mb-4'>
              Akad Nikah
            </h3>
            <div className='flex items-center justify-center space-x-2 mb-3'>
              <Calendar size={16} className='text-amber-700' />
              <span className='text-amber-800'>Kamis,10 Juli 2025</span>
            </div>
            <div className='flex items-center justify-center space-x-2 mb-3'>
              <Clock size={16} className='text-amber-700' />
              <span className='text-amber-800'>09:30 - 11:00 WITA</span>
            </div>
            <div className='flex items-center justify-center space-x-2 mb-6'>
              <MapPin size={16} className='text-amber-700' />
              <span className='text-amber-800'>Kediaman Mempelai Wanita</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className='bg-amber-50 p-8 rounded-lg shadow-md'
          >
            <div className='w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6'>
              <Calendar className='text-amber-800' size={28} />
            </div>
            <h3 className='text-2xl font-bold text-amber-900 text-center mb-4'>
              Resepsi
            </h3>
            <div className='flex items-center justify-center space-x-2 mb-3'>
              <Calendar size={16} className='text-amber-700' />
              <span className='text-amber-800'>Kamis,10 Juli 2025</span>
            </div>
            <div className='flex items-center justify-center space-x-2 mb-3'>
              <Clock size={16} className='text-amber-700' />
              <span className='text-amber-800'>11.00 WITA - Selesai</span>
            </div>
            <div className='flex items-center justify-center space-x-2 mb-6'>
              <MapPin size={16} className='text-amber-700' />
              <span className='text-amber-800'>Kediaman Mempelai Wanita</span>
            </div>
          </motion.div>
        </div>

        <div className='mt-16 max-w-5xl mx-auto'>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className='text-2xl font-bold text-amber-900 text-center mb-6'>
              Lokasi Acara
            </h3>
            <p className='text-amber-800 max-w-2xl mx-auto mb-4 text-center'>
              Alamat: Pare'-pare' Maradekaya, Kabupaten Gowa, Sulawesi Selatan
            </p>
            <MapLocation />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default EventSection;
