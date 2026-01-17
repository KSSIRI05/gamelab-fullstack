// components/UniversalStream.tsx
'use client';
import dynamic from 'next/dynamic';
import React, { useEffect, useState } from 'react';

const ReactPlayer = dynamic(() => import('react-player'), { ssr: false }) as React.ComponentType<any>;

export default function UniversalStream({ url }: { url: string }) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return <div className="aspect-video bg-gray-900" />;

  return (
    <div className="aspect-video w-full border-2 border-gray-800 rounded-lg overflow-hidden">
      <ReactPlayer 
        url={url} 
        width="100%" 
        height="100%" 
        controls={true} 
        playing={true} 
        muted={true} // ✅ FIX: Allows autoplay to work
      />
    </div>
  );
}