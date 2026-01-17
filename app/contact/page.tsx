'use client';

import Image from "next/image";
import { motion } from "framer-motion";
import { rajdhani, orbitron } from "../fonts";
import { FaFacebook, FaInstagram, FaEnvelope, FaMapMarkerAlt, FaDiscord } from 'react-icons/fa';
import Navbar from '../components/Navbar';
import AuthButton from '../components/AuthButton';
import { useState } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };

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

      {/* Hero Banner */}
      <section className="relative py-20 px-6 bg-gradient-to-r from-purple-900/50 to-indigo-900/50 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto text-center">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`${orbitron.className} text-white text-5xl sm:text-7xl font-bold mb-4`}
          >
            📧 Contact
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-gray-300 text-xl"
          >
            Contactez-nous pour toute question ou suggestion
          </motion.p>
        </div>
      </section>

      {/* Contact Content */}
      <main className="flex-1 px-6 py-16">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-gradient-to-br from-purple-900/30 to-black border border-purple-500/30 rounded-xl p-8"
          >
            <h2 className={`${rajdhani.className} text-white text-3xl font-bold mb-6`}>
              Envoyez-nous un message
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="text-white font-semibold block mb-2">Nom</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-4 py-3 bg-black/50 border border-purple-500/30 rounded-lg text-white focus:border-purple-500 focus:outline-none"
                  placeholder="Votre nom"
                  required
                />
              </div>
              <div>
                <label className="text-white font-semibold block mb-2">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full px-4 py-3 bg-black/50 border border-purple-500/30 rounded-lg text-white focus:border-purple-500 focus:outline-none"
                  placeholder="votre.email@exemple.com"
                  required
                />
              </div>
              <div>
                <label className="text-white font-semibold block mb-2">Message</label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  className="w-full px-4 py-3 bg-black/50 border border-purple-500/30 rounded-lg text-white focus:border-purple-500 focus:outline-none h-32 resize-none"
                  placeholder="Votre message..."
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full px-6 py-3 border-2 border-white bg-transparent hover:bg-white hover:text-black text-white font-semibold rounded-lg transition-all duration-300 uppercase tracking-wider"
              >
                Envoyer
              </button>
            </form>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-8"
          >
            <div className="bg-gradient-to-br from-purple-900/30 to-black border border-purple-500/30 rounded-xl p-6">
              <div className="flex items-start gap-4">
                <FaEnvelope className="text-purple-400 text-3xl mt-1" />
                <div>
                  <h3 className={`${rajdhani.className} text-white text-xl font-bold mb-2`}>Email</h3>
                  <p className="text-gray-300">inpt.gamelab@gmail.com</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-900/30 to-black border border-purple-500/30 rounded-xl p-6">
              <div className="flex items-start gap-4">
                <FaMapMarkerAlt className="text-purple-400 text-3xl mt-1" />
                <div>
                  <h3 className={`${rajdhani.className} text-white text-xl font-bold mb-2`}>Adresse</h3>
                  <p className="text-gray-300">INPT, Avenue Allal El Fassi<br />Rabat, Maroc</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-900/30 to-black border border-purple-500/30 rounded-xl p-6">
              <div className="flex items-start gap-4">
                <FaDiscord className="text-purple-400 text-3xl mt-1" />
                <div>
                  <h3 className={`${rajdhani.className} text-white text-xl font-bold mb-2`}>Discord</h3>
                  <p className="text-gray-300">Rejoignez notre serveur Discord</p>
                  <a href="https://discord.gg/kqSCjXQJ" target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:text-purple-300 mt-2 inline-block">
                    discord.gg/kqSCjXQJ
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-900/30 to-black border border-purple-500/30 rounded-xl p-6">
              <h3 className={`${rajdhani.className} text-white text-xl font-bold mb-4`}>
                Suivez-nous
              </h3>
              <div className="flex gap-4">
                <a href="https://www.facebook.com/gamelab.inpt.7" target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:text-purple-300 transition-colors">
                  <FaFacebook size={32} />
                </a>
                <a href="https://www.instagram.com/gamelabinpt/" target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:text-purple-300 transition-colors">
                  <FaInstagram size={32} />
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
