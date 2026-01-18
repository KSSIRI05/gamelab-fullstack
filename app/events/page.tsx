'use client';

import Image from "next/image";
import { motion } from "framer-motion";
import { rajdhani } from "../fonts";
import { FaFacebook, FaInstagram, FaDiscord, FaCalendar, FaUsers } from 'react-icons/fa';
import Navbar from '../components/Navbar';
import AuthButton from '../components/AuthButton';
import MobileMenu from '../components/MobileMenu';
import Footer from '../components/Footer';
import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import apiService, { Event as EventType } from '../../lib/api';

export default function Events() {
  const { isAuthenticated, user } = useAuth();
  const [events, setEvents] = useState<EventType[]>([]);
  const [userRegistrations, setUserRegistrations] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadEvents();
    if (isAuthenticated) {
      loadUserRegistrations();
    }
  }, [isAuthenticated]);

  const loadEvents = async () => {
    try {
      setLoading(true);
      const eventsData = await apiService.getEvents();
      setEvents(eventsData);
    } catch (error) {
      console.error('Erreur lors du chargement des événements:', error);
      setError('Impossible de charger les événements');
    } finally {
      setLoading(false);
    }
  };

  const loadUserRegistrations = async () => {
    if (!isAuthenticated) {
      setUserRegistrations([]);
      return;
    }

    try {
      const registrations = await apiService.getUserRegistrations();
      setUserRegistrations(registrations.map(r => r.event_id));
      console.log(`✅ Chargé ${registrations.length} inscription(s) utilisateur`);
    } catch (error) {
      console.error('Erreur lors du chargement des inscriptions:', error);
      setUserRegistrations([]); // Reset en cas d'erreur
    }
  };

  const handleRegisterToEvent = async (eventId: number) => {
    if (!isAuthenticated) {
      alert('Vous devez être connecté pour vous inscrire à un événement');
      return;
    }

    try {
      await apiService.registerForEvent(eventId);
      setUserRegistrations(prev => [...prev, eventId]);
      alert('Inscription réussie !');
      // Recharger les événements pour mettre à jour le nombre de participants
      loadEvents();
    } catch (error) {
      console.error('Erreur lors de l\'inscription:', error);
      
      // Si l'erreur est "Already registered", mettre à jour l'état local
      if (error instanceof Error && error.message.includes('Already registered')) {
        setUserRegistrations(prev => {
          if (!prev.includes(eventId)) {
            return [...prev, eventId];
          }
          return prev;
        });
        alert('Vous êtes déjà inscrit à cet événement !');
        return;
      }
      
      const errorMessage = error instanceof Error ? error.message : 'Erreur lors de l\'inscription';
      alert(`Erreur: ${errorMessage}`);
      
      // Recharger les inscriptions utilisateur en cas d'erreur
      try {
        const registrations = await apiService.getUserRegistrations();
        setUserRegistrations(registrations.map(r => r.event_id));
      } catch (reloadError) {
        console.error('Erreur lors du rechargement des inscriptions:', reloadError);
      }
    }
  };

  const handleUnregisterFromEvent = async (eventId: number) => {
    try {
      await apiService.unregisterFromEvent(eventId);
      setUserRegistrations(prev => prev.filter(id => id !== eventId));
      alert('Désinscription réussie !');
      // Recharger les événements pour mettre à jour le nombre de participants
      loadEvents();
    } catch (error) {
      console.error('Erreur lors de la désinscription:', error);
      
      // Si l'erreur indique qu'on n'était pas inscrit, mettre à jour l'état local
      if (error instanceof Error && (error.message.includes('not registered') || error.message.includes('Not found'))) {
        setUserRegistrations(prev => prev.filter(id => id !== eventId));
        alert('Vous n\'êtiez pas inscrit à cet événement.');
        return;
      }
      
      const errorMessage = error instanceof Error ? error.message : 'Erreur lors de la désinscription';
      alert(`Erreur: ${errorMessage}`);
      
      // Recharger les inscriptions utilisateur en cas d'erreur
      try {
        const registrations = await apiService.getUserRegistrations();
        setUserRegistrations(registrations.map(r => r.event_id));
      } catch (reloadError) {
        console.error('Erreur lors du rechargement des inscriptions:', reloadError);
      }
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const isEventUpcoming = (dateString: string) => {
    return new Date(dateString) > new Date();
  };

  const upcomingEvents = events.filter(event => isEventUpcoming(event.date));
  const pastEvents = events.filter(event => !isEventUpcoming(event.date));

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
            <MobileMenu currentPath="/events" />
          </div>
        </div>
      </header>

      {/* Upcoming Events */}
      <main className="flex-1 px-6 py-16 relative z-20">
        <div className="max-w-6xl mx-auto">
          <h2 className={`${rajdhani.className} text-white text-4xl font-bold mb-12 text-center`}>
            Événements à Venir
          </h2>

          {loading && (
            <div className="text-center text-white mb-8">
              <div className="animate-pulse">Chargement des événements...</div>
            </div>
          )}

          {error && (
            <div className="text-center text-red-400 mb-8">
              {error}
            </div>
          )}

          {!loading && upcomingEvents.length === 0 && (
            <div className="text-center text-gray-400 mb-12">
              Aucun événement à venir pour le moment.
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            {upcomingEvents.map((event, index) => {
              const isRegistered = userRegistrations.includes(event.id);
              return (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-gradient-to-br from-purple-900/30 to-black border border-purple-500/30 rounded-xl p-6 hover:border-purple-500/60 transition-all duration-300 group"
                >
                  <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-1 rounded-full text-sm font-bold inline-block mb-4">
                    Inscriptions ouvertes
                  </div>
                  <h3 className={`${rajdhani.className} text-white text-2xl font-bold mb-3 group-hover:text-purple-300 transition-colors`}>
                    {event.title}
                  </h3>
                  <div className="flex items-center gap-2 text-purple-400 mb-3">
                    <FaCalendar />
                    <span>{formatDate(event.date)}</span>
                  </div>
                  <div className="flex items-center gap-2 text-green-400 mb-3">
                    <FaUsers />
                    <span>{event.participants_count} participant{event.participants_count > 1 ? 's' : ''}</span>
                  </div>
                  <p className="text-gray-300 mb-4">{event.description}</p>
                  
                  {isAuthenticated ? (
                    isRegistered ? (
                      <button 
                        onClick={() => handleUnregisterFromEvent(event.id)}
                        className="w-full px-6 py-2 border-2 border-red-500 bg-red-500/20 hover:bg-red-500 hover:text-white text-red-400 font-semibold rounded transition-all duration-300 text-sm uppercase tracking-wider"
                      >
                        Se désinscrire
                      </button>
                    ) : (
                      <button 
                        onClick={() => handleRegisterToEvent(event.id)}
                        className="w-full px-6 py-2 border-2 border-white bg-transparent hover:bg-white hover:text-black text-white font-semibold rounded transition-all duration-300 text-sm uppercase tracking-wider"
                      >
                        S'inscrire
                      </button>
                    )
                  ) : (
                    <div className="text-center">
                      <p className="text-yellow-400 text-sm mb-2">Connectez-vous pour vous inscrire</p>
                      <a href="/login">
                        <button className="w-full px-6 py-2 border-2 border-yellow-500 bg-transparent hover:bg-yellow-500 hover:text-black text-yellow-500 font-semibold rounded transition-all duration-300 text-sm uppercase tracking-wider">
                          Se connecter
                        </button>
                      </a>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>

          {/* Past Events */}
          {pastEvents.length > 0 && (
            <>
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
                      <span>{formatDate(event.date)}</span>
                    </div>
                    <div className="flex items-center gap-2 text-green-400 mb-3">
                      <FaUsers />
                      <span>{event.participants_count} participant{event.participants_count > 1 ? 's' : ''}</span>
                    </div>
                    <p className="text-gray-300 mb-2">{event.description}</p>
                  </motion.div>
                ))}
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
}
