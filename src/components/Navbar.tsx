import React, { useState, useEffect, useRef } from 'react';
import { FaRegHeart } from 'react-icons/fa';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const topOpenRef = useRef<SVGAnimateElement>(null);
  const topCloseRef = useRef<SVGAnimateElement>(null);
  const bottomOpenRef = useRef<SVGAnimateElement>(null);
  const bottomCloseRef = useRef<SVGAnimateElement>(null);

  const menuItems = [
    { href: '#home', label: 'Home' },
    { href: '#event', label: 'Event' },
    { href: '#story', label: 'Story' },
    { href: '#gallery', label: 'Gallery' },
    { href: '#rsvp', label: 'Rsvp' },
    { href: '#gifts', label: 'Gifts' },
    { href: '#greetings', label: 'Greetings' },
    {
      href: '#footer',
      label: (
        <div className='flex'>
          <FaRegHeart className='text-red-400 dark:text-sky-400 hover:text-amber-800 dark:hover:text-sky-950' />
        </div>
      ),
    },
  ];

  useEffect(() => {
    const savedMode = localStorage.getItem('theme');
    if (savedMode === 'dark') {
      document.documentElement.classList.add('dark');
      setDarkMode(true);
    }
  }, []);

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem('theme', newMode ? 'dark' : 'light');
    document.documentElement.classList.toggle('dark', newMode);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      const yOffset = -58;
      const y =
        element.getBoundingClientRect().top + window.pageYOffset + yOffset;

      window.scrollTo({ top: y, behavior: 'smooth' });

      setTimeout(() => {
        setIsMenuOpen(false);
      }, 500);
    }
  };

  useEffect(() => {
    if (isMenuOpen) {
      topOpenRef.current?.beginElement();
      bottomOpenRef.current?.beginElement();
    } else {
      topCloseRef.current?.beginElement();
      bottomCloseRef.current?.beginElement();
    }
  }, [isMenuOpen]);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, [isMenuOpen]);

  return (
    <>
      {isScrolled && (
        <header className='fixed top-0 left-0 right-0 z-50 transition-all duration-300 backdrop-blur-md bg-white/60 dark:bg-gray-900/60 border-b border-gray-300 dark:border-gray-700'>
          <nav className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
            <div className='flex justify-between items-center h-14'>
              {/* Logo */}
              <div className='flex-shrink-0'>
                <a
                  href='#hero'
                  className='flex items-center gap-x-1 text-gray-900 dark:text-white text-base font-medium tracking-wide hover:opacity-80 transition leading-tight'
                >
                  <span>A</span>
                  <FaRegHeart
                    size={14}
                    className='text-red-400 dark:text-sky-400 hover:text-amber-600 dark:hover:text-sky-200'
                  />
                  <span>R</span>
                </a>
              </div>

              {/* Desktop Menu */}
              <div className='hidden md:flex space-x-12 text-sm'>
                {menuItems.map((item) => (
                  <button
                    key={item.href}
                    onClick={() => scrollToSection(item.href)}
                    className='text-gray-800 dark:text-gray-200 hover:text-amber-800 dark:hover:text-sky-400 transition-colors font-light'
                  >
                    {item.label}
                  </button>
                ))}
              </div>

              {/* Actions */}
              <div className='flex items-center space-x-3'>
                {/* Theme Toggle Button */}
                <button
                  onClick={toggleDarkMode}
                  className={`relative w-10 h-6 rounded-full transition-colors duration-300 focus:outline-none shadow-custom-inset ${
                    darkMode ? 'bg-gray-300' : 'bg-gray-50'
                  }`}
                >
                  <span
                    className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full flex items-center justify-center transition-all duration-300 ${
                      darkMode
                        ? 'translate-x-4 bg-sky-950 text-sky-400'
                        : 'translate-x-0 bg-amber-950 text-amber-400'
                    }`}
                  >
                    {darkMode ? (
                      <svg
                        className='w-4 h-4'
                        viewBox='0 0 24 24'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'
                      >
                        {' '}
                        <g transform='scale(1.1) translate(-1.2, -1.2)'>
                          <path
                            fill='currentColor'
                            d='M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z'
                          />
                        </g>
                      </svg>
                    ) : (
                      <svg
                        className='w-4 h-4'
                        viewBox='0 0 24 24'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'
                      >
                        <g stroke='currentColor' strokeWidth='2'>
                          <circle cx='12' cy='12' r='6' fill='currentColor' />
                          <line x1='12' y1='1' x2='12' y2='3' />
                          <line x1='12' y1='21' x2='12' y2='23' />
                          <line x1='4.22' y1='4.22' x2='5.64' y2='5.64' />
                          <line x1='18.36' y1='18.36' x2='19.78' y2='19.78' />
                          <line x1='1' y1='12' x2='3' y2='12' />
                          <line x1='21' y1='12' x2='23' y2='12' />
                          <line x1='4.22' y1='19.78' x2='5.64' y2='18.36' />
                          <line x1='18.36' y1='5.64' x2='19.78' y2='4.22' />
                        </g>
                      </svg>
                    )}
                  </span>
                </button>

                {/* Hamburger */}
                <button
                  className='relative w-12 h-6 flex items-center justify-center rounded-full focus:outline-none md:hidden'
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                  <svg
                    className='w-6 h-6 stroke-sky-950 dark:stroke-sky-50'
                    viewBox='0 0 18 18'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    {/* Bottom Line */}
                    <polyline
                      id='globalnav-menutrigger-bread-bottom'
                      fill='none'
                      strokeWidth='1.5'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      points='2 12, 16 12'
                    >
                      <animate
                        ref={bottomOpenRef}
                        attributeName='points'
                        keyTimes='0;0.5;1'
                        dur='0.24s'
                        begin='indefinite'
                        fill='freeze'
                        calcMode='spline'
                        keySplines='0.42,0,1,1;0,0,0.58,1'
                        values='2 12, 16 12; 2 9, 16 9; 3.5 15, 15 3.5'
                      />
                      <animate
                        ref={bottomCloseRef}
                        attributeName='points'
                        keyTimes='0;0.5;1'
                        dur='0.24s'
                        begin='indefinite'
                        fill='freeze'
                        calcMode='spline'
                        keySplines='0.42,0,1,1;0,0,0.58,1'
                        values='3.5 15, 15 3.5; 2 9, 16 9; 2 12, 16 12'
                      />
                    </polyline>

                    {/* Top Line */}
                    <polyline
                      id='globalnav-menutrigger-bread-top'
                      fill='none'
                      strokeWidth='1.5'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      points='2 5, 16 5'
                    >
                      <animate
                        ref={topOpenRef}
                        attributeName='points'
                        keyTimes='0;0.5;1'
                        dur='0.24s'
                        begin='indefinite'
                        fill='freeze'
                        calcMode='spline'
                        keySplines='0.42,0,1,1;0,0,0.58,1'
                        values='2 5, 16 5; 2 9, 16 9; 3.5 3.5, 15 15'
                      />
                      <animate
                        ref={topCloseRef}
                        attributeName='points'
                        keyTimes='0;0.5;1'
                        dur='0.24s'
                        begin='indefinite'
                        fill='freeze'
                        calcMode='spline'
                        keySplines='0.42,0,1,1;0,0,0.58,1'
                        values='3.5 3.5, 15 15; 2 9, 16 9; 2 5, 16 5'
                      />
                    </polyline>
                  </svg>
                </button>
              </div>
            </div>

            {/* Mobile Menu */}
            <div
              className={`md:hidden transition-all overflow-hidden duration-1000 ease-in-out ${
                isMenuOpen ? 'h-screen py-20' : 'max-h-0 pointer-events-none'
              }`}
            >
              <div className='flex flex-col justify-start h-full px-10 space-y-6'>
                {menuItems.map((item, index) => (
                  <button
                    key={item.href}
                    onClick={() => scrollToSection(item.href)}
                    style={{ transitionDelay: `${index * 100}ms` }}
                    className={`text-left w-full text-4xl transition-all duration-500 transform ${
                      isMenuOpen
                        ? 'opacity-100 translate-y-0'
                        : 'opacity-0 translate-y-4'
                    } text-amber-800 dark:text-gray-200 hover:text-amber-400 dark:hover:text-sky-400 font-light`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          </nav>
        </header>
      )}
    </>
  );
};

export default Navbar;
