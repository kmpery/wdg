import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Calendar, Clock } from 'lucide-react';
import MapLocation from './MapLocation';

interface EventSectionProps {
  activeTab: 'wanita' | 'pria';
}

const EventSection: React.FC<EventSectionProps> = ({ activeTab }) => {
  // Define separate data for wanita and pria tabs
  const eventData = {
    wanita: {
      akad: {
        date: 'Rabu, 18 Juni 2025',
        time: '11:00 - 12:00 WITA',
        location: 'Kediaman Mempelai Wanita',
      },
      resepsi: {
        date: 'Rabu, 18 Juni 2025',
        time: '12.00 WITA - Selesai',
        location: 'Kediaman Mempelai Wanita',
      },
      locations: [
        {
          address:
            'Jl.Sahabu Dg Tindri, Maradekaya, kec.Bajeng kab.Gowa, Sulawesi Selatan',
          mapSrc:
            'https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3972.9264102669254!2d119.43295707498312!3d-5.274165994703939!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zNcKwMTYnMjcuMCJTIDExOcKwMjYnMDcuOSJF!5e0!3m2!1sid!2sid!4v1744434675941!5m2!1sid!2sid',
          googleMapsUrl: 'https://maps.app.goo.gl/4kw6z5nDqvNiNxFw9',
        },
      ],
    },
    pria: {
      akad: {
        date: 'Rabu, 18 Juni 2025',
        time: '09:30 - 11:00 WITA',
        location: 'Kediaman Mempelai Wanita',
      },
      resepsi: {
        date: 'Kamis, 19 Juni 2025',
        time: '08.00 WITA - Selesai',
        location: 'Kediaman Mempelai Pria',
      },
      locations: [
        {
          address:
            'Jl.Nuhung Dg Bani Tamacinna, Maradekaya kec.Bajeng kab.Gowa, Sulawesi Selatan. Dekat SDN Inpress Pakkingkingang',
          mapSrc:
            'https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3972.89082632421!2d119.44695287498313!3d-5.2797221946984285!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zNcKwMTYnNDcuMCJTIDExOcKwMjYnNTguMyJF!5e0!3m2!1sid!2sid!4v1748242356274!5m2!1sid!2sid',
          googleMapsUrl: 'https://maps.app.goo.gl/ACmxkbAtYe7FxQEt6',
        },
      ],
    },
  };

  // Get data based on active tab
  const currentData = eventData[activeTab];

  // Fungsi untuk Google Calendar atau .ics file
  const addToCalendar = () => {
    const isUsingGoogle = confirm(
      'Klik OK untuk simpan di Google Calendar.\nKlik cancle untuk download ke kalender lain (iOS/Android/Outlook).'
    );

    const title = 'Pernikahan Nursalim & Risa Indasari';
    const location = currentData.locations[0].address;
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
            Wedding Events
          </h2>
          <div className='w-16 h-1 bg-amber-800 dark:bg-sky-400 mx-auto mb-8'></div>
          <p className='text-amber-800 dark:text-sky-200 max-w-2xl mx-auto'>
            Dengan segala kerendahan hati kami berharap kehadiran
            Bapak/Ibu/Saudara/i dalam acara pernikahan kami yang akan
            diselenggarakan pada:
          </p>
        </motion.div>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto'>
          {/* Akad Nikah */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className='bg-amber-50 dark:bg-sky-950 p-4 rounded-lg shadow-md'
          >
            <div className='w-12 h-12 bg-amber-100 dark:bg-sky-900 rounded-full flex items-center justify-center mx-auto mb-2'>
              <div
                title='Klik untuk simpan ke kalender Anda (Google / iOS / Android)'
                className='inline-block'
              >
                <Calendar
                  onClick={addToCalendar}
                  className='text-amber-800 dark:text-sky-200 cursor-pointer hover:scale-110 transition-transform'
                  size={24}
                />
              </div>
            </div>
            <h3 className='text-2xl font-bold text-amber-900 dark:text-sky-400 text-center mb-2'>
              Akad Nikah
            </h3>
            <div className='flex items-center justify-center space-x-2 mb-1'>
              <Calendar
                size={16}
                className='text-amber-700 dark:text-sky-300'
              />
              <span className='text-amber-800 dark:text-sky-200'>
                {currentData.akad.date}
              </span>
            </div>
            <div className='flex items-center justify-center space-x-2 mb-1'>
              <Clock size={16} className='text-amber-700 dark:text-sky-300' />
              <span className='text-amber-800 dark:text-sky-200'>
                {currentData.akad.time}
              </span>
            </div>
            <div className='flex items-center justify-center space-x-2 mb-1'>
              <MapPin size={16} className='text-amber-700 dark:text-sky-300' />
              <span className='text-amber-800 dark:text-sky-200'>
                {currentData.akad.location}
              </span>
            </div>
          </motion.div>

          {/* Resepsi */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className='bg-amber-50 dark:bg-sky-950 p-4 rounded-lg shadow-md'
          >
            <div className='w-12 h-12 bg-amber-100 dark:bg-sky-900 rounded-full flex items-center justify-center mx-auto mb-2'>
              <div title='Klik untuk simpan ke kalender Anda (Google / iOS / Android)'>
                <Calendar
                  onClick={addToCalendar}
                  className='text-amber-800 dark:text-sky-200 cursor-pointer hover:scale-110 transition-transform'
                  size={24}
                />
              </div>
            </div>
            <h3 className='text-2xl font-bold text-amber-900 dark:text-sky-400 text-center mb-2'>
              Resepsi
            </h3>
            <div className='flex items-center justify-center space-x-2 mb-1'>
              <Calendar
                size={16}
                className='text-amber-700 dark:text-sky-300'
              />
              <span className='text-amber-800 dark:text-sky-200'>
                {currentData.resepsi.date}
              </span>
            </div>
            <div className='flex items-center justify-center space-x-2 mb-1'>
              <Clock size={16} className='text-amber-700 dark:text-sky-300' />
              <span className='text-amber-800 dark:text-sky-200'>
                {currentData.resepsi.time}
              </span>
            </div>
            <div className='flex items-center justify-center space-x-2 mb-1'>
              <MapPin size={16} className='text-amber-700 dark:text-sky-300' />
              <span className='text-amber-800 dark:text-sky-200'>
                {currentData.resepsi.location}
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
              Location
            </h3>
            <p className='text-amber-800 dark:text-sky-200 max-w-2xl mx-auto mb-4 text-center'>
              Alamat: {currentData.locations[0].address}
            </p>
            <MapLocation
              mapSrc={currentData.locations[0].mapSrc}
              googleMapsUrl={currentData.locations[0].googleMapsUrl}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default EventSection;
