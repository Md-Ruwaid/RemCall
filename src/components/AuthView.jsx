import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../context/AppContext';

import { useIsMobile } from '../hooks/useIsMobile';

/**
 * Ringly-themed Customer Testimonials (Placeholder Data)
 * Flagged clearly: These are placeholder Ringly-relevant operational testimonials.
 */
const PLACEHOLDER_TESTIMONIALS = [
  {
    id: 1,
    quote: "A phone call from a real human operator changes everything. I finished my pitch deck 3 hours before the client deadline.",
    author: "MARCUS CHEN",
    role: "FOUNDER & CEO, VECTOR LABS",
    avatarInitials: "MC"
  },
  {
    id: 2,
    quote: "Push notifications get ignored in 2 seconds. A real voice asking if I completed my 4 PM review keeps me 100% accountable.",
    author: "ELENA ROSTOVA",
    role: "LEAD PRODUCT DESIGNER, NEXUS",
    avatarInitials: "ER"
  },
  {
    id: 3,
    quote: "Ringly is the only system that actually cured my procrastination. No app clutter, just a direct phone call when it counts.",
    author: "DAVID KAPLAN",
    role: "OPERATIONS DIRECTOR, STRATOS",
    avatarInitials: "DK"
  }
];

export default function AuthView() {
  const {
    loginUser,
    signupUser,
    loginWithGoogle,
    requestPasswordReset,
    authError,
    setAuthError,
    isAuthLoading,
    emailConfirmationPending,
    setEmailConfirmationPending,
    user,
    setIsSubscribeModalOpen,
    setAuthModalMode,
    setActiveView
  } = useApp();

  const isMobile = useIsMobile(768);
  const [authMode, setAuthMode] = useState('signup'); // 'signup' | 'login' | 'forgot'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [fullName, setFullName] = useState('');
  const [activeQuoteIndex, setActiveQuoteIndex] = useState(0);
  const [localError, setLocalError] = useState(null);
  const [resetSuccessMessage, setResetSuccessMessage] = useState(false);

  // Rotating quote interval (every 5.5 seconds, restrained motion)
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveQuoteIndex((prev) => (prev + 1) % PLACEHOLDER_TESTIMONIALS.length);
    }, 5500);
    return () => clearInterval(timer);
  }, []);

  const handleAuthSubmit = async (e) => {
    e.preventDefault();
    setLocalError(null);
    setAuthError(null);

    // Client-side Validation
    if (!email || !email.includes('@')) {
      setLocalError('Please enter a valid email address.');
      return;
    }

    if (authMode !== 'forgot' && (!password || password.length < 6)) {
      setLocalError('Password must be at least 6 characters long.');
      return;
    }

    try {
      if (authMode === 'forgot') {
        await requestPasswordReset(email);
        setResetSuccessMessage(true);
      } else if (authMode === 'signup') {
        const res = await signupUser(fullName, email, phone, password);
        if (res.session) {
          if (user.subscriptionActive) {
            setActiveView('dashboard');
          } else {
            setAuthModalMode('subscribe');
            setIsSubscribeModalOpen(true);
            setActiveView('dashboard');
          }
        }
      } else {
        const res = await loginUser(email, password);
        if (res.session) {
          if (user.subscriptionActive) {
            setActiveView('dashboard');
          } else {
            setAuthModalMode('subscribe');
            setIsSubscribeModalOpen(true);
            setActiveView('dashboard');
          }
        }
      }
    } catch (err) {
      setLocalError(err.message || 'Authentication failed. Please check your details.');
    }
  };

  const handleGoogleAuth = async () => {
    setLocalError(null);
    setAuthError(null);
    try {
      await loginWithGoogle();
    } catch (err) {
      setLocalError(err.message || 'Google Sign-In failed.');
    }
  };

  const activeQuote = PLACEHOLDER_TESTIMONIALS[activeQuoteIndex];

  return (
    <div
      className="view-fade-enter"
      style={{
        minHeight: '100vh',
        backgroundColor: 'var(--bg-dark, #10212A)',
        color: 'var(--text-white)',
        paddingTop: isMobile ? '5.5rem' : '6rem',
        paddingBottom: isMobile ? '3rem' : '4rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <div className="container-wide" style={{ maxWidth: '1180px', width: '100%', margin: '0 auto', padding: isMobile ? '0 1rem' : '0 1.5rem' }}>
        
        {/* Main Authentication 3 Split-Panel Container */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(340px, 1fr))',
            gap: isMobile ? '1.75rem' : '2.5rem',
            alignItems: 'stretch',
            background: 'var(--bg-dark-secondary, #162C37)',
            border: '1.5px solid var(--border-subtle, #3A5C6E)',
            borderRadius: '0px',
            boxShadow: 'none',
            padding: isMobile ? '1.25rem' : '2.5rem'
          }}
        >

          {/* LEFT PANEL: Brand Messaging, Stat Strip & Rotating Customer Testimonials */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              gap: isMobile ? '1.5rem' : '2.5rem',
              paddingRight: isMobile ? 0 : '1rem'
            }}
          >
            <div>
              {/* Mono Status Tag */}
              <div
                className="font-mono"
                style={{
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  color: 'var(--accent-cream)',
                  letterSpacing: '0.1em',
                  marginBottom: '1rem'
                }}
              >
                [ SERVICE TYPE: HUMAN OPERATOR TELEPHONY ]
              </div>

              {/* Main Headline */}
              <h1
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(2rem, 3.2vw, 2.8rem)',
                  fontWeight: 800,
                  textTransform: 'uppercase',
                  color: 'var(--text-white)',
                  lineHeight: 1.15,
                  letterSpacing: '-0.02em',
                  marginBottom: '1.25rem'
                }}
              >
                ACCOUNTABILITY THAT CALLS YOU DIRECTLY.
              </h1>

              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '1.05rem',
                  color: 'var(--accent-cream)',
                  lineHeight: 1.6,
                  maxWidth: '500px'
                }}
              >
                Zero app clutter. Zero ignored notifications. Real human operators standing by to ensure your deadlines are met.
              </p>
            </div>

            {/* Stat Strip readout bar */}
            <div
              style={{
                background: 'var(--bg-card, #1C3644)',
                border: '1px solid var(--border-subtle, #3A5C6E)',
                borderRadius: '0px',
                padding: isMobile ? '1rem' : '1.25rem 1.5rem',
                display: 'grid',
                gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
                gap: isMobile ? '0.75rem' : '1rem',
                textAlign: 'center'
              }}
            >
              <div>
                <div className="font-mono" style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--accent-cream)' }}>
                  12,480+
                </div>
                <div className="font-mono" style={{ fontSize: '0.68rem', color: 'var(--text-muted)', textTransform: 'uppercase', marginTop: '0.2rem' }}>
                  CALLS DELIVERED
                </div>
              </div>

              <div>
                <div className="font-mono" style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--text-white)' }}>
                  99.8%
                </div>
                <div className="font-mono" style={{ fontSize: '0.68rem', color: 'var(--text-muted)', textTransform: 'uppercase', marginTop: '0.2rem' }}>
                  ON-TIME RATE
                </div>
              </div>

              <div>
                <div className="font-mono" style={{ fontSize: '0.95rem', fontWeight: 800, color: '#FD6B00' }}>
                  4,200+
                </div>
                <div className="font-mono" style={{ fontSize: '0.68rem', color: 'var(--text-muted)', textTransform: 'uppercase', marginTop: '0.2rem' }}>
                  ACTIVE USERS
                </div>
              </div>
            </div>

            {/* Rotating Testimonials Panel */}
            <div
              style={{
                background: 'var(--bg-card, #1C3644)',
                border: '1px solid var(--border-subtle, #3A5C6E)',
                borderRadius: '0px',
                padding: '1.5rem',
                position: 'relative',
                minHeight: '140px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeQuote.id}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                >
                  <p
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.95rem',
                      fontStyle: 'italic',
                      color: 'var(--text-white)',
                      lineHeight: 1.5,
                      marginBottom: '1rem'
                    }}
                  >
                    "{activeQuote.quote}"
                  </p>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div
                      className="font-mono"
                      style={{
                        width: '32px',
                        height: '32px',
                        background: 'var(--bg-dark)',
                        border: '1px solid var(--border-subtle)',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        color: 'var(--accent-cream)'
                      }}
                    >
                      {activeQuote.avatarInitials}
                    </div>

                    <div>
                      <div className="font-mono" style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-white)' }}>
                        {activeQuote.author}
                      </div>
                      <div className="font-mono" style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>
                        {activeQuote.role}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Quote Indicators */}
              <div style={{ display: 'flex', gap: '0.4rem', marginTop: '1rem' }}>
                {PLACEHOLDER_TESTIMONIALS.map((q, idx) => (
                  <button
                    key={q.id}
                    type="button"
                    onClick={() => setActiveQuoteIndex(idx)}
                    style={{
                      width: idx === activeQuoteIndex ? '1.5rem' : '0.5rem',
                      height: '3px',
                      background: idx === activeQuoteIndex ? 'var(--accent-cream)' : 'var(--border-subtle)',
                      border: 'none',
                      padding: 0,
                      cursor: 'pointer',
                      transition: 'all 0.25s ease'
                    }}
                  />
                ))}
              </div>
            </div>

          </div>

          {/* RIGHT PANEL: Authentication Form (Sign Up / Log In / Reset) */}
          <div className="form">
            {/* EMAIL CONFIRMATION REQUIRED STATE */}
            {emailConfirmationPending ? (
              <div style={{ textAlign: 'center', padding: '1rem 0', width: '100%' }}>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>✉️</div>
                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--accent-cream)', marginBottom: '0.75rem' }}>
                  CONFIRM YOUR EMAIL
                </h2>
                <p className="font-mono" style={{ fontSize: '0.88rem', color: 'var(--text-white)', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                  We sent a confirmation link to <span style={{ color: 'var(--accent-cream)' }}>{email}</span>. Please click the link in your inbox to complete registration and access Ringly.
                </p>
                <button
                  type="button"
                  onClick={() => setEmailConfirmationPending(false)}
                  className="oauthButton"
                  style={{ width: '100%' }}
                >
                  <span>RETURN TO LOG IN →</span>
                </button>
              </div>
            ) : (
              <>
                {/* Tab Switcher */}
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '0.5rem',
                    width: '100%',
                    marginBottom: '0.5rem',
                    background: 'var(--bg-dark)',
                    padding: '0.3rem',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: '4px'
                  }}
                >
                  <button
                    type="button"
                    onClick={() => { setAuthMode('signup'); setLocalError(null); setAuthError(null); setResetSuccessMessage(false); }}
                    className="font-mono"
                    style={{
                      padding: '0.6rem 0',
                      background: authMode === 'signup' ? 'var(--accent-cream)' : 'transparent',
                      color: authMode === 'signup' ? 'var(--bg-dark)' : 'var(--text-muted)',
                      border: 'none',
                      fontSize: '0.8rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      letterSpacing: '0.08em',
                      borderRadius: '3px'
                    }}
                  >
                    SIGN UP
                  </button>

                  <button
                    type="button"
                    onClick={() => { setAuthMode('login'); setLocalError(null); setAuthError(null); setResetSuccessMessage(false); }}
                    className="font-mono"
                    style={{
                      padding: '0.6rem 0',
                      background: authMode === 'login' ? 'var(--accent-cream)' : 'transparent',
                      color: authMode === 'login' ? 'var(--bg-dark)' : 'var(--text-muted)',
                      border: 'none',
                      fontSize: '0.8rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      letterSpacing: '0.08em',
                      borderRadius: '3px'
                    }}
                  >
                    LOG IN
                  </button>
                </div>

                {/* D3OXY Styled Header Title */}
                <p>
                  {authMode === 'signup' ? 'START YOUR PROTOCOL' : authMode === 'login' ? 'AUTHENTICATE ACCESS' : 'RESET PASSWORD'}
                  <span>[ {authMode === 'signup' ? 'CREATE SUBSCRIBER ACCOUNT' : authMode === 'login' ? 'WELCOME BACK' : 'PASSWORD RECOVERY'} ]</span>
                </p>

                {/* Error Display Alert */}
                {(localError || authError) && (
                  <div
                    className="font-mono"
                    style={{
                      width: '100%',
                      background: 'rgba(231, 76, 60, 0.15)',
                      border: '1.5px solid #E74C3C',
                      borderRadius: '4px',
                      color: '#E74C3C',
                      padding: '0.75rem 1rem',
                      fontSize: '0.78rem'
                    }}
                  >
                    ⚠️ {localError || authError}
                  </div>
                )}

                {/* Reset Link Success Message */}
                {resetSuccessMessage && (
                  <div
                    className="font-mono"
                    style={{
                      width: '100%',
                      background: 'rgba(245, 230, 200, 0.15)',
                      border: '1.5px solid var(--accent-cream)',
                      borderRadius: '4px',
                      color: 'var(--accent-cream)',
                      padding: '0.75rem 1rem',
                      fontSize: '0.78rem'
                    }}
                  >
                    ✓ Password reset instructions sent to {email}. Check your inbox.
                  </div>
                )}

                {/* Google OAuth Button with D3OXY hover & shadow */}
                {authMode !== 'forgot' && (
                  <>
                    <button
                      type="button"
                      onClick={handleGoogleAuth}
                      disabled={isAuthLoading}
                      className="oauthButton"
                    >
                      <svg className="icon" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 15.907 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"/>
                      </svg>
                      SIGN IN WITH GOOGLE
                    </button>

                    {/* D3OXY Separator */}
                    <div className="separator">
                      <div />
                      <span>OR WORK EMAIL</span>
                      <div />
                    </div>
                  </>
                )}

                {/* Email / Password Form with D3OXY Input styling */}
                <form onSubmit={handleAuthSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', width: '100%' }}>
                  {authMode === 'signup' && (
                    <div>
                      <label className="font-mono" style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: 'var(--font-color-sub)', marginBottom: '0.4rem', textTransform: 'uppercase' }}>
                        FULL NAME
                      </label>
                      <input
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="Sarah Connor"
                        required
                      />
                    </div>
                  )}

                  <div>
                    <label className="font-mono" style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: 'var(--font-color-sub)', marginBottom: '0.4rem', textTransform: 'uppercase' }}>
                      WORK EMAIL ADDRESS
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@company.com"
                      required
                    />
                  </div>

                  {authMode === 'signup' && (
                    <div>
                      <label className="font-mono" style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: 'var(--font-color-sub)', marginBottom: '0.4rem', textTransform: 'uppercase' }}>
                        PHONE NUMBER (FOR HUMAN CALLS)
                      </label>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+1 (555) 000-0000"
                        required
                      />
                    </div>
                  )}

                  {authMode !== 'forgot' && (
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                        <label className="font-mono" style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--font-color-sub)', textTransform: 'uppercase' }}>
                          PASSWORD
                        </label>
                        {authMode === 'login' && (
                          <button
                            type="button"
                            onClick={() => { setAuthMode('forgot'); setLocalError(null); }}
                            className="font-mono"
                            style={{ background: 'none', border: 'none', color: 'var(--accent-cream)', fontSize: '0.72rem', cursor: 'pointer' }}
                          >
                            FORGOT PASSWORD?
                          </button>
                        )}
                      </div>
                      <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        required
                      />
                    </div>
                  )}

                  {/* Submit Button styled as D3OXY oauthButton */}
                  <button
                    type="submit"
                    disabled={isAuthLoading}
                    className="oauthButton"
                    style={{ marginTop: '0.5rem' }}
                  >
                    <span>
                      {isAuthLoading
                        ? 'AUTHENTICATING ACCOUNT...'
                        : authMode === 'signup'
                        ? 'CREATE ACCOUNT & VERIFY EMAIL →'
                        : authMode === 'login'
                        ? 'LOG IN TO DASHBOARD →'
                        : 'SEND RESET EMAIL →'}
                    </span>
                  </button>

                  {authMode === 'forgot' && (
                    <button
                      type="button"
                      onClick={() => setAuthMode('login')}
                      className="font-mono"
                      style={{ background: 'none', border: 'none', color: 'var(--text-muted)', fontSize: '0.75rem', cursor: 'pointer', marginTop: '0.5rem', alignSelf: 'center' }}
                    >
                      ← BACK TO LOG IN
                    </button>
                  )}

                </form>
              </>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}
