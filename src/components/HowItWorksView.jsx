import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { StickyScroll } from './StickyScroll';
import { useIsMobile } from '../hooks/useIsMobile';

/**
 * HowItWorksView — 100vh locked on desktop, full-page background animates on scroll.
 */

// Background colors that sweep the entire page per card
const pageBackgrounds = [
  "#10212A",  // card 1 — --bg-dark
  "#152534",  // card 2 — deep navy
  "#1a1220",  // card 3 — near-black with purple undertone
  "#12221A",  // card 4 — deep forest-dark
];

export default function HowItWorksView() {
  const [activeCard, setActiveCard] = useState(0);
  const isMobile = useIsMobile(768);

  const content = [
    {
      title: "UNDER PRESSURE, THINGS SLIP.",
      description: "WORK STRESS DOESN'T LEAVE ROOM FOR ONE MORE THING TO REMEMBER.",
      contentTitle: "UNDER PRESSURE",
      content: (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', textAlign: 'center', width: '100%', height: '100%' }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-muted)', letterSpacing: '0.1em' }}>[ STEP 01 ]</span>
          <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.2rem', color: 'var(--text-white)', textTransform: 'uppercase' }}>UNDER PRESSURE</span>
        </div>
      ),
    },
    {
      title: "NOTIFICATIONS GET IGNORED. CALLS DON'T.",
      description: "A BUZZ IS BACKGROUND NOISE — A VOICE ISN'T.",
      contentTitle: "DIRECT VOICE CALL",
      content: (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', textAlign: 'center', width: '100%', height: '100%' }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-muted)', letterSpacing: '0.1em' }}>[ STEP 02 ]</span>
          <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.2rem', color: 'var(--text-white)', textTransform: 'uppercase' }}>DIRECT VOICE CALL</span>
        </div>
      ),
    },
    {
      title: "IN A DISTRACTED WORLD,",
      description: "DEADLINES GET MISSED.",
      contentTitle: "DEADLINE AWARENESS",
      content: (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', textAlign: 'center', width: '100%', height: '100%' }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-muted)', letterSpacing: '0.1em' }}>[ STEP 03 ]</span>
          <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.2rem', color: 'var(--text-white)', textTransform: 'uppercase' }}>DEADLINE AWARENESS</span>
        </div>
      ),
    },
    {
      title: "A CALL YOU'RE ACCOUNTABLE TO",
      description: "KEEPS YOU AWARE — NOT JUST ALERTED.",
      contentTitle: "HUMAN ACCOUNTABILITY",
      content: (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', textAlign: 'center', width: '100%', height: '100%' }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-muted)', letterSpacing: '0.1em' }}>[ STEP 04 ]</span>
          <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.2rem', color: 'var(--text-white)', textTransform: 'uppercase' }}>HUMAN ACCOUNTABILITY</span>
        </div>
      ),
    },
  ];

  return (
    // Full page background animates here — covers the entire viewport
    <motion.div
      className="view-fade-enter"
      animate={{
        backgroundColor: pageBackgrounds[activeCard % pageBackgrounds.length],
      }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      style={{
        height: isMobile ? 'auto' : '100vh',
        minHeight: '100vh',
        overflow: isMobile ? 'visible' : 'hidden',
        color: 'var(--text-white)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: isMobile ? '5.5rem 1rem 1rem 1rem' : '6rem 2rem 2rem 2rem',
        boxSizing: 'border-box',
      }}
    >
      <div style={{ width: '100%', maxWidth: '1080px', height: '100%' }}>
        <StickyScroll
          content={content}
          onActiveCardChange={setActiveCard}
        />
      </div>
    </motion.div>
  );
}
