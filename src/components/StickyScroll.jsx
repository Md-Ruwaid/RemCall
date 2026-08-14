import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../context/AppContext';

export const StickyScroll = ({
  content,
  contentClassName = '',
  onActiveCardChange
}) => {
  const [activeCard, setActiveCard] = useState(0);
  const [direction, setDirection] = useState(1);
  const prevCard = useRef(0);
  const scrollerRef = useRef(null);
  const itemRefs = useRef([]);
  const { setIsSubscribeModalOpen, isAuthenticated, setActiveView } = useApp();

  const handleSubscribeClick = () => {
    if (!isAuthenticated) {
      setActiveView('auth');
    } else {
      setIsSubscribeModalOpen(true);
    }
  };

  // Direct scroll detection: pick the card whose center is closest to the container's center
  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const onScroll = () => {
      const scrollCenter = scroller.scrollTop + scroller.clientHeight / 2;
      let closestIndex = 0;
      let closestDist = Infinity;

      itemRefs.current.forEach((el, index) => {
        if (!el) return;
        const itemCenter = el.offsetTop + el.offsetHeight / 2;
        const dist = Math.abs(scrollCenter - itemCenter);
        if (dist < closestDist) {
          closestDist = dist;
          closestIndex = index;
        }
      });

      if (closestIndex !== prevCard.current) {
        const newDir = closestIndex > prevCard.current ? 1 : -1;
        setDirection(newDir);
        prevCard.current = closestIndex;
        setActiveCard(closestIndex);
        onActiveCardChange?.(closestIndex);
      }
    };

    scroller.addEventListener('scroll', onScroll, { passive: true });
    // Run once on mount to set initial active card
    onScroll();

    return () => scroller.removeEventListener('scroll', onScroll);
  }, [onActiveCardChange]);


  // Spring config — tight, zero wobble
  const spring = { type: "spring", stiffness: 420, damping: 42 };
  const fadeEase = { duration: 0.28, ease: [0.16, 1, 0.3, 1] };

  return (
    <div
      ref={scrollerRef}
      style={{
        position: 'relative',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        gap: '2rem',
        height: '30rem',
        overflowY: 'auto',
        scrollbarWidth: 'none',
        msOverflowStyle: 'none',
        borderRadius: '0px',
        padding: '2.5rem',
        background: 'transparent',
      }}
    >
      <style>{`#sticky-left::-webkit-scrollbar { display: none; }`}</style>

      {/* Left: text column */}
      <div id="sticky-left" style={{ position: 'relative', maxWidth: '560px', width: '100%' }}>
        <div style={{ width: '100%' }}>
          {content.map((item, index) => {
            const isActive = activeCard === index;
            return (
              <div
                key={item.title + index}
                ref={(el) => (itemRefs.current[index] = el)}
                style={{ marginTop: '5rem', marginBottom: '5rem' }}
              >
                {/* Step marker */}
                <motion.div
                  animate={{ opacity: isActive ? 1 : 0.3, x: isActive ? 0 : -6 }}
                  transition={fadeEase}
                  className="font-mono"
                  style={{
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    color: 'var(--accent-cream)',
                    letterSpacing: '0.1em',
                    marginBottom: '0.65rem',
                  }}
                >
                  [ 0{index + 1} / ACCOUNTABILITY PROTOCOL ]
                </motion.div>

                {/* Title */}
                <motion.h2
                  animate={{ opacity: isActive ? 1 : 0.2, y: isActive ? 0 : 8, scale: isActive ? 1 : 0.98 }}
                  transition={fadeEase}
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(1.5rem, 2.5vw, 2.2rem)',
                    fontWeight: 800,
                    textTransform: 'uppercase',
                    color: 'var(--text-white)',
                    lineHeight: 1.2,
                    letterSpacing: '-0.02em',
                  }}
                >
                  {item.title}
                </motion.h2>

                {/* Description */}
                <motion.p
                  animate={{ opacity: isActive ? 1 : 0.2, y: isActive ? 0 : 10 }}
                  transition={{ ...fadeEase, delay: isActive ? 0.05 : 0 }}
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.95rem',
                    color: 'var(--accent-cream)',
                    marginTop: '1rem',
                    lineHeight: 1.6,
                    textTransform: 'uppercase',
                    maxWidth: '480px',
                  }}
                >
                  {item.description}
                </motion.p>
              </div>
            );
          })}
          {/* Subscribe button — appears after scrolling all 4 cards */}
          <div style={{ height: '6rem' }} />
          <div style={{ display: 'flex', justifyContent: 'flex-start', paddingBottom: '4rem' }}>
            <button className="btn-96" onClick={handleSubscribeClick}>
              <span>Subscribe</span>
              Subscribe
            </button>
          </div>

        </div>
      </div>

      {/* Right: sticky panel */}
      <div
        style={{
          position: 'sticky',
          top: '2rem',
          flexShrink: 0,
          width: '22rem',
          height: '18rem',
          overflow: 'hidden',
          borderRadius: '0px',
          background: 'var(--bg-card)',
          border: '1px solid var(--border-subtle)',
          boxShadow: 'none',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '1.75rem',
          boxSizing: 'border-box',
        }}
        className={contentClassName}
      >
        {/* Accent bar sweeps on card change */}
        <motion.div
          key={`accent-${activeCard}`}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: 'absolute',
            top: 0, left: 0, right: 0,
            height: '2px',
            background: 'var(--accent-cream)',
            transformOrigin: 'left',
          }}
        />

        {/* Header: step + counter */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <AnimatePresence mode="wait">
            <motion.span
              key={`step-${activeCard}`}
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 6 }}
              transition={{ duration: 0.18 }}
              className="font-mono"
              style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', letterSpacing: '0.08em' }}
            >
              [ STEP 0{activeCard + 1} ]
            </motion.span>
          </AnimatePresence>
          <AnimatePresence mode="wait">
            <motion.span
              key={`ctr-${activeCard}`}
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 6 }}
              transition={{ duration: 0.18 }}
              className="font-mono"
              style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)' }}
            >
              0{activeCard + 1} / 0{content.length}
            </motion.span>
          </AnimatePresence>
        </div>

        {/* Content: directional slide */}
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={activeCard}
              custom={direction}
              initial={{ opacity: 0, y: direction * 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: direction * -20 }}
              transition={spring}
              style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              {content[activeCard]?.content ?? (
                <h3 style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 800,
                  fontSize: '1.35rem',
                  color: 'var(--text-white)',
                  textTransform: 'uppercase',
                  textAlign: 'center',
                }}>
                  {content[activeCard]?.contentTitle}
                </h3>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Footer */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          borderTop: '1px solid var(--border-subtle)',
          paddingTop: '0.65rem',
        }}>
          <motion.span
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="font-mono"
            style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}
          >
            STATUS: ACTIVE
          </motion.span>
          <span className="font-mono" style={{ fontSize: '0.7rem', color: 'var(--accent-cream)' }}>
            VERIFIED PROTOCOL
          </span>
        </div>
      </div>
    </div>
  );
};

export default StickyScroll;
