import React from 'react';
import { ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';

const MapLocation: React.FC = () => {
  // Mock location coordinates for Bali
  const mapSrc = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3944.2919204907634!2d115.17265827580221!3d-8.67237289059062!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd2471f02f59851%3A0x8539d5177d828148!2sThe%20Apurva%20Kempinski%20Bali!5e0!3m2!1sen!2sid!4v1720523933277!5m2!1sen!2sid";
  
  const googleMapsUrl = "https://goo.gl/maps/m5YQzH62cYP5rEf36";

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="h-96 w-full">
        <iframe 
          src={mapSrc} 
          width="100%" 
          height="100%" 
          style={{ border: 0 }} 
          allowFullScreen={false} 
          loading="lazy" 
          referrerPolicy="no-referrer-when-downgrade"
          title="Wedding Location"
          className="w-full h-full"
        ></iframe>
      </div>
      <div className="p-4 text-center">
        <motion.a
          href={googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="inline-flex items-center justify-center px-6 py-3 bg-amber-800 text-white rounded-full hover:bg-amber-900 transition-colors duration-300"
        >
          <ExternalLink size={16} className="mr-2" />
          <span>View Map</span>
        </motion.a>
      </div>
    </div>
  );
};

export default MapLocation;