import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X as IoCloseOutline } from 'lucide-react';
import {
  MdOutlinePlayCircle,
  MdOutlinePauseCircle,
  MdOutlineChevronLeft,
  MdOutlineChevronRight,
} from 'react-icons/md';
import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';

interface Image {
  src: string;
  alt: string;
}

const images: Image[] = [
  {
    src: 'https://ik.imagekit.io/kmpery/gallery/1.jpg?updatedAt=1747456531270',
    alt: 'Gallery 1',
  },
  {
    src: 'https://ik.imagekit.io/kmpery/gallery/2.jpg?',
    alt: 'Gallery 2',
  },
  {
    src: 'https://ik.imagekit.io/kmpery/gallery/3.jpg?',
    alt: 'Gallery 3',
  },
  {
    src: 'https://ik.imagekit.io/kmpery/gallery/4.jpg?',
    alt: 'Gallery 4',
  },
  {
    src: 'https://ik.imagekit.io/kmpery/gallery/5.jpg?',
    alt: 'Gallery 5',
  },
  {
    src: 'https://ik.imagekit.io/kmpery/gallery/6.jpg?updatedAt=1747456049983',
    alt: 'Gallery 6',
  },
  {
    src: 'https://ik.imagekit.io/kmpery/gallery/7.jpg?',
    alt: 'Gallery 7',
  },
  {
    src: 'https://ik.imagekit.io/kmpery/gallery/8.jpg?',
    alt: 'Gallery 8',
  },
  {
    src: 'https://ik.imagekit.io/kmpery/gallery/9.jpg?',
    alt: 'Gallery 9',
  },
  {
    src: 'https://ik.imagekit.io/kmpery/gallery/10.jpg?',
    alt: 'Gallery 10',
  },
  {
    src: 'https://ik.imagekit.io/kmpery/gallery/11.jpg?',
    alt: 'Gallery 11',
  },
  {
    src: 'https://ik.imagekit.io/kmpery/gallery/12.jpg?',
    alt: 'Gallery 12',
  },
  {
    src: 'https://ik.imagekit.io/kmpery/gallery/13.jpg?',
    alt: 'Gallery 13',
  },
  {
    src: 'https://ik.imagekit.io/kmpery/gallery/14.jpg?',
    alt: 'Gallery 14',
  },
  {
    src: 'https://ik.imagekit.io/kmpery/gallery/15.jpg?',
    alt: 'Gallery 15',
  },
  {
    src: 'https://ik.imagekit.io/kmpery/gallery/16.jpg?',
    alt: 'Gallery 16',
  },
  {
    src: 'https://ik.imagekit.io/kmpery/gallery/17.jpg?',
    alt: 'Gallery 17',
  },
  {
    src: 'https://ik.imagekit.io/kmpery/gallery/18.jpg?',
    alt: 'Gallery 18',
  },
  {
    src: 'https://ik.imagekit.io/kmpery/gallery/19.jpg?',
    alt: 'Gallery 19',
  },
  {
    src: 'https://ik.imagekit.io/kmpery/gallery/20.jpg?',
    alt: 'Gallery 20',
  },
  {
    src: 'https://ik.imagekit.io/kmpery/gallery/21.jpg?',
    alt: 'Gallery 21',
  },
  {
    src: 'https://ik.imagekit.io/kmpery/gallery/22.jpg?',
    alt: 'Gallery 22',
  },
  {
    src: 'https://ik.imagekit.io/kmpery/gallery/23.jpg?',
    alt: 'Gallery 23',
  },
  {
    src: 'https://ik.imagekit.io/kmpery/gallery/24.jpg?',
    alt: 'Gallery 24',
  },
];

const useIsLargeScreen = () => {
  const [isLarge, setIsLarge] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsLarge(window.innerWidth >= 1024);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return isLarge;
};

const GallerySection: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(
    null
  );
  const [autoSlide, setAutoSlide] = useState(true);
  const [showControls, setShowControls] = useState(false);
  const [swipeDirection, setSwipeDirection] = useState<string | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isLargeScreen = useIsLargeScreen();
  const touchStartXRef = useRef<number | null>(null);

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
        if (isLargeScreen) {
          setCurrentSlide((prev) => (prev + 1) % images.length);
        } else {
          instanceRef.current?.next();
        }
      }, 4000);
    }
    return () => clearInterval(interval);
  }, [autoSlide, instanceRef, isLargeScreen]);

  useEffect(() => {
    if (lightboxOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [lightboxOpen]);

  const openLightbox = (index: number) => {
    setSelectedImageIndex(index);
    setLightboxOpen(true);
    setShowControls(true);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setShowControls(false), 3000);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    setSelectedImageIndex(null);
    setSwipeDirection(null);
  };

  const nextImage = () => {
    if (selectedImageIndex !== null) {
      setSwipeDirection('left');
      setSelectedImageIndex((selectedImageIndex + 1) % images.length);
      setTimeout(() => {
        setSwipeDirection(null);
      }, 300);
    }
  };

  const prevImage = () => {
    if (selectedImageIndex !== null) {
      setSwipeDirection('right');
      setSelectedImageIndex(
        (selectedImageIndex - 1 + images.length) % images.length
      );
      setTimeout(() => {
        setSwipeDirection(null);
      }, 300);
    }
  };

  const toggleAutoSlide = () => setAutoSlide(!autoSlide);

  const showControlsTemporarily = () => {
    setShowControls(true);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setShowControls(false), 3000);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStartXRef.current === null) return;

    const touchX = e.touches[0].clientX;
    const diff = touchX - touchStartXRef.current;

    if (Math.abs(diff) > 5) {
      e.preventDefault();
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartXRef.current === null) return;

    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchEndX - touchStartXRef.current;

    if (diff > 50) {
      prevImage();
      showControlsTemporarily();
    } else if (diff < -50) {
      nextImage();
      showControlsTemporarily();
    } else {
      showControlsTemporarily();
    }

    touchStartXRef.current = null;
  };

  const getImageVariants = () => {
    return {
      enter: (direction: string | null) => {
        return {
          x: direction === 'left' ? 1000 : direction === 'right' ? -1000 : 0,
          opacity: 0,
        };
      },
      center: {
        x: 0,
        opacity: 1,
      },
      exit: (direction: string | null) => {
        return {
          x: direction === 'left' ? -1000 : direction === 'right' ? 1000 : 0,
          opacity: 0,
        };
      },
    };
  };

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
          <h2 className='text-4xl font-bold mb-4'>Moments</h2>
          <div className='w-16 h-1 bg-amber-100 dark:bg-sky-400 mx-auto mb-8'></div>
          <p className='text-lg max-w-2xl mx-auto dark:text-sky-200'>
            Galeri momen kebahagiaan kami yang akan selalu kami kenang.
          </p>
        </motion.div>

        {isLargeScreen ? (
          <div className='relative w-full overflow-hidden h-[700px] bg-black/5 rounded-2xl'>
            <div className='absolute inset-0 flex items-center justify-center'>
              {images.map((image, index) => {
                const isActive = index === currentSlide;
                const isPrev =
                  index === (currentSlide - 1 + images.length) % images.length;
                const isNext = index === (currentSlide + 1) % images.length;
                const isVisible = isActive || isPrev || isNext;

                let xPosition = '50%';
                let opacity = 0;
                let scale = 0.8;
                let zIndex = 0;
                let blur = 0;

                if (isActive) {
                  xPosition = '50%';
                  opacity = 1;
                  scale = 1;
                  zIndex = 30;
                  blur = 0;
                } else if (isPrev) {
                  xPosition = '25%';
                  opacity = 0.7;
                  scale = 0.85;
                  zIndex = 20;
                  blur = 3;
                } else if (isNext) {
                  xPosition = '75%';
                  opacity = 0.7;
                  scale = 0.85;
                  zIndex = 20;
                  blur = 3;
                }

                return isVisible ? (
                  <motion.div
                    key={index}
                    onClick={() => openLightbox(index)}
                    className='absolute cursor-pointer'
                    initial={false}
                    animate={{
                      x: `calc(${xPosition} - 50%)`,
                      opacity,
                      scale,
                      zIndex,
                      filter: `blur(${blur}px)`,
                    }}
                    transition={{
                      type: 'spring',
                      stiffness: 300,
                      damping: 30,
                    }}
                    style={{
                      width: '50%',
                      transformOrigin: 'center center',
                    }}
                  >
                    <img
                      src={`${image.src}tr=w-1280,q-95,f-auto`}
                      alt={image.alt}
                      loading={index !== currentSlide ? 'lazy' : 'eager'}
                      className='rounded-xl object-cover w-full h-[550px] shadow-lg'
                      srcSet={`
    ${image.src}tr=w-480,q-80,f-auto 480w,
    ${image.src}tr=w-768,q-85,f-auto 768w,
    ${image.src}tr=w-1024,q-90,f-auto 1024w,
    ${image.src}tr=w-1280,q-95,f-auto 1280w
  `}
                      sizes='(max-width: 768px) 100vw, (max-width: 1024px) 80vw, 1280px'
                    />
                  </motion.div>
                ) : null;
              })}
            </div>

            <button
              onClick={() =>
                setCurrentSlide(
                  (currentSlide - 1 + images.length) % images.length
                )
              }
              className='absolute left-8 top-1/2 -translate-y-1/2 text-white shadow-lg hover:scale-110 transition z-40'
              aria-label='Previous image'
            >
              <MdOutlineChevronLeft size={60} />
            </button>
            <button
              onClick={() =>
                setCurrentSlide((currentSlide + 1) % images.length)
              }
              className='absolute right-8 top-1/2 -translate-y-1/2 bg-none text-white shadow-lg hover:scale-110 transition z-40'
              aria-label='Next image'
            >
              <MdOutlineChevronRight size={60} />
            </button>

            <div className='absolute bottom-8 right-8 z-40'>
              <button
                onClick={toggleAutoSlide}
                className='flex items-center justify-center w-12 h-12 text-white rounded-full transition'
                aria-label={autoSlide ? 'Pause slideshow' : 'Play slideshow'}
              >
                {autoSlide ? (
                  <MdOutlinePauseCircle size={28} />
                ) : (
                  <MdOutlinePlayCircle size={28} />
                )}
              </button>
            </div>
          </div>
        ) : (
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
                    src={`${image.src}tr=w-1280,q-95,f-auto`}
                    alt={image.alt}
                    loading={index !== 0 ? 'lazy' : 'eager'}
                    className='rounded-2xl max-h-[700px] md:max-h-[500px] sm:max-h-[300px] object-cover w-full'
                  />
                </div>
              ))}
            </div>
            <div className='flex justify-end mt-2'>
              <button
                onClick={toggleAutoSlide}
                className='flex items-center justify-center w-8 h-8 border border-none text-white rounded-full hover:bg-white/10 transition'
              >
                {autoSlide ? (
                  <MdOutlinePauseCircle size={24} />
                ) : (
                  <MdOutlinePlayCircle size={24} />
                )}
              </button>
            </div>
          </div>
        )}

        <div className='flex justify-center mt-6 gap-2'>
          {images.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`w-1.5 h-1.5 rounded-full ${
                currentSlide === idx ? 'bg-white' : 'bg-white/50'
              } transition`}
            />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {lightboxOpen && selectedImageIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className='fixed inset-0 bg-black flex items-center justify-center z-50'
            onClick={closeLightbox}
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              onClick={(e) => e.stopPropagation()}
              className='relative w-full h-full flex items-center justify-center'
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              <AnimatePresence initial={false} custom={swipeDirection}>
                <motion.div
                  key={selectedImageIndex}
                  custom={swipeDirection}
                  variants={getImageVariants()}
                  initial='enter'
                  animate='center'
                  exit='exit'
                  transition={{
                    x: { type: 'spring', stiffness: 300, damping: 30 },
                    opacity: { duration: 0.2 },
                  }}
                  className='w-full h-full flex items-center justify-center'
                >
                  <img
                    src={`${images[selectedImageIndex].src}?tr=w-1920,q-90,f-auto`}
                    alt={images[selectedImageIndex].alt}
                    className='w-full h-full object-contain'
                    onClick={(e) => {
                      e.stopPropagation();
                      showControlsTemporarily();
                    }}
                    decoding='async'
                    loading='lazy'
                  />
                </motion.div>
              </AnimatePresence>

              <AnimatePresence>
                {showControls && (
                  <>
                    <motion.button
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      onClick={(e) => {
                        e.stopPropagation();
                        closeLightbox();
                      }}
                      className='absolute bottom-24 left-1/2 -translate-x-1/2 bg-white text-black p-2 rounded-full shadow-md hover:scale-110 transition z-50'
                    >
                      <IoCloseOutline size={24} />
                    </motion.button>

                    {isLargeScreen && (
                      <>
                        <motion.button
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          transition={{ duration: 0.3 }}
                          onClick={(e) => {
                            e.stopPropagation();
                            prevImage();
                          }}
                          className='absolute left-4 md:left-8 top-1/2 -translate-y-1/2 bg-black/30 text-white p-2 rounded-full shadow-md hover:bg-black/50 transition z-50'
                        >
                          <MdOutlineChevronLeft size={28} />
                        </motion.button>

                        <motion.button
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 20 }}
                          transition={{ duration: 0.3 }}
                          onClick={(e) => {
                            e.stopPropagation();
                            nextImage();
                          }}
                          className='absolute right-4 md:right-8 top-1/2 -translate-y-1/2 bg-black/30 text-white p-2 rounded-full shadow-md hover:bg-black/50 transition z-50'
                        >
                          <MdOutlineChevronRight size={28} />
                        </motion.button>
                      </>
                    )}

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 20 }}
                      transition={{ duration: 0.3 }}
                      className='absolute bottom-4 left-1/2 -translate-x-1/2 text-white text-sm bg-black/50 px-3 py-1 rounded-full'
                    >
                      {selectedImageIndex + 1} / {images.length}
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default GallerySection;
