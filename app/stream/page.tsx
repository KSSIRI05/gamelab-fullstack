'use client';

import Image from "next/image";
import { motion } from "framer-motion";
import { rajdhani } from "../fonts";
import { FaFacebook, FaInstagram, FaDiscord } from 'react-icons/fa';
import Navbar from '../components/Navbar';
import UniversalStream from '../components/UniversalStream';

export default function Stream() {
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

      {/* Stream Section */}
      <main className="flex-1 px-6 py-16">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <UniversalStream url="https://www.youtube.com/watch?v=jfKfPfyJRdk" title="🔴 Live GAMELAB INPT" />
          </motion.div>
        </div>
      </main>
    </div>
  );
}
