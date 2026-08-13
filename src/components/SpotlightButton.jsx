import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';

const SpotlightButton = ({ text = 'FIX IT', onClick, style = {} }) => {
  const btnRef = useRef(null);
  const spanRef = useRef(null);

  useEffect(() => {
    const btn = btnRef.current;
    if (!btn) return;

    const handleMouseMove = (e) => {
      const rect = btn.getBoundingClientRect();
      const width = rect.width;
      const offset = e.clientX - rect.left;
      const left = `${(offset / width) * 100}%`;

      if (spanRef.current) {
        spanRef.current.animate({ left }, { duration: 250, fill: 'forwards' });
      }
    };

    const handleMouseLeave = () => {
      if (spanRef.current) {
        spanRef.current.animate(
          { left: '50%' },
          { duration: 100, fill: 'forwards' }
        );
      }
    };

    btn.addEventListener('mousemove', handleMouseMove);
    btn.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      btn.removeEventListener('mousemove', handleMouseMove);
      btn.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <motion.button
      whileTap={{ scale: 0.985 }}
      ref={btnRef}
      onClick={onClick}
      style={{
        position: 'relative',
        width: '100%',
        maxWidth: '300px',
        overflow: 'hidden',
        borderRadius: '10px',
        backgroundColor: '#0F212A',
        border: '1.5px solid #F5E6C8',
        padding: '1.2rem 2.5rem',
        fontSize: '1.15rem',
        fontFamily: 'var(--font-display)',
        fontWeight: 800,
        letterSpacing: '0.08em',
        color: '#FFFFFF',
        cursor: 'pointer',
        textTransform: 'uppercase',
        outline: 'none',
        isolation: 'isolate',
        boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
        ...style
      }}
    >
      <span style={{
        position: 'relative',
        zIndex: 10,
        mixBlendMode: 'difference',
        pointerEvents: 'none',
        color: '#FFFFFF'
      }}>
        {text}
      </span>
      <span
        ref={spanRef}
        style={{
          pointerEvents: 'none',
          position: 'absolute',
          left: '50%',
          top: '50%',
          height: '140px',
          width: '140px',
          transform: 'translate(-50%, -50%)',
          borderRadius: '50%',
          backgroundColor: '#F5E6C8'
        }}
      />
    </motion.button>
  );
};

export default SpotlightButton;
