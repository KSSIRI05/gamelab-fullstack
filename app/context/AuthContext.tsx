'use client';

import { createContext, useContext, useState, useEffect, ReactNode, useMemo } from 'react';

interface User {
  id: string;
  nom: string;
  prenom: string;
  email: string;
  isINPTStudent: boolean;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => boolean;
  signup: (nom: string, prenom: string, email: string, password: string, isINPTStudent: boolean) => boolean;
  logout: () => void;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: Readonly<{ children: ReactNode }>) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Vérifier que nous sommes côté client
    if (typeof window !== 'undefined') {
      // Charger l'utilisateur depuis localStorage au démarrage
      try {
        const savedUser = localStorage.getItem('user');
        if (savedUser) {
          setUser(JSON.parse(savedUser));
        }
      } catch (error) {
        console.error('Erreur lors du chargement de l\'utilisateur:', error);
        localStorage.removeItem('user');
      }
    }
    setIsLoading(false);
  }, []);

  const login = (email: string, password: string): boolean => {
    if (typeof window === 'undefined') return false;
    
    // Simulation de connexion (frontend seulement)
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const foundUser = users.find((u: any) => u.email === email && u.password === password);
    
    if (foundUser) {
      const { password, ...userWithoutPassword } = foundUser;
      setUser(userWithoutPassword);
      localStorage.setItem('user', JSON.stringify(userWithoutPassword));
      return true;
    }
    return false;
  };

  const signup = (nom: string, prenom: string, email: string, password: string, isINPTStudent: boolean): boolean => {
    if (typeof window === 'undefined') return false;
    
    // Simulation d'inscription (frontend seulement)
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    
    // Vérifier si l'email existe déjà
    if (users.some((u: any) => u.email === email)) {
      return false;
    }

    const newUser = {
      id: Date.now().toString(),
      nom,
      prenom,
      email,
      password,
      isINPTStudent
    };

    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));

    // Connecter automatiquement après inscription
    const { password: _, ...userWithoutPassword } = newUser;
    setUser(userWithoutPassword);
    localStorage.setItem('user', JSON.stringify(userWithoutPassword));
    
    return true;
  };

  const logout = () => {
    setUser(null);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('user');
    }
  };

  const value = useMemo(() => ({
    user, 
    login, 
    signup, 
    logout, 
    isAuthenticated: !!user,
    isLoading
  }), [user, isLoading]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
