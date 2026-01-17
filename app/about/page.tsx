'use client';

import Image from "next/image";
import { motion } from "framer-motion";
import { rajdhani } from "../fonts";
import { FaFacebook, FaInstagram, FaDiscord, FaGamepad, FaTrophy, FaUsers } from 'react-icons/fa';
import Navbar from '../components/Navbar';
import AuthButton from '../components/AuthButton';

export default function About() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-gray-900 to-black">
      {/* Header */}
      <header className="relative overflow-hidden flex flex-col w-full bg-gradient-to-r from-purple-950 to-purple-700 px-6">
        <div className="flex items-center justify-between w-full py-4">
          <div className="flex items-center gap-3">
            <Image width={80} height={80} alt="GameLab Logo" src="/logo.jpeg" />
            <h1 className={`${rajdhani.className} text-white text-2xl sm:text-3xl font-bold tracking-wider`}>
              GAMELAB
            </h1>
          </div>
          <div className="hidden lg:flex">
            <Navbar />
          </div>
          <div className="flex items-center gap-4">
            <AuthButton />
            <div className="flex gap-3">
            <a href="https://www.facebook.com/gamelab.inpt.7" target="_blank" rel="noopener noreferrer" className="text-white hover:text-purple-300 transition-colors duration-300">
              <FaFacebook size={32} />
            </a>
            <a href="https://www.instagram.com/gamelabinpt/" target="_blank" rel="noopener noreferrer" className="text-white hover:text-purple-300 transition-colors duration-300">
              <FaInstagram size={32} />
            </a>
            <a href="https://discord.gg/kqSCjXQJ" target="_blank" rel="noopener noreferrer" className="text-white hover:text-purple-300 transition-colors duration-300">
              <FaDiscord size={32} />
            </a>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 px-6 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Introduction */}
          <motion.section 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-16 text-center"
          >
            <h2 className={`${rajdhani.className} text-white text-3xl sm:text-4xl font-bold mb-6`}>
              Qui Sommes-Nous ?
            </h2>
            <p className="text-gray-300 text-lg leading-relaxed max-w-4xl mx-auto">
              GameLab INPT est le club gaming de référence de l'Institut National des Postes et Télécommunications. 
              Fondé par des passionnés de jeux vidéo, nous réunissons une communauté dynamique de joueurs, 
              développeurs et créateurs autour de notre passion commune pour le gaming et l'e-sport.
            </p>
          </motion.section>

          {/* Mission Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-purple-900/30 backdrop-blur-sm rounded-xl p-6 border border-purple-500/20"
            >
              <FaGamepad className="text-purple-400 text-5xl mb-4 mx-auto" />
              <h3 className={`${rajdhani.className} text-white text-2xl font-bold mb-3 text-center`}>
                Gaming
              </h3>
              <p className="text-gray-300 text-center">
                Organiser des sessions gaming régulières et créer une communauté de joueurs passionnés.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-orange-900/30 backdrop-blur-sm rounded-xl p-6 border border-orange-500/20"
            >
              <FaTrophy className="text-orange-400 text-5xl mb-4 mx-auto" />
              <h3 className={`${rajdhani.className} text-white text-2xl font-bold mb-3 text-center`}>
                E-Sport
              </h3>
              <p className="text-gray-300 text-center">
                Participer et organiser des tournois compétitifs pour représenter l'INPT.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-blue-900/30 backdrop-blur-sm rounded-xl p-6 border border-blue-500/20"
            >
              <FaUsers className="text-blue-400 text-5xl mb-4 mx-auto" />
              <h3 className={`${rajdhani.className} text-white text-2xl font-bold mb-3 text-center`}>
                Communauté
              </h3>
              <p className="text-gray-300 text-center">
                Créer un espace d'échange et de partage pour tous les étudiants gamers de l'INPT.
              </p>
            </motion.div>
          </div>

          {/* Histoire */}
          <motion.section 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="bg-gradient-to-r from-purple-900/20 to-blue-900/20 backdrop-blur-sm rounded-xl p-8 border border-purple-500/20"
          >
            <h2 className={`${rajdhani.className} text-white text-3xl font-bold mb-6`}>
              Notre Histoire
            </h2>
            <div className="space-y-4 text-gray-300">
              <p className="leading-relaxed">
                Créé en 2019, GameLab INPT est né de la volonté de quelques étudiants passionnés de créer 
                un espace dédié au gaming au sein de notre école. Depuis nos débuts, nous avons organisé 
                des dizaines d'événements et rassemblé des centaines d'étudiants autour de notre passion commune.
              </p>
              <p className="leading-relaxed">
                Au fil des années, le club s'est développé pour devenir une référence dans l'e-sport étudiant, 
                organisant des tournois majeurs comme la Bizu Cup et participant aux Olympiades INPT. 
                Nous avons également lancé des initiatives de développement de jeux vidéo et des soirées gaming régulières.
              </p>
              <p className="leading-relaxed">
                Aujourd'hui, GameLab INPT continue d'innover et de grandir, toujours fidèle à sa mission : 
                promouvoir le gaming sous toutes ses formes et créer une communauté soudée et accueillante 
                pour tous les étudiants de l'INPT.
              </p>
            </div>
          </motion.section>
        </div>
      </main>
    </div>
  );
}
