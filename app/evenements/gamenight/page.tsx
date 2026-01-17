'use client';

import Image from "next/image";
import { motion } from "framer-motion";
import { rajdhani, orbitron } from "../../fonts";
import { FaFacebook, FaInstagram, FaDiscord, FaCalendar, FaClock, FaUsers, FaGamepad } from 'react-icons/fa';
import Navbar from '../../components/Navbar';

export default function GameNight() {
  return (
    <div className="flex flex-col min-h-screen relative">
      {/* Background Video */}
      <video
        className="fixed inset-0 w-full h-full object-cover z-0"
        autoPlay
        loop
        muted
        playsInline
      >
        <source src="/gamelab.mp4" type="video/mp4" />
      </video>
      
      {/* Dark overlay */}
      <div className="fixed inset-0 bg-black/80 z-10" />

      {/* Header */}
      <header className="relative overflow-hidden flex flex-col w-full z-20">
        <div className="flex items-center justify-between w-full py-4 px-6 bg-gradient-to-r from-purple-950 to-purple-700">
          <div className="flex items-center gap-3">
            <Image width={80} height={80} alt="GameLab Logo" src="/logo.jpeg" />
            <h1 className={`${rajdhani.className} text-white text-2xl sm:text-3xl font-bold tracking-wider`}>
              GAMELAB
            </h1>
          </div>
          <div className="hidden lg:flex">
            <Navbar />
          </div>
          <div className="flex gap-4">
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
      </header>

      {/* Event Details */}
      <main className="flex-1 px-6 py-16 relative z-20">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-br from-purple-900/60 to-black/60 backdrop-blur-md rounded-2xl p-8 md:p-12 border border-purple-500/30"
          >
            {/* Title */}
            <div className="text-center mb-8">
              <h1 className={`${orbitron.className} text-white text-5xl md:text-6xl font-bold mb-4`}>
                🎮 GameNight
              </h1>
              <div className="flex items-center justify-center gap-3 text-purple-300 text-xl">
                <FaCalendar />
                <span>Tous les vendredis</span>
              </div>
              <div className="inline-block mt-4 bg-gradient-to-r from-green-500 to-teal-500 text-white px-6 py-2 rounded-full text-sm font-bold">
                Événement récurrent
              </div>
            </div>

            {/* Description */}
            <div className="mb-8">
              <h2 className={`${rajdhani.className} text-white text-3xl font-bold mb-4`}>
                À propos
              </h2>
              <p className="text-gray-300 text-lg leading-relaxed mb-4">
                Les GameNights sont nos soirées gaming hebdomadaires conçues pour tous les membres 
                et étudiants de l'INPT. Une ambiance détendue et conviviale où le plaisir de jouer 
                prime sur la compétition.
              </p>
              <p className="text-gray-300 text-lg leading-relaxed">
                Viens te détendre après une semaine de cours, rencontrer d'autres gamers, découvrir 
                de nouveaux jeux et passer un bon moment entre passionnés. Tout le monde est le bienvenu, 
                peu importe ton niveau !
              </p>
            </div>

            {/* Event Info Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-black/40 rounded-xl p-6 border border-purple-500/20 text-center">
                <FaClock className="text-green-400 text-4xl mx-auto mb-3" />
                <h3 className={`${rajdhani.className} text-white text-xl font-bold mb-2`}>
                  Horaires
                </h3>
                <p className="text-gray-300">
                  18:00 - 23:00 tous les vendredis
                </p>
              </div>

              <div className="bg-black/40 rounded-xl p-6 border border-purple-500/20 text-center">
                <FaUsers className="text-purple-400 text-4xl mx-auto mb-3" />
                <h3 className={`${rajdhani.className} text-white text-xl font-bold mb-2`}>
                  Ambiance
                </h3>
                <p className="text-gray-300">
                  Chill, fun et conviviale
                </p>
              </div>

              <div className="bg-black/40 rounded-xl p-6 border border-purple-500/20 text-center">
                <FaGamepad className="text-blue-400 text-4xl mx-auto mb-3" />
                <h3 className={`${rajdhani.className} text-white text-xl font-bold mb-2`}>
                  Activités
                </h3>
                <p className="text-gray-300">
                  Jeux variés, tournois amicaux, lan party
                </p>
              </div>
            </div>

            {/* Ce qu'on propose */}
            <div className="mb-8">
              <h2 className={`${rajdhani.className} text-white text-3xl font-bold mb-4`}>
                Au programme
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-black/40 rounded-lg p-4 border border-purple-500/20">
                  <h3 className="text-white font-bold mb-2">🎯 Sessions libres</h3>
                  <p className="text-gray-300 text-sm">
                    Joue à tes jeux préférés avec d'autres membres
                  </p>
                </div>
                <div className="bg-black/40 rounded-lg p-4 border border-purple-500/20">
                  <h3 className="text-white font-bold mb-2">🏆 Mini-tournois</h3>
                  <p className="text-gray-300 text-sm">
                    Tournois amicaux improvisés avec petites récompenses
                  </p>
                </div>
                <div className="bg-black/40 rounded-lg p-4 border border-purple-500/20">
                  <h3 className="text-white font-bold mb-2">🎲 Découverte</h3>
                  <p className="text-gray-300 text-sm">
                    Teste de nouveaux jeux et partage tes coups de cœur
                  </p>
                </div>
                <div className="bg-black/40 rounded-lg p-4 border border-purple-500/20">
                  <h3 className="text-white font-bold mb-2">🍕 Snacks & boissons</h3>
                  <p className="text-gray-300 text-sm">
                    Ambiance décontractée avec de quoi grignoter
                  </p>
                </div>
              </div>
            </div>

            {/* Infos pratiques */}
            <div className="mb-8 bg-black/40 rounded-xl p-6 border border-purple-500/20">
              <h2 className={`${rajdhani.className} text-white text-2xl font-bold mb-3`}>
                Infos pratiques
              </h2>
              <ul className="text-gray-300 space-y-2">
                <li>📍 <strong>Lieu :</strong> Salle gaming GameLab - INPT</li>
                <li>💰 <strong>Participation :</strong> Gratuit pour les membres</li>
                <li>🎮 <strong>Matériel :</strong> PC et consoles disponibles sur place</li>
                <li>👥 <strong>Inscription :</strong> Pas obligatoire, mais recommandée pour réserver ta place</li>
              </ul>
            </div>

            {/* CTA Button */}
            <div className="text-center">
              <a href="/inscription">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-12 py-4 bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white font-bold rounded-lg transition-all duration-300 uppercase tracking-wider text-xl"
                >
                  Réserver ma place
                </motion.button>
              </a>
              <p className="text-gray-400 mt-4">
                Viens quand tu veux - Atmosphere chill garantie !
              </p>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
