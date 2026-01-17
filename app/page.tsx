"use client"

import Image from "next/image";
import { TypeAnimation } from 'react-type-animation';
import { orbitron, rajdhani } from "./fonts";
import { motion } from "framer-motion";
import UniversalStream from "./components/UniversalStream";
import { FaFacebook, FaInstagram, FaDiscord } from 'react-icons/fa';
import Navbar from './components/Navbar';
import AuthButton from './components/AuthButton';
import MobileMenu from './components/MobileMenu';
import Footer from './components/Footer';

export default function Home() {
  return (
    <div className="flex overscroll-none overflow-hidden flex-col min-h-screen">

      {/* Header */}
      <header className="relative overflow-hidden flex flex-col w-full">
        <div className="flex items-center justify-between w-full py-4 px-6 bg-gradient-to-r from-purple-950 to-purple-700 gap-4">
          <div className="flex items-center gap-3">
            <Image
              width={80}
              height={80}
              alt="GameLab Logo"
              src="/logo.jpeg"
            />
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
            <MobileMenu currentPath="/" />
          </div>
        </div>
      </header>

      {/* Hero section with video background */}
      <section className="relative w-full h-screen overflow-hidden">
        {/* Background Video */}
        <video
          className="absolute inset-0 w-full h-full object-cover z-0"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src="/gamelab.mp4" type="video/mp4" />
        </video>

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/60 z-10" />

        {/* Slogan over video */}
        <div className="absolute top-0 left-0 right-0 z-30 text-center py-6">
          <TypeAnimation
            className={`${orbitron.className} text-white text-[3vh] sm:text-[4vh] drop-shadow-2xl`}
            sequence={[
              "Welcome to GameLab's official Website",
              1000,
              "Where passion meets play",
              2000,
              "And Gamers level up together",
              2000,
            ]}
            speed={40}
            repeat={Infinity}
            wrapper="div"
          />
        </div>

        {/* Overlay content */}
        <div className="absolute inset-0 z-20">

         {/* Top Left */}
  <motion.div
    className="absolute top-0 left-0 w-1/2 h-1/2 p-4 sm:p-6 flex items-center justify-center group"
  >
    <div className="w-full h-full rounded-xl backdrop-blur-sm flex flex-col justify-center text-center p-4 sm:p-6 cursor-pointer">
      {/* Title always visible */}
      <h2 className={`${rajdhani.className} text-white text-4xl sm:text-6xl font-extrabold drop-shadow-lg`}>
        🏆 Bizu Cup
      </h2>

      {/* Description appears on hover */}
      <motion.p
        className="mt-4 sm:mt-10 text-white text-lg sm:text-2xl leading-relaxed opacity-0 group-hover:opacity-100"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        Tournoi gaming sous haute tension 🎮<br />
        Réunissant des joueurs prêts à tout pour la victoire.
      </motion.p>
      <a href="/evenements/bizu-cup">
        <motion.button
          className="mt-4 sm:mt-6 px-8 py-3 border-2 border-white bg-transparent hover:bg-white hover:text-black text-white font-semibold rounded transition-all duration-300 text-sm uppercase tracking-wider opacity-0 group-hover:opacity-100"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        >
          Participer
        </motion.button>
      </a>
    </div>
  </motion.div>

  {/* Top Right */}
  <motion.div
    className="absolute top-0 right-0 w-1/2 h-1/2 p-4 sm:p-6 flex items-center justify-center group"
  >
    <div className="w-full h-full rounded-xl backdrop-blur-sm flex flex-col justify-center text-center p-4 sm:p-6 cursor-pointer">
      <h2 className={`${rajdhani.className} text-white text-4xl sm:text-6xl font-extrabold drop-shadow-lg`}>
        🔥 Olympiades INPT
      </h2>
      <motion.p
        className="mt-4 sm:mt-10 text-white text-lg sm:text-2xl leading-relaxed opacity-0 group-hover:opacity-100"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        Événement e-sport majeur 🔥<br />
        Plusieurs écoles s’affrontent dans des matchs intenses et compétitifs.
      </motion.p>
      <a href="/evenements/olympiades">
        <motion.button
          className="mt-4 sm:mt-6 px-6 py-2 border-2 border-white bg-transparent hover:bg-white hover:text-black text-white font-semibold rounded transition-all duration-300 text-sm uppercase tracking-wider opacity-0 group-hover:opacity-100"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        >
          Participer
        </motion.button>
      </a>
    </div>
  </motion.div>

  {/* Bottom Left */}
  <motion.div
    className="absolute bottom-0 left-0 w-1/2 h-1/2 p-4 sm:p-6 flex items-center justify-center group"
  >
    <div className="w-full h-full rounded-xl backdrop-blur-sm flex flex-col justify-center text-center p-4 sm:p-6 cursor-pointer">
      <h2 className={`${rajdhani.className} text-white text-4xl sm:text-6xl font-extrabold drop-shadow-lg`}>
        🎮 GameNight
      </h2>
      <motion.p
        className="mt-4 sm:mt-10 text-white text-lg sm:text-2xl leading-relaxed opacity-0 group-hover:opacity-100"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        Soirée chill & fun pour les membres et étudiants de l&apos;INPT:<br />
        Games, vibes et détente.
      </motion.p>
      <a href="/evenements/gamenight">
        <motion.button
          className="mt-4 sm:mt-6 px-6 py-2 border-2 border-white bg-transparent hover:bg-white hover:text-black text-white font-semibold rounded transition-all duration-300 text-sm uppercase tracking-wider opacity-0 group-hover:opacity-100"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        >
          Participer
        </motion.button>
      </a>
    </div>
  </motion.div>

  {/* Bottom Right */}
  <motion.div
    className="absolute bottom-0 right-0 w-1/2 h-1/2 p-4 sm:p-6 flex items-center justify-center group"
  >
    <div className="w-full h-full rounded-xl  backdrop-blur-sm flex flex-col justify-center text-center p-4 sm:p-6 cursor-pointer">
      <h2 className={`${rajdhani.className} text-white text-4xl sm:text-6xl font-extrabold drop-shadow-lg`}>
        🚀 GameDev
      </h2>
      <motion.p
        className="mt-4 sm:mt-10 text-white text-lg sm:text-2xl leading-relaxed opacity-0 group-hover:opacity-100"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        Game Dev Sessions 🚀<br />
        Découvrir et apprendre les bases du game development.
      </motion.p>
      <a href="/evenements/gamedev">
        <motion.button
          className="mt-4 sm:mt-6 px-6 py-2 border-2 border-white bg-transparent hover:bg-white hover:text-black text-white font-semibold rounded transition-all duration-300 text-sm uppercase tracking-wider opacity-0 group-hover:opacity-100"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        >
          Participer
        </motion.button>
      </a>
    </div>
  </motion.div>

        </div>
      </section>

      {/* Live Stream Section */}
      <section className="relative w-full py-20 bg-gradient-to-b from-black via-purple-950/20 to-black">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/10 via-transparent to-transparent"></div>
        <UniversalStream 
          url="https://www.youtube.com/watch?v=jfKfPfyJRdk" 
          title="🔴 Live GAMELAB INPT"
        />
      </section>

      <Footer />
    </div>
  );
}