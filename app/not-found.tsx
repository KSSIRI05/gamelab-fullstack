'use client';

import { motion } from "framer-motion";
import { rajdhani, orbitron } from "./fonts";
import { FaGamepad, FaHome, FaSearch } from 'react-icons/fa';
import Image from "next/image";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-purple-900 to-black flex items-center justify-center px-6">
      <div className="max-w-4xl mx-auto text-center">
        
        {/* Animation de gaming */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", bounce: 0.5, duration: 1 }}
          className="mb-8"
        >
          <div className="relative">
            <motion.div
              animate={{ 
                rotate: [0, 10, -10, 0],
                scale: [1, 1.1, 0.9, 1]
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
              className="text-purple-400 mx-auto mb-6"
            >
              <FaGamepad size={120} />
            </motion.div>
            
            {/* Particules flottantes */}
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-purple-400 rounded-full"
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, -20, 0],
                  opacity: [0.3, 1, 0.3],
                }}
                transition={{
                  duration: 2 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
              />
            ))}
          </div>
        </motion.div>

        {/* Erreur 404 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="mb-8"
        >
          <h1 className={`${orbitron.className} text-8xl md:text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 mb-4`}>
            404
          </h1>
          <h2 className={`${rajdhani.className} text-3xl md:text-4xl font-bold text-white mb-6`}>
            Game Over !
          </h2>
          <p className="text-xl text-gray-300 mb-8 leading-relaxed">
            Oops ! Il semble que vous ayez pris un mauvais chemin dans notre monde gaming.<br />
            Cette page n'existe pas ou a été déplacée.
          </p>
        </motion.div>

        {/* Logo GameLab */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mb-8"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <Image
              width={80}
              height={80}
              alt="GameLab Logo"
              src="/logo.jpeg"
              className="rounded-lg"
            />
            <h3 className={`${rajdhani.className} text-3xl font-bold text-white`}>
              GAMELAB INPT
            </h3>
          </div>
        </motion.div>

        {/* Boutons d'action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <motion.a
            href="/"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-bold rounded-lg transition-all duration-300 shadow-lg hover:shadow-purple-500/25"
          >
            <FaHome size={20} />
            Retour à l'accueil
          </motion.a>

          <motion.a
            href="/events"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-3 px-8 py-4 border-2 border-purple-500 text-purple-400 hover:bg-purple-500 hover:text-white font-bold rounded-lg transition-all duration-300"
          >
            <FaGamepad size={20} />
            Voir les événements
          </motion.a>
        </motion.div>

        {/* Message d'aide */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="mt-12 p-6 bg-gray-800/50 rounded-lg border border-purple-500/30"
        >
          <h4 className={`${rajdhani.className} text-xl font-bold text-white mb-3`}>
            Besoin d'aide ?
          </h4>
          <p className="text-gray-300 mb-4">
            Si vous pensez qu'il s'agit d'une erreur, contactez-nous !
          </p>
          <a
            href="/contact"
            className="text-purple-400 hover:text-purple-300 transition-colors font-semibold"
          >
            → Nous contacter
          </a>
        </motion.div>

        {/* Easter egg pour les gamers */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="mt-8"
        >
          <p className="text-gray-500 text-sm">
            💡 Tip: Essayez de redémarrer votre navigateur... Oh wait, ce n'est pas un jeu ! 😄
          </p>
        </motion.div>
      </div>
    </div>
  );
}