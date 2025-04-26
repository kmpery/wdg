import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';

interface Image {
  src: string;
  alt: string;
  width: string;
  height: string;
}

const GallerySection: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const images: Image[] = [
    {
      src: "https://images.pexels.com/photos/2253870/pexels-photo-2253870.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      alt: "Couple photo 1",
      width: "w-full md:w-1/3",
      height: "h-64 md:h-72"
    },
    {
      src: "https://images.pexels.com/photos/1730877/pexels-photo-1730877.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      alt: "Couple photo 2",
      width: "w-full md:w-1/3",
      height: "h-64 md:h-96"
    },
    {
      src: "https://images.pexels.com/photos/3352398/pexels-photo-3352398.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      alt: "Couple photo 3",
      width: "w-full md:w-1/3",
      height: "h-64 md:h-72"
    },
    {
      src: "https://images.pexels.com/photos/1405761/pexels-photo-1405761.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      alt: "Couple photo 4",
      width: "w-full md:w-1/2",
      height: "h-64 md:h-80"
    },
    {
      src: "https://images.pexels.com/photos/2959192/pexels-photo-2959192.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      alt: "Couple photo 5",
      width: "w-full md:w-1/2",
      height: "h-64 md:h-80"
    },
    {
      src: "https://images.pexels.com/photos/1754313/pexels-photo-1754313.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      alt: "Couple photo 6",
      width: "w-full md:w-2/3",
      height: "h-64 md:h-72"
    },
    {
      src: "https://images.pexels.com/photos/948185/pexels-photo-948185.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      alt: "Couple photo 7",
      width: "w-full md:w-1/3",
      height: "h-64 md:h-72"
    }
  ];

  const openLightbox = (src: string) => {
    setSelectedImage(src);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setSelectedImage(null);
    document.body.style.overflow = 'auto';
  };

  return (
    <section className="py-20 bg-amber-50" id="gallery">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-amber-900 mb-4">Our Gallery</h2>
          <div className="w-16 h-1 bg-amber-800 mx-auto mb-8"></div>
          <p className="text-amber-800 max-w-2xl mx-auto">
            Cherished moments we've shared throughout our journey together.
          </p>
        </motion.div>

        <div className="flex flex-wrap -mx-2">
          {images.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`p-2 ${image.width}`}
            >
              <div 
                className={`${image.height} overflow-hidden rounded-lg cursor-pointer transform transition-transform duration-300 hover:scale-105`}
                onClick={() => openLightbox(image.src)}
              >
                <img 
                  src={image.src} 
                  alt={image.alt} 
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          <button 
            className="absolute top-4 right-4 bg-white rounded-full p-2 text-black hover:bg-gray-200 transition-colors duration-300"
            onClick={closeLightbox}
          >
            <X size={24} />
          </button>
          <img 
            src={selectedImage} 
            alt="Enlarged gallery" 
            className="max-w-full max-h-[90vh] object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </section>
  );
};

export default GallerySection;