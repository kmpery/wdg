import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  IoCloseOutline,
  IoPlayCircleOutline,
  IoPauseCircleOutline,
} from 'react-icons/io5';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';
import { useSwipeable } from 'react-swipeable';

interface Image {
  src: string;
  alt: string;
}

const images: Image[] = [
  {
    src: 'https://images.pexels.com/photos/2253870/pexels-photo-2253870.jpeg',
    alt: 'Couple photo 1',
  },
  {
    src: 'https://images.pexels.com/photos/1730877/pexels-photo-1730877.jpeg',
    alt: 'Couple photo 2',
  },
  {
    src: 'https://images.pexels.com/photos/3352398/pexels-photo-3352398.jpeg',
    alt: 'Couple photo 3',
  },
  {
    src: 'https://images.pexels.com/photos/1405761/pexels-photo-1405761.jpeg',
    alt: 'Couple photo 4',
  },
  {
    src: 'https://images.pexels.com/photos/2959192/pexels-photo-2959192.jpeg',
    alt: 'Couple photo 5',
  },
  {
    src: 'https://images.pexels.com/photos/2959192/pexels-photo-2959192.jpeg',
    alt: 'Couple photo 5',
  },
  {
    src: 'https://images.pexels.com/photos/2959192/pexels-photo-2959192.jpeg',
    alt: 'Couple photo 5',
  },
  {
    src: 'https://images.pexels.com/photos/2959192/pexels-photo-2959192.jpeg',
    alt: 'Couple photo 5',
  },
  {
    src: 'https://images.pexels.com/photos/2959192/pexels-photo-2959192.jpeg',
    alt: 'Couple photo 5',
  },
];

const GallerySection: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(
    null
  );
  const [autoSlide, setAutoSlide] = useState(true);

  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    loop: true,
    slides: { perView: 1, spacing: 20 },
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
  });

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (autoSlide) {
      interval = setInterval(() => {
        instanceRef.current?.next();
      }, 4000);
    }
    return () => clearInterval(interval);
  }, [instanceRef, autoSlide]);

  const openLightbox = (index: number) => {
    setSelectedImageIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    setSelectedImageIndex(null);
  };

  const nextImage = () => {
    if (selectedImageIndex !== null) {
      setSelectedImageIndex((selectedImageIndex + 1) % images.length);
    }
  };

  const prevImage = () => {
    if (selectedImageIndex !== null) {
      setSelectedImageIndex(
        (selectedImageIndex - 1 + images.length) % images.length
      );
    }
  };

  const toggleAutoSlide = () => {
    setAutoSlide(!autoSlide);
  };

  const [showControls, setShowControls] = useState(false);

  const handleImageTap = () => {
    setShowControls(true);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current); // agar tidak dobel
    }
    timeoutRef.current = setTimeout(() => {
      setShowControls(false);
    }, 3000);
  };

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const swipeHandlers = useSwipeable({
    onSwipedLeft: nextImage, // Pindah ke gambar berikutnya saat swipe ke kiri
    onSwipedRight: prevImage, // Pindah ke gambar sebelumnya saat swipe ke kanan
    preventScrollOnSwipe: true, // Mencegah scroll saat swipe
    trackMouse: true, // Mendukung swipe dengan mouse
  });

  return (
    <section className='py-20 bg-amber-950 dark:bg-gray-900' id='gallery'>
      <div className='container mx-auto px-4'>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className='text-center mb-12 text-amber-100 dark:text-sky-400'
        >
          <h2 className='text-4xl font-bold mb-4'>Our Gallery</h2>
          <div className='w-16 h-1 bg-amber-100 dark:bg-sky-400 mx-auto mb-8'></div>
          <p className='text-lg max-w-2xl mx-auto dark:text-sky-200'>
            Gallery foto kebahagiaan kami yang kami kenang selalu.
          </p>
        </motion.div>

        {/* Slider */}
        <div className='relative group'>
          <div
            ref={sliderRef}
            className='keen-slider rounded-2xl overflow-hidden relative'
          >
            {images.map((image, index) => (
              <div
                className='keen-slider__slide flex justify-center cursor-pointer'
                key={index}
                onClick={() => openLightbox(index)}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className='rounded-2xl max-h-[700px] md:max-h-[500px] sm:max-h-[300px] object-cover w-full'
                />
              </div>
            ))}

            {/* Navigation Arrows */}
            <button
              onClick={() => instanceRef.current?.prev()}
              className='hidden group-hover:flex absolute top-1/2 left-4 transform -translate-y-1/2 bg-amber-50 text-amber-950 p-2 rounded-full shadow-md hover:scale-110 transition'
            >
              <FaChevronLeft size={24} />
            </button>
            <button
              onClick={() => instanceRef.current?.next()}
              className='hidden group-hover:flex absolute top-1/2 right-4 transform -translate-y-1/2 bg-amber-50 text-amber-950 p-2 rounded-full shadow-md hover:scale-110 transition'
            >
              <FaChevronRight size={24} />
            </button>
          </div>

          {/* Play/Pause Button Outside */}
          <div className='flex justify-end mt-2'>
            <button
              onClick={toggleAutoSlide}
              className='flex items-center justify-center w-8 h-8 border border-none text-white rounded-full hover:bg-white/10 transition'
            >
              {autoSlide ? (
                <IoPauseCircleOutline size={24} />
              ) : (
                <IoPlayCircleOutline size={24} />
              )}
            </button>
          </div>
        </div>

        {/* Dots */}
        <div className='flex justify-center mt-6 gap-2'>
          {images.map((_, idx) => (
            <button
              key={idx}
              onClick={() => instanceRef.current?.moveToIdx(idx)}
              className={`w-2.5 h-2.5 rounded-full ${
                currentSlide === idx ? 'bg-white' : 'bg-white/50'
              } transition`}
            />
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxOpen && selectedImageIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className='fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50'
            onClick={closeLightbox}
          >
            <motion.div
              {...swipeHandlers} // gesture swipe
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              onClick={(e) => e.stopPropagation()}
              className='relative w-screen h-screen flex items-center justify-center'
            >
              {/* Tombol Close */}
              <AnimatePresence>
                {showControls && (
                  <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    onClick={closeLightbox}
                    className='absolute top-4 right-4 bg-white text-black p-2 rounded-full shadow-md hover:scale-110 transition'
                  >
                    <IoCloseOutline size={24} />
                  </motion.button>
                )}
              </AnimatePresence>

              {/* Gambar Fullscreen */}
              <motion.img
                src={images[selectedImageIndex].src}
                alt={images[selectedImageIndex].alt}
                className='w-screen h-screen object-contain'
                onClick={handleImageTap}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default GallerySection;
