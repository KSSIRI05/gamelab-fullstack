'use client';

import Image from "next/image";
import { motion } from "framer-motion";
import { rajdhani } from "../fonts";
import { FaFacebook, FaInstagram, FaDiscord, FaEnvelope, FaMapMarkerAlt, FaPhone, FaHeart } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-gray-900 to-black text-white">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Logo et description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="col-span-1 lg:col-span-2"
          >
            <div className="flex items-center gap-3 mb-4">
              <Image
                width={60}
                height={60}
                alt="GameLab Logo"
                src="/logo.jpeg"
                className="rounded-lg"
              />
              <h3 className={`${rajdhani.className} text-2xl font-bold text-white`}>
                GAMELAB INPT
              </h3>
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Club de gaming de l'Institut National des Postes et Télécommunications. 
              Nous organisons des tournois, événements e-sport et soirées gaming pour 
              rassembler la communauté étudiante autour de notre passion commune.
            </p>
            
            {/* Réseaux sociaux */}
            <div className="flex gap-4">
              <a 
                href="https://www.facebook.com/gamelab.inpt.7" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-center w-12 h-12 bg-blue-600 hover:bg-blue-700 rounded-full transition-colors duration-300"
                aria-label="Facebook"
              >
                <FaFacebook size={20} />
              </a>
              <a 
                href="https://www.instagram.com/gamelabinpt/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 rounded-full transition-all duration-300"
                aria-label="Instagram"
              >
                <FaInstagram size={20} />
              </a>
              <a 
                href="https://discord.gg/kqSCjXQJ" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-center w-12 h-12 bg-indigo-600 hover:bg-indigo-700 rounded-full transition-colors duration-300"
                aria-label="Discord"
              >
                <FaDiscord size={20} />
              </a>
            </div>
          </motion.div>

          {/* Liens rapides */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="col-span-1"
          >
            <h4 className={`${rajdhani.className} text-xl font-bold mb-4 text-white`}>
              Navigation
            </h4>
            <ul className="space-y-2">
              {[
                { name: 'Accueil', href: '/' },
                { name: 'À Propos', href: '/about' },
                { name: 'Événements', href: '/events' },
                { name: 'Live Stream', href: '/stream' },
                { name: 'Équipe', href: '/team' },
                { name: 'Galerie', href: '/gallery' }
              ].map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-colors duration-300 hover:translate-x-1 inline-block"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="col-span-1"
          >
            <h4 className={`${rajdhani.className} text-xl font-bold mb-4 text-white`}>
              Contact
            </h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-3">
                <FaEnvelope className="text-purple-400 flex-shrink-0" />
                <a 
                  href="mailto:inpt.gamelab@gmail.com"
                  className="text-gray-300 hover:text-white transition-colors duration-300"
                >
                  inpt.gamelab@gmail.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <FaMapMarkerAlt className="text-purple-400 flex-shrink-0 mt-1" />
                <span className="text-gray-300">
                  Institut National des Postes<br />
                  et Télécommunications<br />
                  Rabat, Maroc
                </span>
              </li>
            </ul>

            {/* Événements à venir */}
            <div className="mt-6 p-4 bg-purple-900/30 rounded-lg border border-purple-700/30">
              <h5 className="text-white font-semibold mb-2">Prochain Événement</h5>
              <p className="text-purple-300 text-sm">
                🏆 Bizu Cup 2026<br />
                15 Mars 2026
              </p>
            </div>
          </motion.div>
        </div>

        {/* Ligne de séparation */}
        <div className="border-t border-gray-700 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <span className="text-gray-300">© 2026 GameLab INPT. Tous droits réservés.</span>
            </div>
            <div className="flex items-center gap-2 text-gray-300">
              <span>Made with</span>
              <FaHeart className="text-red-500 animate-pulse" />
              <span>par l'équipe GameLab</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}