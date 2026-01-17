'use client';

import Image from "next/image";
import { motion } from "framer-motion";
import { rajdhani, orbitron } from "../fonts";
import { FaFacebook, FaInstagram, FaDiscord, FaUser, FaEnvelope, FaPhone, FaGamepad } from 'react-icons/fa';
import Navbar from '../components/Navbar';
import { useState } from 'react';

export default function Inscription() {
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    email: '',
    telephone: '',
    evenement: '',
    jeu: '',
    niveau: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Logique d'inscription à implémenter
    console.log('Inscription:', formData);
    alert('Inscription envoyée avec succès! Nous vous contacterons bientôt.');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="flex flex-col min-h-screen relative">
      {/* Background Image */}
      <div className="fixed inset-0 z-0">
        <img 
          src="/background.jpg" 
          alt="Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/70"></div>
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

      {/* Inscription Form */}
      <main className="flex-1 px-6 py-16 relative z-10">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-br from-purple-900/40 to-black/60 backdrop-blur-md rounded-2xl p-8 border border-purple-500/30"
          >
            <h2 className={`${orbitron.className} text-white text-4xl font-bold mb-4 text-center`}>
              Inscription aux Événements
            </h2>
            <p className="text-gray-300 text-center mb-8">
              Rejoins-nous pour les meilleurs événements gaming de l'INPT!
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Nom et Prénom */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="nom" className="block text-white font-semibold mb-2">
                    <FaUser className="inline mr-2" />
                    Nom
                  </label>
                  <input
                    type="text"
                    id="nom"
                    name="nom"
                    value={formData.nom}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-black/50 border border-purple-500/30 rounded-lg text-white focus:outline-none focus:border-purple-500 transition-colors"
                    placeholder="Votre nom"
                  />
                </div>
                <div>
                  <label htmlFor="prenom" className="block text-white font-semibold mb-2">
                    Prénom
                  </label>
                  <input
                    type="text"
                    id="prenom"
                    name="prenom"
                    value={formData.prenom}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-black/50 border border-purple-500/30 rounded-lg text-white focus:outline-none focus:border-purple-500 transition-colors"
                    placeholder="Votre prénom"
                  />
                </div>
              </div>

              {/* Email et Téléphone */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="email" className="block text-white font-semibold mb-2">
                    <FaEnvelope className="inline mr-2" />
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-black/50 border border-purple-500/30 rounded-lg text-white focus:outline-none focus:border-purple-500 transition-colors"
                    placeholder="votre.email@example.com"
                  />
                </div>
                <div>
                  <label htmlFor="telephone" className="block text-white font-semibold mb-2">
                    <FaPhone className="inline mr-2" />
                    Téléphone
                  </label>
                  <input
                    type="tel"
                    id="telephone"
                    name="telephone"
                    value={formData.telephone}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-black/50 border border-purple-500/30 rounded-lg text-white focus:outline-none focus:border-purple-500 transition-colors"
                    placeholder="+212 6XX XXX XXX"
                  />
                </div>
              </div>

              {/* Événement */}
              <div>
                <label htmlFor="evenement" className="block text-white font-semibold mb-2">
                  <FaGamepad className="inline mr-2" />
                  Événement
                </label>
                <select
                  id="evenement"
                  name="evenement"
                  value={formData.evenement}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-black/50 border border-purple-500/30 rounded-lg text-white focus:outline-none focus:border-purple-500 transition-colors"
                >
                  <option value="">Sélectionner un événement</option>
                  <option value="bizu-cup">🏆 Bizu Cup 2026</option>
                  <option value="olympiades">🔥 Olympiades INPT</option>
                  <option value="gamenight">🎮 GameNight</option>
                  <option value="gamedev">🚀 GameDev Sessions</option>
                </select>
              </div>

              {/* Jeu préféré */}
              <div>
                <label htmlFor="jeu" className="block text-white font-semibold mb-2">
                  Jeu préféré
                </label>
                <input
                  type="text"
                  id="jeu"
                  name="jeu"
                  value={formData.jeu}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-black/50 border border-purple-500/30 rounded-lg text-white focus:outline-none focus:border-purple-500 transition-colors"
                  placeholder="Ex: League of Legends, Valorant, FIFA..."
                />
              </div>

              {/* Niveau */}
              <div>
                <label htmlFor="niveau" className="block text-white font-semibold mb-2">
                  Niveau de jeu
                </label>
                <select
                  id="niveau"
                  name="niveau"
                  value={formData.niveau}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-black/50 border border-purple-500/30 rounded-lg text-white focus:outline-none focus:border-purple-500 transition-colors"
                >
                  <option value="">Sélectionner votre niveau</option>
                  <option value="debutant">Débutant</option>
                  <option value="intermediaire">Intermédiaire</option>
                  <option value="avance">Avancé</option>
                  <option value="pro">Pro</option>
                </select>
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="block text-white font-semibold mb-2">
                  Message (optionnel)
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-3 bg-black/50 border border-purple-500/30 rounded-lg text-white focus:outline-none focus:border-purple-500 transition-colors resize-none"
                  placeholder="Questions ou informations supplémentaires..."
                />
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold rounded-lg transition-all duration-300 uppercase tracking-wider text-lg"
              >
                S'inscrire maintenant
              </motion.button>
            </form>

            {/* Info supplémentaire */}
            <div className="mt-8 text-center">
              <p className="text-gray-400 text-sm">
                Des questions? Contactez-nous sur{' '}
                <a href="https://discord.gg/kqSCjXQJ" target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:text-purple-300 underline">
                  Discord
                </a>
                {' '}ou par email à{' '}
                <a href="mailto:inpt.gamelab@gmail.com" className="text-purple-400 hover:text-purple-300 underline">
                  inpt.gamelab@gmail.com
                </a>
              </p>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
