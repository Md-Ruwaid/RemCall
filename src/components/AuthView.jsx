import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../context/AppContext';

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
    authError,
    isAuthLoading,
    user,
    setIsSubscribeModalOpen,
    setAuthModalMode,
    setActiveView
  } = useApp();

  const [authMode, setAuthMode] = useState('signup'); // 'signup' | 'login'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [fullName, setFullName] = useState('');
  const [activeQuoteIndex, setActiveQuoteIndex] = useState(0);
  const [localError, setLocalError] = useState(null);

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

    try {
      if (authMode === 'signup') {
        const res = await signupUser(fullName, email, phone, password);
        // Post-auth routing logic:
        if (res.user && res.user.subscriptionActive) {
          setActiveView('dashboard');
        } else {
          setAuthModalMode('subscribe');
          setIsSubscribeModalOpen(true);
          setActiveView('dashboard');
        }
      } else {
        const res = await loginUser(email, password);
        if (res.user && res.user.subscriptionActive) {
          setActiveView('dashboard');
        } else {
          setAuthModalMode('subscribe');
          setIsSubscribeModalOpen(true);
          setActiveView('dashboard');
        }
      }
    } catch (err) {
      setLocalError(err.message || 'Authentication failed. Please check your details.');
    }
  };

  const handleGoogleAuth = async () => {
    setLocalError(null);
    try {
      const mockCredential = `google_oauth_token_${Date.now()}`;
      const res = await loginWithGoogle(mockCredential);
      if (res.user && res.user.subscriptionActive) {
        setActiveView('dashboard');
      } else {
        setAuthModalMode('subscribe');
        setIsSubscribeModalOpen(true);
        setActiveView('dashboard');
      }
    } catch (err) {
      setLocalError('Google OAuth authentication failed.');
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
        paddingTop: '6rem',
        paddingBottom: '4rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <div className="container-wide" style={{ maxWidth: '1180px', width: '100%', margin: '0 auto', padding: '0 1.5rem' }}>
        
        {/* Main Authentication 3 Split-Panel Container */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
            gap: '2.5rem',
            alignItems: 'stretch',
            background: 'var(--bg-dark-secondary, #162C37)',
            border: '1.5px solid var(--border-subtle, #3A5C6E)',
            borderRadius: '0px',
            boxShadow: 'none',
            padding: '2.5rem'
          }}
        >

          {/* LEFT PANEL: Brand Messaging, Stat Strip & Rotating Customer Testimonials */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              gap: '2.5rem',
              paddingRight: '1rem'
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
                padding: '1.25rem 1.5rem',
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '1rem',
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
                        borderRadius: '0px',
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

          {/* RIGHT PANEL: Authentication Form (Sign Up / Log In) */}
          <div
            style={{
              background: 'var(--bg-card, #1C3644)',
              border: '1px solid var(--border-subtle, #3A5C6E)',
              borderRadius: '0px',
              padding: '2.5rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center'
            }}
          >
            {/* Tab Switcher: Sign Up vs Log In */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '0.5rem',
                marginBottom: '1.75rem',
                background: 'var(--bg-dark)',
                padding: '0.3rem',
                border: '1px solid var(--border-subtle)'
              }}
            >
              <button
                type="button"
                onClick={() => { setAuthMode('signup'); setLocalError(null); }}
                className="font-mono"
                style={{
                  padding: '0.6rem 0',
                  background: authMode === 'signup' ? 'var(--accent-cream)' : 'transparent',
                  color: authMode === 'signup' ? 'var(--bg-dark)' : 'var(--text-muted)',
                  border: 'none',
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  letterSpacing: '0.08em'
                }}
              >
                SIGN UP
              </button>

              <button
                type="button"
                onClick={() => { setAuthMode('login'); setLocalError(null); }}
                className="font-mono"
                style={{
                  padding: '0.6rem 0',
                  background: authMode === 'login' ? 'var(--accent-cream)' : 'transparent',
                  color: authMode === 'login' ? 'var(--bg-dark)' : 'var(--text-muted)',
                  border: 'none',
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  letterSpacing: '0.08em'
                }}
              >
                LOG IN
              </button>
            </div>

            {/* Form Header Title */}
            <div style={{ marginBottom: '1.5rem' }}>
              <div className="font-mono" style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 700, letterSpacing: '0.08em' }}>
                [ {authMode === 'signup' ? 'CREATE SUBSCRIBER ACCOUNT' : 'WELCOME BACK'} ]
              </div>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--text-white)', marginTop: '0.2rem' }}>
                {authMode === 'signup' ? 'START YOUR PROTOCOL' : 'AUTHENTICATE ACCESS'}
              </h2>
            </div>

            {/* Error Display Alert */}
            {(localError || authError) && (
              <div
                className="font-mono"
                style={{
                  background: 'rgba(231, 76, 60, 0.15)',
                  border: '1px solid #E74C3C',
                  color: '#E74C3C',
                  padding: '0.75rem 1rem',
                  fontSize: '0.78rem',
                  marginBottom: '1.25rem'
                }}
              >
                ⚠️ {localError || authError}
              </div>
            )}

            {/* Social OAuth Buttons */}
            <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.5rem' }}>
              <button
                type="button"
                onClick={handleGoogleAuth}
                disabled={isAuthLoading}
                style={{
                  flex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  padding: '0.75rem',
                  background: 'var(--bg-dark)',
                  border: '1px solid var(--border-subtle)',
                  color: 'var(--text-white)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 15.907 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"/>
                </svg>
                GOOGLE
              </button>

              <button
                type="button"
                onClick={handleGoogleAuth}
                disabled={isAuthLoading}
                style={{
                  flex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  padding: '0.75rem',
                  background: 'var(--bg-dark)',
                  border: '1px solid var(--border-subtle)',
                  color: 'var(--text-white)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.34c.64-.78 1.08-1.85.96-2.94-0.93.04-2.06.62-2.73 1.4-.6.69-1.12 1.79-.98 2.86 1.04.08 2.11-.54 2.75-1.32z"/>
                </svg>
                APPLE
              </button>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.25rem' }}>
              <div style={{ flex: 1, height: '1px', background: 'var(--border-subtle)' }} />
              <span className="font-mono" style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>OR WORK EMAIL</span>
              <div style={{ flex: 1, height: '1px', background: 'var(--border-subtle)' }} />
            </div>

            {/* Email / Password Input Form */}
            <form onSubmit={handleAuthSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {authMode === 'signup' && (
                <div>
                  <label className="font-mono" style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '0.4rem', textTransform: 'uppercase' }}>
                    FULL NAME
                  </label>
                  <input
                    type="text"
                    className="ringly-input"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Sarah Connor"
                    required
                  />
                </div>
              )}

              <div>
                <label className="font-mono" style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '0.4rem', textTransform: 'uppercase' }}>
                  WORK EMAIL ADDRESS
                </label>
                <input
                  type="email"
                  className="ringly-input"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  required
                />
              </div>

              {authMode === 'signup' && (
                <div>
                  <label className="font-mono" style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '0.4rem', textTransform: 'uppercase' }}>
                    PHONE NUMBER (FOR HUMAN CALLS)
                  </label>
                  <input
                    type="tel"
                    className="ringly-input"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+1 (555) 000-0000"
                    required
                  />
                </div>
              )}

              <div>
                <label className="font-mono" style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '0.4rem', textTransform: 'uppercase' }}>
                  PASSWORD
                </label>
                <input
                  type="password"
                  className="ringly-input"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                />
              </div>

              {/* Ringly Primary Spotlight-Style Sign In Button */}
              <button
                type="submit"
                disabled={isAuthLoading}
                className="ringly-auth-btn"
                style={{
                  marginTop: '0.5rem',
                  padding: '1rem',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.9rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  cursor: 'pointer'
                }}
              >
                <span>
                  {isAuthLoading
                    ? 'AUTHENTICATING ACCOUNT...'
                    : authMode === 'signup'
                    ? 'CONTINUE TO PLAN CHECKOUT →'
                    : 'LOG IN TO DASHBOARD →'}
                </span>
              </button>

            </form>
          </div>

        </div>

      </div>
    </div>
  );
}
