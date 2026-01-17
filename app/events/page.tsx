'use client';

import Image from "next/image";
import { motion } from "framer-motion";
import { rajdhani, orbitron } from "../fonts";
import { FaFacebook, FaInstagram, FaDiscord, FaCalendar } from 'react-icons/fa';
import Navbar from '../components/Navbar';

export default function Events() {
  const upcomingEvents = [
    {
      id: 1,
      title: "🏆 Bizu Cup 2026",
      date: "15 Mars 2026",
      description: "Tournoi e-sport majeur avec des équipes de toute la région",
      status: "Inscriptions ouvertes",
      color: "from-red-500 to-orange-500"
    },
    {
      id: 2,
      title: "🔥 Olympiades INPT",
      date: "22 Avril 2026",
      description: "Compétition inter-écoles avec plusieurs jeux",
      status: "Bientôt disponible",
      color: "from-orange-500 to-yellow-500"
    },
    {
      id: 3,
      title: "🎮 GameNight",
      date: "Tous les vendredis",
      description: "Soirées gaming détente pour tous les membres",
      status: "Événement récurrent",
      color: "from-green-500 to-teal-500"
    },
  ];

  const pastEvents = [
    {
      id: 1,
      title: "🚀 GameDev Workshop",
      date: "10 Janvier 2026",
      description: "Atelier de développement de jeux avec Unity",
      participants: "45 participants"
    },
    {
      id: 2,
      title: "🏆 Bizu Cup 2025",
      date: "20 Décembre 2025",
      description: "Tournoi de fin d'année avec 12 équipes",
      participants: "60 participants"
    },
  ];

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
      <div className="fixed inset-0 bg-black/70 z-10" />

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

      {/* Upcoming Events */}
      <main className="flex-1 px-6 py-16 relative z-20">
        <div className="max-w-6xl mx-auto">
          <h2 className={`${rajdhani.className} text-white text-4xl font-bold mb-12 text-center`}>
            Événements à Venir
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            {upcomingEvents.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gradient-to-br from-purple-900/30 to-black border border-purple-500/30 rounded-xl p-6 hover:border-purple-500/60 transition-all duration-300 cursor-pointer group"
              >
                <div className={`bg-gradient-to-r ${event.color} text-white px-3 py-1 rounded-full text-sm font-bold inline-block mb-4`}>
                  {event.status}
                </div>
                <h3 className={`${rajdhani.className} text-white text-2xl font-bold mb-3 group-hover:text-purple-300 transition-colors`}>
                  {event.title}
                </h3>
                <div className="flex items-center gap-2 text-purple-400 mb-3">
                  <FaCalendar />
                  <span>{event.date}</span>
                </div>
                <p className="text-gray-300 mb-4">{event.description}</p>
                <button className="w-full px-6 py-2 border-2 border-white bg-transparent hover:bg-white hover:text-black text-white font-semibold rounded transition-all duration-300 text-sm uppercase tracking-wider">
                  En savoir plus
                </button>
              </motion.div>
            ))}
          </div>

          {/* Past Events */}
          <h2 className={`${rajdhani.className} text-white text-4xl font-bold mb-12 text-center`}>
            Événements Passés
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {pastEvents.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gradient-to-br from-gray-800/50 to-black border border-gray-700 rounded-xl p-6 hover:border-purple-500/50 transition-all duration-300"
              >
                <h3 className={`${rajdhani.className} text-white text-2xl font-bold mb-2`}>
                  {event.title}
                </h3>
                <div className="flex items-center gap-2 text-gray-400 mb-3">
                  <FaCalendar />
                  <span>{event.date}</span>
                </div>
                <p className="text-gray-300 mb-2">{event.description}</p>
                <p className="text-purple-400 font-semibold">{event.participants}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
