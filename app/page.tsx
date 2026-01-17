"use client"

import Image from "next/image";
import { TypeAnimation } from 'react-type-animation';
import { orbitron } from "./fonts";
import { motion } from "framer-motion";
import UniversalStream from "./components/UniversalStream";

export default function Home() {
  return (
    <div className="flex overscroll-none overflow-hidden flex-col min-h-screen">

      {/* Header */}
      <header className="relative overflow-hidden  flex items-center w-full h-25 bg-gradient-to-r from-purple-950 to-purple-700 px-6">
        {/* Logo on the left */}
        <div className="flex-none ">
          <Image
            width={100}
            height={100}
            alt="GameLab Logo"
            src="/logo.jpeg"
          />
        </div>

        {/* TypeAnimation overlay centered */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[80%] text-center">
          <TypeAnimation
            className={`${orbitron.className} text-white text-[3vh] sm:text-[4vh] `}
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
      </header>

      {/* Hero section with video background */}
      <section className="relative w-full h-screen overflow-hidden overscroll-none">
        {/* Background Video */}
        <video
          className="absolute inset-0 w-full h-full  object-cover -z-10"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src="/gamelab.mp4" type="video/mp4" />
        </video>

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/60 -z-0" />

        {/* Overlay content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-2 w-full max-w-6xl">
          <div className="absolute inset-0">

         {/* Top Left */}
  <motion.div
    className="absolute top-0 left-0 w-1/2 h-1/2 p-4 sm:p-6 flex items-center justify-center group"
  >
    <div className="w-full h-full rounded-xl backdrop-blur-sm flex flex-col justify-center text-center p-4 sm:p-6 cursor-pointer">
      {/* Title always visible */}
      <h2 className="text-white text-4xl sm:text-6xl font-extrabold drop-shadow-lg">
        Bizu Cup
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
    </div>
  </motion.div>

  {/* Top Right */}
  <motion.div
    className="absolute top-0 right-0 w-1/2 h-1/2 p-4 sm:p-6 flex items-center justify-center group"
  >
    <div className="w-full h-full rounded-xl backdrop-blur-sm flex flex-col justify-center text-center p-4 sm:p-6 cursor-pointer">
      <h2 className="text-white text-4xl sm:text-6xl font-extrabold drop-shadow-lg">
        Olympiades INPT
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
    </div>
  </motion.div>

  {/* Bottom Left */}
  <motion.div
    className="absolute bottom-0 left-0 w-1/2 h-1/2 p-4 sm:p-6 flex items-center justify-center group"
  >
    <div className="w-full h-full rounded-xl backdrop-blur-sm flex flex-col justify-center text-center p-4 sm:p-6 cursor-pointer">
      <h2 className="text-white text-4xl sm:text-6xl font-extrabold drop-shadow-lg">
        GameNight
      </h2>
      <motion.p
        className="mt-4 sm:mt-10 text-white text-lg sm:text-2xl leading-relaxed opacity-0 group-hover:opacity-100"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        Soirée chill & fun pour les membres et étudiants de l’INPT:<br />
        Games, vibes et détente.
      </motion.p>
    </div>
  </motion.div>

  {/* Bottom Right */}
  <motion.div
    className="absolute bottom-0 right-0 w-1/2 h-1/2 p-4 sm:p-6 flex items-center justify-center group"
  >
    <div className="w-full h-full rounded-xl  backdrop-blur-sm flex flex-col justify-center text-center p-4 sm:p-6 cursor-pointer">
      <h2 className="text-white text-4xl sm:text-6xl font-extrabold drop-shadow-lg">
        GameDev
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
    </div>
  </motion.div>


  </div>

    </div>
      </section>

      <UniversalStream url="https://www.youtube.com/watch?v=jfKfPfyJRdk" />

    </div>
  )
}
