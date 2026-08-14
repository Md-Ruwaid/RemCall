import React from 'react';
import { StickyScroll } from './StickyScroll';

/**
 * HowItWorksView Component
 * 
 * Renders StickyScroll reveal component aligned with Ringly's strict theme tokens.
 */
export default function HowItWorksView() {
  const content = [
    {
      title: "UNDER PRESSURE, THINGS SLIP.",
      description: "WORK STRESS DOESN'T LEAVE ROOM FOR ONE MORE THING TO REMEMBER.",
      contentTitle: "UNDER PRESSURE"
    },
    {
      title: "NOTIFICATIONS GET IGNORED. CALLS DON'T.",
      description: "A BUZZ IS BACKGROUND NOISE — A VOICE ISN'T.",
      contentTitle: "DIRECT VOICE CALL"
    },
    {
      title: "IN A DISTRACTED WORLD,",
      description: "DEADLINES GET MISSED.",
      contentTitle: "DEADLINE AWARENESS"
    },
    {
      title: "A CALL YOU'RE ACCOUNTABLE TO",
      description: "KEEPS YOU AWARE — NOT JUST ALERTED.",
      contentTitle: "HUMAN ACCOUNTABILITY"
    },
  ];

  return (
    <div
      className="view-fade-enter"
      style={{
        minHeight: '100vh',
        backgroundColor: 'var(--bg-dark)',
        color: 'var(--text-white)',
        paddingTop: '6rem',
        paddingBottom: '5rem'
      }}
    >
      <div className="container-wide" style={{ maxWidth: '1080px', margin: '0 auto' }}>
        <StickyScroll content={content} />
      </div>
    </div>
  );
}
