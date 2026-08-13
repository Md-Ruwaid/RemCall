import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import './GradientRevealText.css';

export default function GradientRevealText({
  lines = ["WE CALL.", "YOU REMEMBER."],
  className = "",
  style = {}
}) {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const items = container.querySelectorAll('.reveal-text-line');

    gsap.set(items, {
      '--stop-hover': '0%',
      '--stop-active': '0%'
    });

    // Intro animation: reveals text active state left-to-right
    const tl = gsap.timeline({ defaults: { duration: 0.6, ease: 'power2.out' } });

    tl.to(items, {
      '--stop-active': '100%',
      stagger: 0.15
    });

    const handlers = [];

    items.forEach((item) => {
      const onEnter = () => {
        gsap.to(item, {
          '--stop-hover': '100%',
          duration: 0.36,
          ease: 'power2.out'
        });
      };

      const onLeave = () => {
        gsap.to(item, {
          '--stop-hover': '0%',
          duration: 0.36,
          ease: 'power2.out'
        });
      };

      item.addEventListener('mouseenter', onEnter);
      item.addEventListener('mouseleave', onLeave);

      handlers.push({ item, onEnter, onLeave });
    });

    return () => {
      handlers.forEach(({ item, onEnter, onLeave }) => {
        item.removeEventListener('mouseenter', onEnter);
        item.removeEventListener('mouseleave', onLeave);
      });
      tl.kill();
    };
  }, [lines]);

  return (
    <div ref={containerRef} className={`reveal-text-container ${className}`} style={style}>
      <ul className="reveal-text-list">
        {lines.map((line, i) => (
          <li key={i} className="reveal-text-line">
            {line}
          </li>
        ))}
      </ul>
    </div>
  );
}
