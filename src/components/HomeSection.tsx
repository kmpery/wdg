import React from 'react';
import { motion } from 'framer-motion';
import { Instagram } from 'lucide-react';

const HomeSection: React.FC = () => {
  return (
    <section className="py-20 bg-white" id="home">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-amber-900 mb-4">Welcome to Our Wedding</h2>
          <div className="w-16 h-1 bg-amber-800 mx-auto mb-8"></div>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="mb-6">
                <img
                  src="https://images.pexels.com/photos/8100784/pexels-photo-8100784.jpeg"
                  alt="Groom"
                  className="w-64 h-64 rounded-full mx-auto object-cover border-4 border-amber-200"
                />
              </div>
              <h3 className="text-2xl font-bold text-amber-900 mb-2">Nursalim</h3>
              <a
                href="https://instagram.com/nursalim"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-amber-800 hover:text-amber-600 transition-colors duration-300"
              >
                <Instagram size={20} className="mr-1" />
                @nursalim
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="mb-6">
                <img
                  src="https://images.pexels.com/photos/8100584/pexels-photo-8100584.jpeg"
                  alt="Bride"
                  className="w-64 h-64 rounded-full mx-auto object-cover border-4 border-amber-200"
                />
              </div>
              <h3 className="text-2xl font-bold text-amber-900 mb-2">Risa Inda Sari</h3>
              <a
                href="https://instagram.com/risaindasari"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-amber-800 hover:text-amber-600 transition-colors duration-300"
              >
                <Instagram size={20} className="mr-1" />
                @risaindasari
              </a>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mt-16 text-center bg-amber-50 p-8 rounded-lg"
          >
            <h3 className="text-2xl font-semibold text-amber-800 mb-4">Ar-Rum: 21</h3>
            <p className="italic text-amber-700">
              "And among His Signs is that He created for you mates from among yourselves, 
              that you may dwell in tranquility with them, and He has put love and mercy 
              between your hearts. Verily in that are Signs for those who reflect."
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HomeSection;