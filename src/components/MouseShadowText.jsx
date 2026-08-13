import React, { useEffect, useRef, useState } from 'react';

export default function MouseShadowText({
  text = 'WE CALL. YOU REMEMBER.',
  className = '',
  style = {}
}) {
  const textRef = useRef(null);
  const [textShadow, setTextShadow] = useState('8px 8px 0px rgba(245, 230, 200, 0.45)');

  useEffect(() => {
    const shadowOffset = 45; // Displacement range in pixels

    const handleMouseMove = (e) => {
      const containerX = window.innerWidth;
      const containerY = window.innerHeight;
      const x = e.clientX;
      const y = e.clientY;

      const shadowX = Math.round((x / containerX * shadowOffset) - (shadowOffset / 2));
      const shadowY = Math.round((y / containerY * shadowOffset) - (shadowOffset / 2));

      // Theme-aligned text shadow using warm pale cream (#F5E6C8) and slate accent depth
      setTextShadow(
        `${shadowX}px ${shadowY}px 0px rgba(245, 230, 200, 0.45), ${-shadowX * 0.4}px ${-shadowY * 0.4}px 0px rgba(58, 92, 110, 0.35)`
      );
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <h1
      ref={textRef}
      className={className}
      style={{
        fontFamily: 'var(--font-display)',
        fontSize: 'clamp(2.2rem, 3.8vw, 3.4rem)',
        fontWeight: 900,
        color: '#FFFFFF',
        textTransform: 'uppercase',
        letterSpacing: '-0.02em',
        lineHeight: 1.05,
        margin: 0,
        userSelect: 'none',
        textShadow: textShadow,
        transition: 'text-shadow 0.08s ease-out',
        ...style
      }}
    >
      {text}
    </h1>
  );
}
