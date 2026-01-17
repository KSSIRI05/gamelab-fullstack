'use client';

import Image from "next/image";
import { motion } from "framer-motion";
import { rajdhani, orbitron } from "../../fonts";
import { FaFacebook, FaInstagram, FaDiscord, FaTrophy, FaUsers, FaCalendar, FaGamepad } from 'react-icons/fa';
import Navbar from '../../components/Navbar';
import AuthButton from '../../components/AuthButton';
import { useAuth } from '../../context/AuthContext';
import { useRouter } from 'next/navigation';

export default function BizuCup() {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  const handleInscription = () => {
    if (isAuthenticated) {
      alert('Inscription confirmée! Nous vous contacterons bientôt.');
    } else {
      router.push('/login?returnUrl=/evenements/bizu-cup');
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
                🏆 Bizu Cup 2026
              </h1>
              <div className="flex items-center justify-center gap-3 text-purple-300 text-xl">
                <FaCalendar />
                <span>15 Mars 2026</span>
              </div>
              <div className="inline-block mt-4 bg-gradient-to-r from-red-500 to-orange-500 text-white px-6 py-2 rounded-full text-sm font-bold">
                Inscriptions ouvertes
              </div>
            </div>

            {/* Description */}
            <div className="mb-8">
              <h2 className={`${rajdhani.className} text-white text-3xl font-bold mb-4`}>
                À propos
              </h2>
              <p className="text-gray-300 text-lg leading-relaxed mb-4">
                La Bizu Cup est le tournoi gaming le plus attendu de l'année à l'INPT ! 
                Un événement e-sport de haut niveau qui réunit les meilleurs joueurs de la région 
                pour des compétitions intenses et passionnantes.
              </p>
              <p className="text-gray-300 text-lg leading-relaxed">
                Que tu sois un joueur confirmé ou que tu veuilles simplement vivre l'expérience, 
                la Bizu Cup est l'événement gaming à ne pas manquer. Rejoins-nous pour une journée 
                remplie d'action, de stratégie et de fair-play !
              </p>
            </div>

            {/* Event Info Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-black/40 rounded-xl p-6 border border-purple-500/20 text-center">
                <FaTrophy className="text-yellow-400 text-4xl mx-auto mb-3" />
                <h3 className={`${rajdhani.className} text-white text-xl font-bold mb-2`}>
                  Prix à gagner
                </h3>
                <p className="text-gray-300">
                  Récompenses et trophées pour les meilleures équipes
                </p>
              </div>

              <div className="bg-black/40 rounded-xl p-6 border border-purple-500/20 text-center">
                <FaUsers className="text-purple-400 text-4xl mx-auto mb-3" />
                <h3 className={`${rajdhani.className} text-white text-xl font-bold mb-2`}>
                  Format
                </h3>
                <p className="text-gray-300">
                  Tournoi en équipe - Brackets à élimination directe
                </p>
              </div>

              <div className="bg-black/40 rounded-xl p-6 border border-purple-500/20 text-center">
                <FaGamepad className="text-green-400 text-4xl mx-auto mb-3" />
                <h3 className={`${rajdhani.className} text-white text-xl font-bold mb-2`}>
                  Jeux
                </h3>
                <p className="text-gray-300">
                  League of Legends, Valorant, FIFA
                </p>
              </div>
            </div>

            {/* Programme */}
            <div className="mb-8">
              <h2 className={`${rajdhani.className} text-white text-3xl font-bold mb-4`}>
                Programme
              </h2>
              <div className="space-y-3">
                <div className="bg-black/40 rounded-lg p-4 border border-purple-500/20">
                  <span className="text-purple-400 font-bold">09:00 - 10:00</span>
                  <span className="text-white ml-4">Accueil et inscription sur place</span>
                </div>
                <div className="bg-black/40 rounded-lg p-4 border border-purple-500/20">
                  <span className="text-purple-400 font-bold">10:00 - 13:00</span>
                  <span className="text-white ml-4">Phase de groupes</span>
                </div>
                <div className="bg-black/40 rounded-lg p-4 border border-purple-500/20">
                  <span className="text-purple-400 font-bold">13:00 - 14:00</span>
                  <span className="text-white ml-4">Pause déjeuner</span>
                </div>
                <div className="bg-black/40 rounded-lg p-4 border border-purple-500/20">
                  <span className="text-purple-400 font-bold">14:00 - 17:00</span>
                  <span className="text-white ml-4">Phase éliminatoire</span>
                </div>
                <div className="bg-black/40 rounded-lg p-4 border border-purple-500/20">
                  <span className="text-purple-400 font-bold">17:00 - 18:00</span>
                  <span className="text-white ml-4">Finale et cérémonie de remise des prix</span>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <div className="text-center">
              <motion.button
                onClick={handleInscription}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-12 py-4 bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white font-bold rounded-lg transition-all duration-300 uppercase tracking-wider text-xl"
              >
                S'inscrire maintenant
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
