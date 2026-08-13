import React, { useState, useEffect, useRef } from 'react';

const SIZE = 270;
const FACE_R = SIZE / 2;
const HAND_LEN = 88;
const MINUTE_LEN = 110;
const BAND_OUTER = HAND_LEN;   // Trail sits tightly inside hand radius
const BAND_INNER = BAND_OUTER - 20;
const SEAL_R = 115;
const TICK_LEN = FACE_R - 2;
const EVENT_HOUR = 4; // 4 o'clock deadline

function offsetFor(radius, deg) {
  const rad = (deg * Math.PI) / 180;
  return { dx: radius * Math.sin(rad), dy: -radius * Math.cos(rad) };
}

export default function RinglyClockWidget() {
  const [hour, setHour] = useState(0);
  const [workStart, setWorkStart] = useState(1.5); // 1:30 PM (45 deg)
  const [driftEnd, setDriftEnd] = useState(2.5);   // 2:30 PM (75 deg)
  const [playing, setPlaying] = useState(true);
  const [speed, setSpeed] = useState(0.7);
  const [jiggleDeg, setJiggleDeg] = useState(0);
  const [pulse, setPulse] = useState(0);

  const playingRef = useRef(playing);
  const speedRef = useRef(speed);
  playingRef.current = playing;
  speedRef.current = speed;

  const rafRef = useRef(null);
  const lastTsRef = useRef(null);
  const jiggleStartRef = useRef(null);

  useEffect(() => {
    function tick(ts) {
      if (lastTsRef.current == null) lastTsRef.current = ts;
      // Frame-rate safety clamp
      const dt = Math.min((ts - lastTsRef.current) / 1000, 0.25);
      lastTsRef.current = ts;

      if (playingRef.current) {
        setHour((prev) => {
          const raw = prev + dt * speedRef.current;
          // Flinch trigger when crossing 4 o'clock
          const crossed = prev < EVENT_HOUR && raw >= EVENT_HOUR;
          if (crossed) jiggleStartRef.current = ts;
          return raw % 12;
        });

        // Flinch animation (under 500ms jiggle + expanding red ring)
        if (jiggleStartRef.current != null) {
          const t = ts - jiggleStartRef.current;
          const duration = 450;
          if (t < duration) {
            const decay = 1 - t / duration;
            // Rapid decay flinch wobble
            setJiggleDeg(Math.sin((t / duration) * Math.PI * 5) * 4.5 * decay);
            setPulse(decay);
          } else {
            jiggleStartRef.current = null;
            setJiggleDeg(0);
            setPulse(0);
          }
        }
      }
      rafRef.current = requestAnimationFrame(tick);
    }
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  const handDeg = (hour / 12) * 360 + jiggleDeg;
  const sweepDeg = Math.max(0, Math.min(handDeg, 360));
  const minuteDeg = (((hour * 60) % 60) / 60) * 360;

  const busyStartDeg = (workStart / 12) * 360; // 45 deg
  const busyEndDeg = (driftEnd / 12) * 360;    // 75 deg

  // Color Story Conic Gradient Math
  // Orange (#CB8868) = busy work
  // Grey (#7A92A0) = lost/leaked time
  // Red (#C05C4E) = 4 o'clock deadline
  const stops = [];
  if (sweepDeg <= busyStartDeg) {
    stops.push(`#CB8868 0deg`, `#CB8868 ${sweepDeg}deg`);
  } else if (sweepDeg <= busyEndDeg) {
    stops.push(`#CB8868 0deg`, `#CB8868 ${busyStartDeg}deg`, `#7A92A0 ${busyStartDeg}deg`, `#7A92A0 ${sweepDeg}deg`);
  } else {
    stops.push(
      `#CB8868 0deg`, `#CB8868 ${busyStartDeg}deg`,
      `#7A92A0 ${busyStartDeg}deg`, `#7A92A0 ${busyEndDeg}deg`,
      `#CB8868 ${busyEndDeg}deg`, `#CB8868 ${sweepDeg}deg`
    );
  }
  stops.push(`transparent ${sweepDeg}deg`, `transparent 360deg`);

  const trailBackground = `conic-gradient(from 0deg, ${stops.join(', ')})`;
  const trailMask = `radial-gradient(circle, transparent ${BAND_INNER}px, black ${BAND_INNER}px, black ${BAND_OUTER}px, transparent ${BAND_OUTER}px)`;

  const seal = offsetFor(SEAL_R, (EVENT_HOUR / 12) * 360);

  // Time formatted string
  const hNum = Math.floor(hour) === 0 ? 12 : Math.floor(hour);
  const mNum = Math.floor((hour * 60) % 60);
  const timeFormatted = `${hNum < 10 ? '0' : ''}${hNum}:${mNum < 10 ? '0' : ''}${mNum} PM`;

  return (
    <div style={{
      background: 'var(--bg-card)',
      border: '1px solid var(--border-subtle)',
      borderRadius: '0px',
      padding: '2.2rem 2rem',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '1.25rem',
      boxShadow: 'none',
      width: '100%',
      maxWidth: '420px',
      margin: '0 auto'
    }}>

      {/* Narrative Story Header */}
      <div style={{ textAlign: 'center', width: '100%' }}>
        <h3 style={{
          fontFamily: 'var(--font-display)',
          fontSize: '1.35rem',
          fontWeight: 700,
          color: 'var(--text-white)',
          letterSpacing: '-0.01em',
          margin: '0 0 4px'
        }}>
          WHERE THE DAY WENT
        </h3>
        <p style={{
          fontSize: '0.78rem',
          color: 'var(--text-muted)',
          lineHeight: 1.4,
          margin: 0
        }}>
          <span style={{ color: '#CB8868', fontWeight: 600 }}>Amber</span> marks busy work · <span style={{ color: '#7A92A0', fontWeight: 600 }}>Grey</span> marks lost time · <span style={{ color: '#C05C4E', fontWeight: 600 }}>Red</span> marks what you missed
        </p>
      </div>

      {/* Master Clock Face Container */}
      <div style={{
        position: 'relative',
        width: SIZE,
        height: SIZE,
        borderRadius: '50%',
        background: '#0E1E26',
        boxShadow: 'none'
      }}>
        
        {/* Dynamic Color Trail Arc */}
        <div style={{
          position: 'absolute',
          inset: 0,
          borderRadius: '50%',
          background: trailBackground,
          WebkitMaskImage: trailMask,
          maskImage: trailMask,
          transition: 'background 0.05s linear'
        }} />

        {/* 60 Minute & Hour Tick Marks */}
        {Array.from({ length: 60 }, (_, i) => i).map((i) => {
          const isHour = i % 5 === 0;
          return (
            <div key={i} style={{
              position: 'absolute',
              left: 'calc(50% - 1px)',
              top: 2,
              width: isHour ? 2.5 : 1,
              height: TICK_LEN,
              transformOrigin: 'bottom center',
              transform: `rotateZ(${i * 6}deg)`,
              borderTop: `${isHour ? 6 : 2}px solid ${isHour ? '#D5DEE4' : '#2A4656'}`,
            }} />
          );
        })}

        {/* 4 o'clock Deadline Event Mark (Red Flinch Seal) */}
        <div style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          width: 12,
          height: 12,
          borderRadius: '50%',
          background: '#C05C4E',
          transform: `translate(-50%, -50%) translate(${seal.dx}px, ${seal.dy}px)`,
          zIndex: 4,
          boxShadow: 'none'
        }}>
          {/* Flinch Expanding Ring */}
          <div style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            width: 12,
            height: 12,
            borderRadius: '50%',
            border: '2px solid #C05C4E',
            transform: `translate(-50%, -50%) scale(${1 + pulse * 1.8})`,
            opacity: pulse * 0.9,
          }} />
        </div>

        {/* Minute Hand (Quiet Gray) */}
        <div style={{
          position: 'absolute',
          left: 'calc(50% - 1px)',
          top: FACE_R - MINUTE_LEN,
          width: 2,
          height: MINUTE_LEN,
          background: '#7A92A0',
          borderRadius: 1,
          transformOrigin: 'bottom center',
          transform: `rotateZ(${minuteDeg}deg)`,
          zIndex: 2
        }} />

        {/* Hour Hand (Ivory Unadorned) */}
        <div style={{
          position: 'absolute',
          left: 'calc(50% - 2.5px)',
          top: FACE_R - HAND_LEN,
          width: 5,
          height: HAND_LEN,
          background: '#F5E6C8',
          borderRadius: 2.5,
          transformOrigin: 'bottom center',
          transform: `rotateZ(${handDeg}deg)`,
          zIndex: 3,
          boxShadow: 'none'
        }} />

        {/* Center Cap */}
        <div style={{
          position: 'absolute',
          left: 'calc(50% - 4px)',
          top: 'calc(50% - 4px)',
          width: 8,
          height: 8,
          borderRadius: '50%',
          background: '#F5E6C8',
          zIndex: 5
        }} />

      </div>

      {/* Live Status Bar */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        padding: '0.6rem 1rem',
        background: 'var(--bg-dark)',
        borderRadius: '0px',
        border: '1px solid var(--border-subtle)',
        fontSize: '0.8rem',
        fontFamily: 'var(--font-mono)'
      }}>
        <span style={{ color: 'var(--text-muted)' }}>CURRENT TIME:</span>
        <span style={{ color: 'var(--accent-cream)', fontWeight: 700 }}>{timeFormatted}</span>
      </div>

      {/* Interactive Controls */}
      <div style={{
        display: 'flex',
        gap: '1rem',
        alignItems: 'center',
        justifyContent: 'center',
        flexWrap: 'wrap',
        width: '100%',
        paddingTop: '0.5rem'
      }}>
        <button
          onClick={() => setPlaying((p) => !p)}
          className="btn-secondary"
          style={{
            padding: '0.5rem 1.25rem',
            fontSize: '0.78rem',
            fontFamily: 'var(--font-mono)',
            borderColor: 'var(--accent-cream)',
            color: 'var(--accent-cream)'
          }}
        >
          {playing ? '⏸ PAUSE' : '▶ PLAY'}
        </button>

        <label style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          Speed:
          <input
            type="range"
            min={0.1}
            max={3}
            step={0.1}
            value={speed}
            onChange={(e) => setSpeed(parseFloat(e.target.value))}
            style={{ accentColor: 'var(--accent-cream)', width: '80px', cursor: 'pointer' }}
          />
        </label>
      </div>

    </div>
  );
}
