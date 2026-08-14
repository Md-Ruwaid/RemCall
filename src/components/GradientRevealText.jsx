import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import './GradientRevealText.css';

// Colors pulled directly from WriglyClock.jsx PALETTE
const AMBER_COLOR = '#FD6B00'; // PALETTE.orange (Busywork Amber)
const IVORY_COLOR = '#F5E6C8'; // PALETTE.hand / PALETTE.numbers (Warm Pale Cream)
const START_COLOR = 'rgba(245, 230, 200, 0.25)'; // Muted initial state

export default function GradientRevealText({
  lines = ["WE CALL.", "YOU REMEMBER."],
  className = "",
  style = {}
}) {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const charElements = Array.from(container.querySelectorAll('.amber-sweep-char'));
    if (charElements.length === 0) return;

    // Set initial color state
    gsap.set(charElements, { color: START_COLOR });

    const totalChars = charElements.length;
    const sweepDuration = 1.1; // Total sweep time across headline in seconds
    const tl = gsap.timeline({ delay: 0.15 });

    charElements.forEach((charEl, idx) => {
      const isSpace = charEl.dataset.char === ' ';
      if (isSpace) return;

      const isRememberChar = charEl.dataset.word === 'REMEMBER';
      // Calculate stagger start time across 1.1s total sweep
      const startTime = (idx / totalChars) * sweepDuration;

      // 1. Ignite to Amber (#FD6B00)
      tl.to(charEl, {
        color: AMBER_COLOR,
        duration: 0.06,
        ease: 'power1.in'
      }, startTime);

      // 2. Cool to Ivory (#F5E6C8), holding amber longer for "REMEMBER"
      const holdTime = isRememberChar ? 0.38 : 0.08;
      tl.to(charEl, {
        color: IVORY_COLOR,
        duration: 0.35,
        ease: 'power2.out'
      }, startTime + 0.06 + holdTime);
    });

    return () => {
      tl.kill();
    };
  }, [lines]);

  return (
    <div ref={containerRef} className={`amber-sweep-container ${className}`} style={style}>
      <div className="amber-sweep-list">
        {lines.map((line, lineIdx) => {
          // Split line into words to identify 'REMEMBER'
          const words = line.split(' ');
          let charOffset = 0;

          return (
            <div key={lineIdx} className="amber-sweep-line">
              {words.map((word, wordIdx) => {
                const chars = word.split('');
                const wordKey = `${lineIdx}-${wordIdx}`;

                return (
                  <React.Fragment key={wordKey}>
                    {chars.map((ch, chIdx) => (
                      <span
                        key={`${wordKey}-${chIdx}`}
                        className="amber-sweep-char"
                        data-char={ch}
                        data-word={word}
                      >
                        {ch}
                      </span>
                    ))}
                    {wordIdx < words.length - 1 && (
                      <span className="amber-sweep-char" data-char=" ">
                        {'\u00A0'}
                      </span>
                    )}
                  </React.Fragment>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}
