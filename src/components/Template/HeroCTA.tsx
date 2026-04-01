'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function HeroCTA() {
  const [isClicked, setIsClicked] = useState(false);

  return (
    <div style={{ marginTop: '2.5rem', display: 'flex', justifyContent: 'center' }}>
      <Link
        href="/about/"
        onClick={() => setIsClicked(true)}
        style={{
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '140px',
          height: '140px',
          background: 'linear-gradient(145deg, #2563eb 0%, #3b82f6 50%, #60a5fa 100%)',
          borderRadius: '50%',
          textDecoration: 'none',
          color: '#fff',
          fontWeight: 700,
          fontSize: '1rem',
          letterSpacing: '0.05em',
          boxShadow: '0 0 60px rgba(37, 99, 235, 0.5), 0 0 100px rgba(37, 99, 235, 0.3)',
          transform: isClicked ? 'scale(2)' : 'scale(1)',
          opacity: isClicked ? 0 : 1,
          transition: isClicked ? 'all 0.6s ease-out' : 'all 0.3s ease',
        }}
        onMouseEnter={(e) => {
          if (!isClicked) {
            e.currentTarget.style.transform = 'scale(1.15)';
            e.currentTarget.style.boxShadow = '0 0 80px rgba(37, 99, 235, 0.7), 0 0 120px rgba(37, 99, 235, 0.4)';
          }
        }}
        onMouseLeave={(e) => {
          if (!isClicked) {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.boxShadow = '0 0 60px rgba(37, 99, 235, 0.5), 0 0 100px rgba(37, 99, 235, 0.3)';
          }
        }}
        onMouseDown={(e) => {
          e.currentTarget.style.transform = 'scale(1.05)';
        }}
        onMouseUp={(e) => {
          if (!isClicked) {
            e.currentTarget.style.transform = 'scale(1.15)';
          }
        }}
      >
        {/* Animated rings */}
        <span
          style={{
            position: 'absolute',
            borderRadius: '50%',
            border: '2px solid rgba(255,255,255,0.4)',
            inset: '-10px',
            animation: 'cta-ring-pulse 2s ease-out infinite',
          }}
        />
        <span
          style={{
            position: 'absolute',
            borderRadius: '50%',
            border: '2px solid rgba(37, 99, 235, 0.5)',
            inset: '-20px',
            animation: 'cta-ring-pulse 2s ease-out infinite 0.3s',
          }}
        />
        <span
          style={{
            position: 'absolute',
            borderRadius: '50%',
            border: '2px solid rgba(37, 99, 235, 0.3)',
            inset: '-30px',
            animation: 'cta-ring-pulse 2s ease-out infinite 0.6s',
          }}
        />
        <span
          style={{
            position: 'relative',
            zIndex: 2,
            textShadow: '0 2px 4px rgba(0,0,0,0.2)',
          }}
        >
          了解更多
        </span>
      </Link>

      {/* Inject keyframes */}
      <style>{`
        @keyframes cta-ring-pulse {
          0% {
            transform: scale(1);
            opacity: 1;
          }
          100% {
            transform: scale(1.3);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
