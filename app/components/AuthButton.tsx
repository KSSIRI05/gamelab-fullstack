'use client';

import { useAuth } from '../context/AuthContext';
import { FaUser, FaSignOutAlt } from 'react-icons/fa';
import { useRouter } from 'next/navigation';

export default function AuthButton() {
  const { user, logout, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  // Afficher un indicateur de chargement pendant l'initialisation
  if (isLoading) {
    return (
      <div className="flex items-center gap-3">
        <div className="animate-pulse bg-purple-800/50 px-4 py-2 rounded-lg">
          <span className="text-white">Chargement...</span>
        </div>
      </div>
    );
  }

  if (isAuthenticated && user) {
    return (
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 bg-purple-800/50 px-4 py-2 rounded-lg">
          <FaUser className="text-white" />
          <span className="text-white font-semibold">{user.prenom} {user.nom}</span>
          {user.isINPTStudent && (
            <span className="text-xs bg-green-500 text-white px-2 py-1 rounded-full">INPT</span>
          )}
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center justify-center w-10 h-10 bg-purple-800/50 hover:bg-red-600 rounded-lg text-white transition-colors duration-300"
          title="Déconnexion"
        >
          <FaSignOutAlt className="text-sm" />
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3">
      <a
        href="/login"
        className="px-4 py-2 border-2 border-white bg-transparent hover:bg-white hover:text-purple-700 text-white font-semibold rounded-lg transition-all duration-300"
      >
        Connexion
      </a>
      <a
        href="/signup"
        className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition-all duration-300"
      >
        Inscription
      </a>
    </div>
  );
}
