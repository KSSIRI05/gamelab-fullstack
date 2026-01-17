'use client';

import Image from "next/image";
import { motion } from "framer-motion";
import { rajdhani, orbitron } from "../fonts";
import { FaFacebook, FaInstagram, FaDiscord, FaImage } from 'react-icons/fa';
import Navbar from '../components/Navbar';

export default function Gallery() {
  // Ajoutez ici les liens de vos posts Instagram
  const instagramPosts = [
    "https://www.instagram.com/p/DPjbbF-jQFr/",
    "https://www.instagram.com/p/DQCrcDfAr7y/",
    "https://www.instagram.com/p/DP_ZOE1DO4h/",
    "https://www.instagram.com/p/DPg55quDYMq/",
    "https://www.instagram.com/p/DPJthS3jWul/",
    "https://www.instagram.com/p/DO6pjXgjXOE/",
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900">
      {/* Header */}
      <header className="relative overflow-hidden flex flex-col w-full">
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

      {/* Gallery Grid */}
      <main className="flex-1 px-6 py-16">
        <div className="max-w-6xl mx-auto">
          
          <h2 className={`${rajdhani.className} text-white text-4xl font-bold mb-12 text-center`}>
            Nos derniers posts Instagram
          </h2>
          
          {/* Instagram Posts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {instagramPosts.map((postUrl, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gradient-to-br from-purple-900/20 to-black border border-purple-500/30 rounded-xl overflow-hidden"
              >
                <iframe
                  src={`${postUrl}embed`}
                  className="w-full border-0"
                  style={{ minHeight: '500px' }}
                  allowTransparency={true}
                  scrolling="no"
                  frameBorder="0"
                  title={`Instagram post ${index + 1}`}
                />
              </motion.div>
            ))}
          </div>

          {/* Instagram Feed Invitation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 border border-purple-500/30 rounded-xl p-12 text-center"
          >
            <FaInstagram className="text-pink-400 text-6xl mx-auto mb-6" />
            <h3 className={`${rajdhani.className} text-white text-3xl font-bold mb-4`}>
              Suivez nos derniers posts
            </h3>
            <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
              Découvrez tous nos événements, tournois et moments forts en direct sur notre Instagram ! 
              Restez connectés pour ne rien manquer de l'actualité gaming de GameLab INPT.
            </p>
            <a 
              href="https://www.instagram.com/gamelabinpt/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white font-bold rounded-lg transition-all duration-300 uppercase tracking-wider text-lg"
            >
              <FaInstagram size={24} />
              Suivre @gamelabinpt
            </a>
          </motion.div>

        </div>
      </main>
    </div>
  );
}
