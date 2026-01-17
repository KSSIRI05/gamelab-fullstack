'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { rajdhani } from '../fonts';

export default function Navbar() {
  const pathname = usePathname();

  const navLinks = [
    { href: '/', label: 'Accueil' },
    { href: '/about', label: 'À propos' },
    { href: '/events', label: 'Événements' },
    { href: '/stream', label: 'Live' },
    { href: '/team', label: 'Équipe' },
    { href: '/gallery', label: 'À la une' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <nav className={`${rajdhani.className} flex gap-10`}>
      {navLinks.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={`text-white hover:text-purple-200 transition-all duration-300 font-bold text-lg uppercase tracking-widest relative group py-1 ${
            pathname === link.href ? 'text-purple-200' : ''
          }`}
        >
          {link.label}
          <span className={`absolute bottom-0 left-0 w-full h-1 bg-purple-400 transform transition-transform duration-300 ${
            pathname === link.href ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
          }`}></span>
        </Link>
      ))}
    </nav>
  );
}
