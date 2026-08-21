import React, { useRef, useEffect } from 'react';

// Ringly Website Theme Integrated Palette (Tuned for Sleek Black Landing Page)
const PALETTE = {
  dialNormal: { r: 14, g: 14, b: 14 },       // Deep Obsidian Black (#0E0E0E)
  dialFlash: { r: 53, g: 28, b: 25 },        // Miss Flash Dark Red (#351C19)
  bevelNormal: { r: 42, g: 42, b: 42 },      // Subtle Slate Rim (#2A2A2A)
  bevelFlash: { r: 189, g: 166, b: 165 },    // Miss Flash Ring Tint (#BDA6A5)
  hand: '#F5E6C8',                            // Warm Pale Cream
  handMuted: 'rgba(245, 230, 200, 0.75)',     // Sleek Pale Cream
  numbers: '#F5E6C8',                        // Hour Numbers
  ticksMajor: 'rgba(245, 230, 200, 0.85)',   // Major Hour Ticks
  ticksMinor: 'rgba(245, 230, 200, 0.3)',    // Minor Ticks
  orange: { r: 253, g: 107, b: 0 },          // Busywork Amber Orange (#FD6B00)
  gray: { r: 110, g: 110, b: 110 },          // Lost Time Slate Gray (#6E6E6E)
  meetingMark: '#E74C3C'                     // Signal Red (#E74C3C)
};

export default function WriglyClock({ size = 400, className = '', style = {} }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let startTime = null;
    let lastAngle = 0;
    let flashStartTime = -999;

    const DPR = window.devicePixelRatio || 1;
    canvas.width = size * DPR;
    canvas.height = size * DPR;
    canvas.style.width = `${size}px`;
    canvas.style.height = `${size}px`;

    const render = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const elapsedMs = timestamp - startTime;

      // Slowed down clock velocity: 22.5° per second (1 full 360° lap every 16 seconds)
      const lapDurationMs = (360 / 22.5) * 1000; // 16000ms
      const currentLapMs = elapsedMs % lapDurationMs;
      const hourAngleDeg = (currentLapMs / lapDurationMs) * 360;
      const minuteAngleDeg = (hourAngleDeg * 12) % 360; // Minute hand completes 12 laps per 12-hour cycle

      // Trigger Miss Flash at 120° (4:00)
      if (lastAngle < 120 && hourAngleDeg >= 120) {
        flashStartTime = timestamp;
      }
      lastAngle = hourAngleDeg;

      // Flash Intensity Decay (200ms duration)
      const flashElapsed = timestamp - flashStartTime;
      let flashIntensity = 0;
      if (flashElapsed >= 0 && flashElapsed <= 200) {
        if (flashElapsed < 30) {
          flashIntensity = 1.0;
        } else {
          flashIntensity = 1 - (flashElapsed - 30) / 170;
        }
      }
      flashIntensity = Math.max(0, Math.min(1, flashIntensity));

      // Clear Canvas to Transparent
      ctx.save();
      ctx.scale(DPR, DPR);
      ctx.clearRect(0, 0, size, size);

      const R = (size / 2) * 0.68; // Reserve outer space for meeting callout and clear clock margins
      const cx = size / 2;
      const cy = size / 2;

      // 1. Draw Dial Face
      const dialR = Math.round(PALETTE.dialNormal.r + (PALETTE.dialFlash.r - PALETTE.dialNormal.r) * flashIntensity);
      const dialG = Math.round(PALETTE.dialNormal.g + (PALETTE.dialFlash.g - PALETTE.dialNormal.g) * flashIntensity);
      const dialB = Math.round(PALETTE.dialNormal.b + (PALETTE.dialFlash.b - PALETTE.dialNormal.b) * flashIntensity);
      ctx.fillStyle = `rgb(${dialR}, ${dialG}, ${dialB})`;
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.fill();

      // 2. Draw Outer Bevel Rim
      const bevelR = Math.round(PALETTE.bevelNormal.r + (PALETTE.bevelFlash.r - PALETTE.bevelNormal.r) * flashIntensity);
      const bevelG = Math.round(PALETTE.bevelNormal.g + (PALETTE.bevelFlash.g - PALETTE.bevelNormal.g) * flashIntensity);
      const bevelB = Math.round(PALETTE.bevelNormal.b + (PALETTE.bevelFlash.b - PALETTE.bevelNormal.b) * flashIntensity);
      ctx.strokeStyle = `rgb(${bevelR}, ${bevelG}, ${bevelB})`;
      ctx.lineWidth = R * 0.03;
      ctx.beginPath();
      ctx.arc(cx, cy, R * 0.98, 0, Math.PI * 2);
      ctx.stroke();

      // 3. Draw 60 Minute Ticks & 12 Major Hour Ticks
      for (let i = 0; i < 60; i++) {
        const isHour = i % 5 === 0;
        const tickDeg = i * 6;
        const rad = ((tickDeg - 90) * Math.PI) / 180;
        const innerR = isHour ? R * 0.88 : R * 0.93;
        const outerR = R * 0.97;

        ctx.strokeStyle = isHour ? PALETTE.ticksMajor : PALETTE.ticksMinor;
        ctx.lineWidth = isHour ? R * 0.02 : R * 0.01;
        ctx.beginPath();
        ctx.moveTo(cx + innerR * Math.cos(rad), cy + innerR * Math.sin(rad));
        ctx.lineTo(cx + outerR * Math.cos(rad), cy + outerR * Math.sin(rad));
        ctx.stroke();
      }

      // 4. Draw Real Hour Numbers (12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11)
      ctx.fillStyle = PALETTE.numbers;
      ctx.font = `700 ${Math.round(R * 0.12)}px 'Space Grotesk', -apple-system, sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      const numberR = R * 0.74;

      for (let hourNum = 1; hourNum <= 12; hourNum++) {
        const numDeg = hourNum * 30;
        const rad = ((numDeg - 90) * Math.PI) / 180;
        const nx = cx + numberR * Math.cos(rad);
        const ny = cy + numberR * Math.sin(rad);
        ctx.fillText(hourNum.toString(), nx, ny);
      }

      // 5. Draw Comet Trail Arc (Between 0.86R and 0.94R)
      const trailLength = 68;
      const gapDeg = 3.5;
      const trailNearAngle = hourAngleDeg - gapDeg;
      const trailFarAngle = trailNearAngle - trailLength;

      const innerArcR = R * 0.86;
      const outerArcR = R * 0.94;
      const arcWidth = outerArcR - innerArcR;
      const midArcR = (innerArcR + outerArcR) / 2;

      const stepDeg = 0.75;
      ctx.lineWidth = arcWidth;
      ctx.lineCap = 'butt';

      for (let a = trailFarAngle; a <= trailNearAngle; a += stepDeg) {
        const t = (a - trailFarAngle) / trailLength;
        const alpha = Math.pow(Math.max(0, Math.min(1, t)), 1.35);
        let normDeg = (a % 360 + 360) % 360;

        let r = PALETTE.orange.r;
        let g = PALETTE.orange.g;
        let b = PALETTE.orange.b;

        if (normDeg >= 34 && normDeg < 38) {
          const blend = (normDeg - 34) / 4;
          r = Math.round(PALETTE.orange.r + (PALETTE.gray.r - PALETTE.orange.r) * blend);
          g = Math.round(PALETTE.orange.g + (PALETTE.gray.g - PALETTE.orange.g) * blend);
          b = Math.round(PALETTE.orange.b + (PALETTE.gray.b - PALETTE.orange.b) * blend);
        } else if (normDeg >= 38 && normDeg < 67) {
          r = PALETTE.gray.r;
          g = PALETTE.gray.g;
          b = PALETTE.gray.b;
        } else if (normDeg >= 67 && normDeg < 74) {
          const blend = (normDeg - 67) / 7;
          r = Math.round(PALETTE.gray.r + (PALETTE.orange.r - PALETTE.gray.r) * blend);
          g = Math.round(PALETTE.gray.g + (PALETTE.orange.g - PALETTE.gray.g) * blend);
          b = Math.round(PALETTE.gray.b + (PALETTE.orange.b - PALETTE.gray.b) * blend);
        }

        const startRad = ((a - 90) * Math.PI) / 180;
        const endRad = ((a + stepDeg + 0.1 - 90) * Math.PI) / 180;

        ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
        ctx.beginPath();
        ctx.arc(cx, cy, midArcR, startRad, endRad);
        ctx.stroke();
      }

      // 6. OUTSIDE MEETING LABEL (Fade in at 75°/2:30 PM, Full at 90°/3:00 PM, Hold through 4:00 PM to 180°/6:00 PM)
      // Displays:
      // 4:00
      // Meeting
      let meetingOpacity = 0;
      if (hourAngleDeg >= 75 && hourAngleDeg < 90) {
        meetingOpacity = (hourAngleDeg - 75) / 15; // Smooth fade in
      } else if (hourAngleDeg >= 90 && hourAngleDeg <= 180) {
        meetingOpacity = 1.0; // Hold visible through and past 4 o'clock
      } else if (hourAngleDeg > 180 && hourAngleDeg < 210) {
        meetingOpacity = 1 - (hourAngleDeg - 180) / 30; // Gentle fade out
      }

      if (meetingOpacity > 0) {
        const meetingRad = ((120 - 90) * Math.PI) / 180; // 120° = 4 o'clock
        const pinStartR = R * 0.99;
        const pinEndR = R * 1.14;

        // Leader Pin Line connecting outward from 4 o'clock rim
        ctx.strokeStyle = `rgba(231, 76, 60, ${meetingOpacity})`;
        ctx.lineWidth = R * 0.024;
        ctx.beginPath();
        ctx.moveTo(cx + pinStartR * Math.cos(meetingRad), cy + pinStartR * Math.sin(meetingRad));
        ctx.lineTo(cx + pinEndR * Math.cos(meetingRad), cy + pinEndR * Math.sin(meetingRad));
        ctx.stroke();

        // Pin Dot at clock rim
        ctx.fillStyle = `rgba(231, 76, 60, ${meetingOpacity})`;
        ctx.beginPath();
        ctx.arc(cx + pinStartR * Math.cos(meetingRad), cy + pinStartR * Math.sin(meetingRad), R * 0.035, 0, Math.PI * 2);
        ctx.fill();

        // Two-line Callout Text Outside Dial: "4:00" on top, "Meeting" below
        ctx.fillStyle = `rgba(231, 76, 60, ${meetingOpacity})`;
        ctx.textAlign = 'left';
        ctx.textBaseline = 'middle';

        const labelX = cx + (R * 1.18) * Math.cos(meetingRad);
        const labelY = cy + (R * 1.18) * Math.sin(meetingRad);

        // Line 1: "4:00"
        ctx.font = `700 ${Math.round(R * 0.095)}px 'Space Mono', monospace`;
        ctx.fillText('4:00', labelX + 2, labelY - 7);

        // Line 2: "Meeting"
        ctx.font = `600 ${Math.round(R * 0.085)}px 'Space Grotesk', sans-serif`;
        ctx.fillText('Meeting', labelX + 2, labelY + 9);
      }

      // 7. Minute Hand (Sleeker & Longer: 0.76R)
      const minuteRad = ((minuteAngleDeg - 90) * Math.PI) / 180;
      const minuteLen = R * 0.76;
      ctx.strokeStyle = PALETTE.handMuted;
      ctx.lineWidth = R * 0.016;
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(cx + minuteLen * Math.cos(minuteRad), cy + minuteLen * Math.sin(minuteRad));
      ctx.stroke();

      // 8. Hour Hand (Shorter & Thicker: 0.52R)
      const hourRad = ((hourAngleDeg - 90) * Math.PI) / 180;
      const hourLen = R * 0.52;
      ctx.strokeStyle = PALETTE.hand;
      ctx.lineWidth = R * 0.028;
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(cx + hourLen * Math.cos(hourRad), cy + hourLen * Math.sin(hourRad));
      ctx.stroke();

      // 9. Dual Center Pivot Cap
      ctx.fillStyle = PALETTE.hand;
      ctx.beginPath();
      ctx.arc(cx, cy, R * 0.045, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = `rgb(${PALETTE.dialNormal.r}, ${PALETTE.dialNormal.g}, ${PALETTE.dialNormal.b})`;
      ctx.beginPath();
      ctx.arc(cx, cy, R * 0.018, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [size]);

  return (
    <div
      className={className}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'transparent',
        padding: '0',
        width: `${size}px`,
        height: `${size}px`,
        aspectRatio: '1 / 1',
        flexShrink: 0,
        ...style
      }}
    >
      <canvas ref={canvasRef} style={{ display: 'block', background: 'transparent' }} />
    </div>
  );
}
