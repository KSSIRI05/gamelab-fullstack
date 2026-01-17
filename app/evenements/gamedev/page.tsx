'use client';

import Image from "next/image";
import { motion } from "framer-motion";
import { rajdhani, orbitron } from "../../fonts";
import { FaFacebook, FaInstagram, FaDiscord, FaCalendar, FaCode, FaUsers, FaLightbulb } from 'react-icons/fa';
import Navbar from '../../components/Navbar';
import AuthButton from '../../components/AuthButton';
import { useAuth } from '../../context/AuthContext';
import { useRouter } from 'next/navigation';

export default function GameDev() {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  const handleInscription = () => {
    if (isAuthenticated) {
      alert('Inscription confirmée aux sessions GameDev!');
    } else {
      router.push('/login?returnUrl=/evenements/gamedev');
    }
  };

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
                🚀 GameDev Sessions
              </h1>
              <div className="flex items-center justify-center gap-3 text-purple-300 text-xl">
                <FaCalendar />
                <span>Sessions mensuelles</span>
              </div>
              <div className="inline-block mt-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-2 rounded-full text-sm font-bold">
                Prochaine session bientôt
              </div>
            </div>

            {/* Description */}
            <div className="mb-8">
              <h2 className={`${rajdhani.className} text-white text-3xl font-bold mb-4`}>
                À propos
              </h2>
              <p className="text-gray-300 text-lg leading-relaxed mb-4">
                Les GameDev Sessions sont des ateliers pratiques dédiés à la création de jeux vidéo. 
                Que tu sois débutant ou que tu aies déjà de l'expérience, ces sessions te permettront 
                d'apprendre les bases du développement de jeux et de créer tes propres projets.
              </p>
              <p className="text-gray-300 text-lg leading-relaxed">
                Découvre Unity, Unreal Engine, et d'autres outils de création. Travaille sur des 
                projets collaboratifs et transforme tes idées en jeux jouables !
              </p>
            </div>

            {/* Event Info Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-black/40 rounded-xl p-6 border border-purple-500/20 text-center">
                <FaCode className="text-blue-400 text-4xl mx-auto mb-3" />
                <h3 className={`${rajdhani.className} text-white text-xl font-bold mb-2`}>
                  Technologies
                </h3>
                <p className="text-gray-300">
                  Unity, Unreal Engine, Godot
                </p>
              </div>

              <div className="bg-black/40 rounded-xl p-6 border border-purple-500/20 text-center">
                <FaUsers className="text-purple-400 text-4xl mx-auto mb-3" />
                <h3 className={`${rajdhani.className} text-white text-xl font-bold mb-2`}>
                  Niveau
                </h3>
                <p className="text-gray-300">
                  Tous niveaux - Du débutant à l'avancé
                </p>
              </div>

              <div className="bg-black/40 rounded-xl p-6 border border-purple-500/20 text-center">
                <FaLightbulb className="text-yellow-400 text-4xl mx-auto mb-3" />
                <h3 className={`${rajdhani.className} text-white text-xl font-bold mb-2`}>
                  Format
                </h3>
                <p className="text-gray-300">
                  Workshops pratiques et projets
                </p>
              </div>
            </div>

            {/* Programme */}
            <div className="mb-8">
              <h2 className={`${rajdhani.className} text-white text-3xl font-bold mb-4`}>
                Ce que tu vas apprendre
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-black/40 rounded-lg p-4 border border-purple-500/20">
                  <h3 className="text-white font-bold mb-2">🎮 Game Design</h3>
                  <p className="text-gray-300 text-sm">
                    Conception de gameplay, level design, et game mechanics
                  </p>
                </div>
                <div className="bg-black/40 rounded-lg p-4 border border-purple-500/20">
                  <h3 className="text-white font-bold mb-2">💻 Programmation</h3>
                  <p className="text-gray-300 text-sm">
                    C#, Blueprints, scripting et logique de jeu
                  </p>
                </div>
                <div className="bg-black/40 rounded-lg p-4 border border-purple-500/20">
                  <h3 className="text-white font-bold mb-2">🎨 Graphismes & Assets</h3>
                  <p className="text-gray-300 text-sm">
                    Intégration d'assets, animations et effets visuels
                  </p>
                </div>
                <div className="bg-black/40 rounded-lg p-4 border border-purple-500/20">
                  <h3 className="text-white font-bold mb-2">🔊 Audio & Sound Design</h3>
                  <p className="text-gray-300 text-sm">
                    Musiques, effets sonores et ambiances
                  </p>
                </div>
              </div>
            </div>

            {/* Projets */}
            <div className="mb-8 bg-black/40 rounded-xl p-6 border border-purple-500/20">
              <h2 className={`${rajdhani.className} text-white text-2xl font-bold mb-3`}>
                Projets réalisés
              </h2>
              <ul className="text-gray-300 space-y-2">
                <li>🎯 <strong>Platformer 2D :</strong> Crée ton premier jeu de plateforme</li>
                <li>🏃 <strong>Endless Runner :</strong> Développe un runner infini addictif</li>
                <li>⚔️ <strong>Combat Game :</strong> Système de combat et animations</li>
                <li>🧩 <strong>Puzzle Game :</strong> Logique et mécaniques de puzzle</li>
                <li>🚀 <strong>Projet libre :</strong> Réalise ton propre concept de jeu</li>
              </ul>
            </div>

            {/* Infos pratiques */}
            <div className="mb-8 bg-black/40 rounded-xl p-6 border border-purple-500/20">
              <h2 className={`${rajdhani.className} text-white text-2xl font-bold mb-3`}>
                Infos pratiques
              </h2>
              <ul className="text-gray-300 space-y-2">
                <li>📍 <strong>Lieu :</strong> Lab GameDev - INPT</li>
                <li>⏰ <strong>Durée :</strong> Sessions de 3h - Un samedi par mois</li>
                <li>💻 <strong>Matériel :</strong> Apporte ton laptop (PC disponibles sur place)</li>
                <li>📚 <strong>Prérequis :</strong> Aucun - La passion suffit !</li>
                <li>🎓 <strong>Encadrement :</strong> Formateurs expérimentés et passionnés</li>
              </ul>
            </div>

            {/* CTA Button */}
            <div className="text-center">
              <motion.button
                onClick={handleInscription}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-12 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold rounded-lg transition-all duration-300 uppercase tracking-wider text-xl"
              >
                Rejoindre les sessions
              </motion.button>
              <p className="text-gray-400 mt-4">
                Places limitées - Inscription gratuite pour les membres
              </p>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
