import React, { useRef, useState } from 'react';
import { motion, useMotionValueEvent, useScroll } from 'framer-motion';

export const StickyScroll = ({
  content,
  contentClassName = ''
}) => {
  const [activeCard, setActiveCard] = useState(0);
  const ref = useRef(null);
  
  const { scrollYProgress } = useScroll({
    container: ref,
    offset: ["start start", "end start"],
  });
  
  const cardLength = content.length;

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const cardsBreakpoints = content.map((_, index) => index / cardLength);
    const closestBreakpointIndex = cardsBreakpoints.reduce(
      (acc, breakpoint, index) => {
        const distance = Math.abs(latest - breakpoint);
        if (distance < Math.abs(latest - cardsBreakpoints[acc])) {
          return index;
        }
        return acc;
      },
      0
    );
    setActiveCard(closestBreakpointIndex);
  });

  return (
    <div
      ref={ref}
      style={{
        position: 'relative',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        gap: '3rem',
        height: '36rem',
        overflowY: 'auto',
        borderRadius: '0px',
        padding: '2.5rem',
        background: 'var(--bg-dark)',
        border: '1px solid var(--border-subtle)'
      }}
    >
      {/* Left Column: Scrollable text items with sharp restrained transitions */}
      <div style={{ position: 'relative', display: 'flex', alignItems: 'flex-start', padding: '0 1rem', width: '100%', maxWidth: '580px' }}>
        
        {/* Vertical Progress Rail (Track: var(--border-subtle), Fill: var(--accent-cream)) */}
        <div style={{
          position: 'absolute',
          left: 0,
          top: '2rem',
          bottom: '12rem',
          width: '2px',
          background: 'var(--border-subtle)'
        }}>
          <motion.div
            animate={{
              height: `${((activeCard + 1) / cardLength) * 100}%`
            }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            style={{
              width: '100%',
              background: 'var(--accent-cream)'
            }}
          />
        </div>

        <div style={{ width: '100%', paddingLeft: '1.75rem' }}>
          {content.map((item, index) => (
            <div key={item.title + index} style={{ margin: '6.5rem 0' }}>
              
              {/* Step Monospace Tag */}
              <motion.div
                initial={{ opacity: 0.3 }}
                animate={{ opacity: activeCard === index ? 1 : 0.3 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="font-mono"
                style={{
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  color: activeCard === index ? 'var(--accent-cream)' : 'var(--text-muted)',
                  letterSpacing: '0.08em',
                  marginBottom: '0.75rem'
                }}
              >
                [ 0{index + 1} / ACCOUNTABILITY PROTOCOL ]
              </motion.div>

              {/* Title */}
              <motion.h2
                initial={{ opacity: 0.25 }}
                animate={{ opacity: activeCard === index ? 1 : 0.25 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                style={{
                  fontFamily: 'var(--font-display, Space Grotesk, sans-serif)',
                  fontSize: 'clamp(1.5rem, 2.5vw, 2.2rem)',
                  fontWeight: 800,
                  textTransform: 'uppercase',
                  color: activeCard === index ? 'var(--text-white)' : 'var(--text-muted)',
                  lineHeight: 1.2
                }}
              >
                {item.title}
              </motion.h2>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0.25 }}
                animate={{ opacity: activeCard === index ? 1 : 0.25 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                style={{
                  fontFamily: 'var(--font-mono, Space Mono, monospace)',
                  fontSize: '0.95rem',
                  color: 'var(--text-muted)',
                  marginTop: '1rem',
                  lineHeight: 1.6,
                  textTransform: 'uppercase'
                }}
              >
                {item.description}
              </motion.p>
            </div>
          ))}
          <div style={{ height: '10rem' }} />
        </div>
      </div>

      {/* Right Column: Flat var(--bg-card) Card with 1px var(--border-subtle), 0px corners, 0 shadows, and tactical accents */}
      <div
        style={{
          background: 'var(--bg-card, #1C3644)',
          border: '1px solid var(--border-subtle, #3A5C6E)',
          borderRadius: '0px',
          boxShadow: 'none',
          position: 'sticky',
          top: '2rem',
          height: '20rem',
          width: '24rem',
          flexShrink: 0,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '2rem',
          boxSizing: 'border-box'
        }}
        className={contentClassName}
      >
        {/* Tactical Corner Accents & Top Border */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '2px',
          background: 'var(--accent-cream)'
        }} />

        {/* Top Header Row inside Card: Step Label & Numeric Counter */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
          <div className="font-mono" style={{
            fontSize: '0.78rem',
            fontWeight: 700,
            color: 'var(--text-muted)',
            letterSpacing: '0.08em'
          }}>
            [ STEP 0{activeCard + 1} ]
          </div>

          <div className="font-mono" style={{
            fontSize: '0.85rem',
            fontWeight: 700,
            color: 'var(--text-muted)',
            letterSpacing: '0.05em'
          }}>
            0{activeCard + 1} / 0{cardLength}
          </div>
        </div>

        {/* Card Main Title & Content (White 800 weight Space Grotesk) */}
        <div style={{ margin: 'auto 0', textAlign: 'center' }}>
          <h3 style={{
            fontFamily: 'var(--font-display, Space Grotesk, sans-serif)',
            fontWeight: 800,
            fontSize: '1.4rem',
            color: 'var(--text-white)',
            textTransform: 'uppercase',
            lineHeight: 1.25,
            marginBottom: '0.5rem'
          }}>
            {content[activeCard]?.contentTitle || content[activeCard]?.title}
          </h3>
        </div>

        {/* Bottom Tactical Footer Line inside Card */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderTop: '1px solid var(--border-subtle)',
          paddingTop: '0.75rem'
        }}>
          <span className="font-mono" style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
            STATUS: ACTIVE
          </span>
          <span className="font-mono" style={{ fontSize: '0.72rem', color: 'var(--accent-cream)' }}>
            VERIFIED PROTOCOL
          </span>
        </div>

      </div>
    </div>
  );
};

export default StickyScroll;
