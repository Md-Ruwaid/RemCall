import React, { useState } from 'react';

/**
 * DashboardTutorial — Step-by-step onboarding for first-time users.
 * 
 * Overlay-based tutorial with step counter, progress bar,
 * and NEXT/SKIP/DONE navigation.
 * 
 * Triggered on first dashboard visit (hasSeenTutorial === false).
 * Can be re-launched from the "?" help button in DashboardHeader.
 */

const TUTORIAL_STEPS = [
  {
    title: 'WELCOME TO RINGLY',
    text: 'This is your personal telephony control dashboard. From here you can see your upcoming calls, track your daily allowance, and schedule new human operator calls — all in one place.',
  },
  {
    title: 'YOUR NEXT CALL',
    text: 'The Next Call section is the first thing you\'ll see. It shows your most upcoming scheduled call with the time, title, and how long until the operator rings you.',
  },
  {
    title: 'TODAY\'S TIMELINE',
    text: 'Your daily calls appear in a chronological timeline. You can see at a glance which calls are scheduled, completed, or missed throughout the day.',
  },
  {
    title: 'ALLOWANCE & PLAN',
    text: 'Track your daily call usage and subscription details. See how many calls you\'ve used today and your current plan at a glance.',
  },
  {
    title: 'SCHEDULE A CALL',
    text: 'Ready to set a reminder? Use the "Schedule a Call" button to create a new call. A real human operator will ring your phone at the exact time you choose.',
  },
];

export default function DashboardTutorial({ onComplete }) {
  const [currentStep, setCurrentStep] = useState(0);

  const isLastStep = currentStep === TUTORIAL_STEPS.length - 1;
  const step = TUTORIAL_STEPS[currentStep];

  const handleNext = () => {
    if (isLastStep) {
      onComplete();
    } else {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleSkip = () => {
    onComplete();
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  return (
    <div className="tutorial-overlay dashboard-fade-in" role="dialog" aria-modal="true" aria-label="Dashboard tutorial">
      <div className="tutorial-card">
        {/* Step indicator */}
        <div className="tutorial-step-indicator">
          STEP {currentStep + 1} / {TUTORIAL_STEPS.length}
        </div>

        {/* Content */}
        <h2 className="tutorial-title">{step.title}</h2>
        <p className="tutorial-text">{step.text}</p>

        {/* Actions */}
        <div className="tutorial-actions">
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            {currentStep > 0 && (
              <button className="tutorial-btn-skip" onClick={handleBack}>
                ← BACK
              </button>
            )}
            <button className="tutorial-btn-skip" onClick={handleSkip}>
              SKIP
            </button>
          </div>

          <button className="tutorial-btn-next" onClick={handleNext}>
            {isLastStep ? 'GET STARTED' : 'NEXT →'}
          </button>
        </div>

        {/* Progress bar */}
        <div className="tutorial-progress-bar">
          {TUTORIAL_STEPS.map((_, i) => (
            <div
              key={i}
              className={`tutorial-progress-dot${i <= currentStep ? ' tutorial-progress-dot--active' : ''}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
