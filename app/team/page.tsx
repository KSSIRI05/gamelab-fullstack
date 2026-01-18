'use client';

import Image from "next/image";
import { motion } from "framer-motion";
import { rajdhani } from "../fonts";
import { FaFacebook, FaInstagram, FaDiscord, FaUserTie, FaUsers } from 'react-icons/fa';
import Navbar from '../components/Navbar';
import AuthButton from '../components/AuthButton';
import MobileMenu from '../components/MobileMenu';
import Footer from '../components/Footer';

export default function Team() {
  const teamMembers = [
    {
      id: 1,
      name: "Taha Ibourk-El-Idrissi",
      role: "Président",
      description: "Direction du club - Gestion globale et représentation du club",
      image: "/President.jpeg"
    },
    {
      id: 2,
      name: "Mohammed Yassine Lachguer",
      role: "Vice-Président",
      description: "Support direction - Assistance à la direction et coordination",
      image: "/VP.jpeg"
    },
    {
      id: 3,
      name: "Mohammed Kssiri",
      role: "Trésorier",
      description: "Finances - Gestion du budget et des dépenses",
      image: "/TRESORIER.jpeg"
    },
    {
      id: 4,
      name: "Abderrafia Haddoumi",
      role: "Secrétaire Général",
      description: "Administration - Gestion administrative et documentation",
      image: "/SG.jpeg"
    },
    {
      id: 5,
      name: "Ali Hame",
      role: "Chef Events",
      description: "Organisation - Planification et gestion des événements",
      image: "/ChefEvents.jpeg"
    },
    {
      id: 6,
      name: "Oussama Bourhan-Ed-Dine",
      role: "Chef Media",
      description: "Marketing & Réseaux sociaux - Communication et présence en ligne",
      image: "/ChefMedia.jpeg"
    },
  ];

  return (
    <div className="flex flex-col min-h-screen relative">
      {/* Background Image */}
      <div className="fixed inset-0 z-0">
        <img 
          src="/background.jpg" 
          alt="Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60"></div>
      </div>

      {/* Header */}
      <header className="relative overflow-hidden flex flex-col w-full z-10">
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
            <MobileMenu currentPath="/team" />
          </div>
        </div>
      </header>

      {/* Team Members */}
      <main className="flex-1 px-6 py-16 relative z-10">
        <div className="max-w-6xl mx-auto">
          <h2 className={`${rajdhani.className} text-white text-4xl font-bold mb-12 text-center`}>
            Notre Équipe
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gradient-to-br from-purple-900/30 to-black border border-purple-500/30 rounded-xl p-8 transition-all duration-500 text-center group relative overflow-visible hover:fixed hover:inset-0 hover:z-50 hover:flex hover:items-center hover:justify-center hover:bg-black/90 hover:rounded-none hover:p-0 hover:border-0"
              >
                <div className="group-hover:max-w-2xl group-hover:bg-gradient-to-br group-hover:from-purple-900/95 group-hover:to-black/95 group-hover:p-12 group-hover:rounded-2xl group-hover:border-4 group-hover:border-purple-500 transition-all duration-500">
                  {member.image ? (
                    <div className="w-48 h-48 rounded-xl mx-auto mb-4 overflow-hidden border-4 border-purple-500/50 group-hover:w-80 group-hover:h-80 group-hover:border-purple-400 transition-all duration-500 bg-white">
                      <img 
                        src={member.image} 
                        alt={member.name} 
                        className="w-full h-full object-cover object-center"
                      />
                    </div>
                  ) : (
                    <div className="w-48 h-48 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-xl mx-auto mb-4 flex items-center justify-center group-hover:w-80 group-hover:h-80 transition-all duration-500">
                      <FaUserTie className="text-white text-4xl group-hover:text-6xl transition-all duration-500" />
                    </div>
                  )}
                  <h3 className={`${rajdhani.className} text-white text-2xl font-bold mb-2 group-hover:text-4xl transition-all duration-500`}>
                    {member.name}
                  </h3>
                  <div className="w-0 h-0 mx-auto group-hover:w-32 group-hover:h-1 bg-purple-500 mb-0 group-hover:mb-6 transition-all duration-500"></div>
                  <p className="text-purple-400 font-semibold mb-3 group-hover:text-2xl group-hover:mb-6 transition-all duration-500">{member.role}</p>
                  <p className="text-gray-300 text-sm group-hover:text-lg group-hover:text-gray-200 transition-all duration-500">
                    {member.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Join Us Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-gradient-to-r from-purple-900/50 to-indigo-900/50 rounded-xl p-12 text-center border border-purple-500/30"
          >
            <FaUsers className="text-purple-400 text-6xl mx-auto mb-6" />
            <h2 className={`${rajdhani.className} text-white text-3xl font-bold mb-4`}>
              Rejoins-nous !
            </h2>
            <p className="text-gray-300 text-lg mb-6 max-w-2xl mx-auto">
              Tu es passionné de gaming et tu veux contribuer à la communauté GameLab ? 
              Rejoins notre équipe et participe à l'organisation des meilleurs événements gaming de l'INPT !
            </p>
            <a href="/contact">
              <button className="px-8 py-3 border-2 border-white bg-transparent hover:bg-white hover:text-black text-white font-semibold rounded-lg transition-all duration-300 uppercase tracking-wider">
                Nous contacter
              </button>
            </a>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
