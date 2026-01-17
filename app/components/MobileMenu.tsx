'use client';

import { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { rajdhani } from '../fonts';

interface MobileMenuProps {
  currentPath?: string;
}

export default function MobileMenu({ currentPath }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  const menuItems = [
    { name: 'ACCUEIL', href: '/' },
    { name: 'À PROPOS', href: '/about' },
    { name: 'ÉVÉNEMENTS', href: '/events' },
    { name: 'LIVE', href: '/stream' },
    { name: 'ÉQUIPE', href: '/team' },
    { name: 'GALERIE', href: '/gallery' },
    { name: 'CONTACT', href: '/contact' }
  ];

  return (
    <>
      {/* Bouton hamburger */}
      <button
        onClick={toggleMenu}
        className="lg:hidden flex items-center justify-center w-10 h-10 text-white hover:text-purple-300 transition-colors"
        aria-label="Menu mobile"
      >
        {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
      </button>

      {/* Overlay de fond */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
            onClick={closeMenu}
          />
        )}
      </AnimatePresence>

      {/* Menu mobile */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed top-0 right-0 h-full w-80 bg-gradient-to-b from-purple-900 to-purple-800 z-50 lg:hidden shadow-2xl"
          >
            {/* Header du menu */}
            <div className="flex items-center justify-between p-6 border-b border-purple-700">
              <h2 className={`${rajdhani.className} text-white text-2xl font-bold`}>
                GAMELAB
              </h2>
              <button
                onClick={closeMenu}
                className="text-white hover:text-purple-300 transition-colors"
              >
                <FaTimes size={24} />
              </button>
            </div>

            {/* Navigation */}
            <nav className="flex flex-col p-6">
              {menuItems.map((item, index) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  onClick={closeMenu}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`${rajdhani.className} py-4 px-4 text-lg font-semibold border-b border-purple-700/30 transition-all duration-300 hover:bg-purple-700/30 hover:px-6 ${
                    currentPath === item.href
                      ? 'text-yellow-400 bg-purple-700/20'
                      : 'text-white hover:text-yellow-400'
                  }`}
                >
                  {item.name}
                </motion.a>
              ))}
            </nav>

            {/* Footer du menu */}
            <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-purple-700">
              <p className="text-purple-300 text-center text-sm">
                © 2026 GameLab INPT
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}