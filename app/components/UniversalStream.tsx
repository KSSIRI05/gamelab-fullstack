// components/UniversalStream.tsx
'use client';
import dynamic from 'next/dynamic';
import React, { useEffect, useState } from 'react';
import { rajdhani } from '../fonts';

const ReactPlayer = dynamic(() => import('react-player'), { ssr: false }) as React.ComponentType<any>;

export default function UniversalStream({ url, title }: { url: string; title?: string }) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return <div className="w-full max-w-4xl mx-auto bg-transparent rounded-lg" />;

  return (
    <div className="relative w-full max-w-4xl mx-auto px-6 z-10">
      {title && (
        <h3 className={`${rajdhani.className} text-white text-3xl sm:text-4xl font-bold mb-8 text-center tracking-wide`}>
          {title}
        </h3>
      )}
      <div className="aspect-video w-full border-2 border-purple-500/50 rounded-xl overflow-hidden shadow-2xl shadow-purple-900/50 backdrop-blur-sm">
        <ReactPlayer 
          url={url} 
          width="100%" 
          height="100%" 
          controls={true} 
          playing={true} 
          muted={true}
        />
      </div>
    </div>
  );
}