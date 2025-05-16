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
    src: 'https://ik.imagekit.io/kmpery/gallery/DSC_0258.JPG?',
    alt: 'Gallery 1',
  },
  {
    src: 'https://ik.imagekit.io/kmpery/gallery/DSC_0278.JPG?',
    alt: 'Gallery 2',
  },
  {
    src: 'https://ik.imagekit.io/kmpery/gallery/DSC_0297.JPG?',
    alt: 'Gallery 3',
  },
  {
    src: 'https://ik.imagekit.io/kmpery/gallery/DSC_0313.JPG?',
    alt: 'Gallery 4',
  },
  {
    src: 'https://ik.imagekit.io/kmpery/gallery/DSC_0320.JPG?',
    alt: 'Gallery 5',
  },
  {
    src: 'https://ik.imagekit.io/kmpery/gallery/DSC_0318.JPG?',
    alt: 'Gallery 6',
  },
  {
    src: 'https://ik.imagekit.io/kmpery/gallery/DSC_0248.JPG?',
    alt: 'Gallery 7',
  },
  {
    src: 'https://ik.imagekit.io/kmpery/gallery/DSC_0249.JPG?',
    alt: 'Gallery 8',
  },
  {
    src: 'https://ik.imagekit.io/kmpery/gallery/DSC_0247.JPG?',
    alt: 'Gallery 9',
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
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isLargeScreen = useIsLargeScreen();

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

  // Add scroll lock effect
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

  const toggleAutoSlide = () => setAutoSlide(!autoSlide);

  const showControlsTemporarily = () => {
    setShowControls(true);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setShowControls(false), 3000);
  };

  const handleSwipeLeft = () => nextImage();
  const handleSwipeRight = () => prevImage();

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
                      src={`${image.src}tr=w-auto,dpr-auto,q-95,f-auto`}
                      alt={image.alt}
                      // loading={index !== currentSlide ? 'lazy' : 'eager'}
                      className='rounded-xl object-cover w-full h-[550px] shadow-lg'
                      srcSet={`
    ${image.src}tr=w-480,dpr-auto,q-80,f-auto 480w,
    ${image.src}tr=w-768,dpr-auto,q-85,f-auto 768w,
    ${image.src}tr=w-1024,dpr-auto,q-90,f-auto 1024w,
    ${image.src}tr=w-1280,dpr-auto,q-95,f-auto 1280w
  `}
                      sizes='(max-width: 768px) 100vw, (max-width: 1024px) 80vw, 50vw'
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
                    src={`${image.src}tr=w-auto,dpr-auto,q-95,f-auto`}
                    alt={image.alt}
                    // loading={index !== 0 ? 'lazy' : 'eager'}
                    className='rounded-2xl max-h-[700px] md:max-h-[500px] sm:max-h-[300px] object-cover w-full'
                    srcSet={`
    ${image.src}tr=w-480,dpr-auto,q-80,f-auto 480w,
    ${image.src}tr=w-768,dpr-auto,q-85,f-auto 768w,
    ${image.src}tr=w-1024,dpr-auto,q-90,f-auto 1024w,
    ${image.src}tr=w-1280,dpr-auto,q-95,f-auto 1280w
  `}
                    sizes='(max-width: 768px) 100vw, (max-width: 1024px) 90vw, 100vw'
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
              className={`w-2.5 h-2.5 rounded-full ${
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
              className='relative w-screen h-screen flex items-center justify-center'
              onTouchStart={(e) => {
                const touch = e.touches[0];
                const startX = touch.clientX;

                const handleTouchMove = (e: TouchEvent) => {
                  const touch = e.touches[0];
                  const diffX = touch.clientX - startX;

                  if (diffX > 50) {
                    handleSwipeRight();
                    showControlsTemporarily();
                    document.removeEventListener('touchmove', handleTouchMove);
                  } else if (diffX < -50) {
                    handleSwipeLeft();
                    showControlsTemporarily();
                    document.removeEventListener('touchmove', handleTouchMove);
                  }
                };

                document.addEventListener('touchmove', handleTouchMove, {
                  passive: true,
                });
                document.addEventListener(
                  'touchend',
                  () => {
                    document.removeEventListener('touchmove', handleTouchMove);
                  },
                  { once: true }
                );
              }}
            >
              <AnimatePresence>
                {showControls && (
                  <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    onClick={closeLightbox}
                    className='absolute bottom-24 left-1/2 -translate-x-1/2 bg-white text-black p-2 rounded-full shadow-md hover:scale-110 transition'
                  >
                    <IoCloseOutline size={24} />
                  </motion.button>
                )}
              </AnimatePresence>

              <motion.img
                src={`${images[selectedImageIndex].src}?tr=w-auto,dpr-auto,q-95,f-auto`}
                alt={images[selectedImageIndex].alt}
                className='w-screen h-screen object-contain'
                onClick={showControlsTemporarily}
                decoding='async'
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default GallerySection;
