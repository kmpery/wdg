import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Calendar, Clock } from 'lucide-react';
import MapLocation from './MapLocation';

const EventSection: React.FC = () => {
  // Fungsi untuk Google Calendar atau .ics file
  const addToCalendar = () => {
    const isUsingGoogle = confirm(
      'Klik OK untuk simpan di Google Calendar.\nKlik cancle untuk download ke kalender lain (iOS/Android/Outlook).'
    );

    const title = 'Pernikahan Nursalim & Risa Indasari';
    const location =
      "Kediaman Mempelai Wanita, Pare'-pare' Maradekaya, Kabupaten Gowa, Sulawesi Selatan";
    const details =
      'Kami mengundang Anda untuk hadir dalam acara pernikahan kami.';
    const start = '20250618T013000Z';
    const end = '20250618T030000Z';

    if (isUsingGoogle) {
      const url = `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
        title
      )}&dates=${start}/${end}&details=${encodeURIComponent(
        details
      )}&location=${encodeURIComponent(location)}`;
      window.open(url, '_blank');
    } else {
      const icsContent = `
BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
SUMMARY:${title}
DESCRIPTION:${details}
LOCATION:${location}
DTSTART:${start}
DTEND:${end}
END:VEVENT
END:VCALENDAR
    `.trim();

      const blob = new Blob([icsContent], {
        type: 'text/calendar;charset=utf-8',
      });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'pernikahan-nursalim-risa.ics';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <section className='py-20 bg-amber-100 dark:bg-gray-900' id='event'>
      <div className='container mx-auto px-4'>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className='text-center mb-12'
        >
          <h2 className='text-4xl font-bold text-amber-900 dark:text-sky-400 mb-4'>
            Wedding Ceremony & Reception
          </h2>
          <div className='w-16 h-1 bg-amber-800 dark:bg-sky-400 mx-auto mb-8'></div>
          <p className='text-amber-800 dark:text-sky-200 max-w-2xl mx-auto'>
            Dengan segala kerendahan hati kami berharap kehadiran
            Bapak/Ibu/Saudara/i dalam acara pernikahan kami yang akan
            diselenggarakan pada:
          </p>
        </motion.div>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto'>
          {/* Akad Nikah */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className='bg-amber-50 dark:bg-sky-950 p-8 rounded-lg shadow-md'
          >
            <div className='w-16 h-16 bg-amber-100 dark:bg-sky-900 rounded-full flex items-center justify-center mx-auto mb-6'>
              <div
                title='Klik untuk simpan ke kalender Anda (Google / iOS / Android)'
                className='inline-block'
              >
                <Calendar
                  onClick={addToCalendar}
                  className='text-amber-800 dark:text-sky-200 cursor-pointer hover:scale-110 transition-transform'
                  size={28}
                />
              </div>
            </div>
            <h3 className='text-2xl font-bold text-amber-900 dark:text-sky-400 text-center mb-4'>
              Akad Nikah
            </h3>
            <div className='flex items-center justify-center space-x-2 mb-3'>
              <Calendar
                size={16}
                className='text-amber-700 dark:text-sky-300'
              />
              <span className='text-amber-800 dark:text-sky-200'>
                Rabu, 18 Juni 2025
              </span>
            </div>
            <div className='flex items-center justify-center space-x-2 mb-3'>
              <Clock size={16} className='text-amber-700 dark:text-sky-300' />
              <span className='text-amber-800 dark:text-sky-200'>
                09:30 - 11:00 WITA
              </span>
            </div>
            <div className='flex items-center justify-center space-x-2 mb-6'>
              <MapPin size={16} className='text-amber-700 dark:text-sky-300' />
              <span className='text-amber-800 dark:text-sky-200'>
                Kediaman Mempelai Wanita
              </span>
            </div>
          </motion.div>

          {/* Resepsi */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className='bg-amber-50 dark:bg-sky-950 p-8 rounded-lg shadow-md'
          >
            <div className='w-16 h-16 bg-amber-100 dark:bg-sky-900 rounded-full flex items-center justify-center mx-auto mb-6'>
              <div title='Klik untuk simpan ke kalender Anda (Google / iOS / Android)'>
                <Calendar
                  onClick={addToCalendar}
                  className='text-amber-800 dark:text-sky-200 cursor-pointer hover:scale-110 transition-transform'
                  size={28}
                />
              </div>
            </div>
            <h3 className='text-2xl font-bold text-amber-900 dark:text-sky-400 text-center mb-4'>
              Resepsi
            </h3>
            <div className='flex items-center justify-center space-x-2 mb-3'>
              <Calendar
                size={16}
                className='text-amber-700 dark:text-sky-300'
              />
              <span className='text-amber-800 dark:text-sky-200'>
                Rabu, 18 Juni 2025
              </span>
            </div>
            <div className='flex items-center justify-center space-x-2 mb-3'>
              <Clock size={16} className='text-amber-700 dark:text-sky-300' />
              <span className='text-amber-800 dark:text-sky-200'>
                11.00 WITA - Selesai
              </span>
            </div>
            <div className='flex items-center justify-center space-x-2 mb-6'>
              <MapPin size={16} className='text-amber-700 dark:text-sky-300' />
              <span className='text-amber-800 dark:text-sky-200'>
                Kediaman Mempelai Wanita
              </span>
            </div>
          </motion.div>
        </div>

        {/* Lokasi */}
        <div className='mt-16 max-w-5xl mx-auto'>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className='text-2xl font-bold text-amber-900 dark:text-sky-400 text-center mb-6'>
              Lokasi Acara
            </h3>
            <p className='text-amber-800 dark:text-sky-200 max-w-2xl mx-auto mb-4 text-center'>
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
