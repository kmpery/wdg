import React from 'react';
import { Heart, Instagram, Mail, Phone } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="py-12 bg-amber-900 text-amber-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">Alim & Risa</h2>
          <p>July 10, 2025</p>
        </div>
        
        <div className="flex justify-center space-x-6 mb-8">
          <a 
            href="https://instagram.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:text-white transition-colors duration-300"
          >
            <Instagram size={24} />
          </a>
          <a 
            href="mailto:contact@alimrisa.com" 
            className="hover:text-white transition-colors duration-300"
          >
            <Mail size={24} />
          </a>
          <a 
            href="tel:+1234567890" 
            className="hover:text-white transition-colors duration-300"
          >
            <Phone size={24} />
          </a>
        </div>
        
        <div className="text-center">
          <p className="flex items-center justify-center">
            Made with <Heart size={16} className="mx-2 text-red-400" /> by Perri
          </p>
          <p className="mt-4 text-sm opacity-75">
            &copy; {new Date().getFullYear()} Alim & Risa Wedding. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;