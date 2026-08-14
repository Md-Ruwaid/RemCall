import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { useIsMobile } from '../hooks/useIsMobile';

export default function SubscribeModal() {
  const {
    isSubscribeModalOpen,
    setIsSubscribeModalOpen,
    authModalMode,
    setAuthModalMode,
    calculatePrice,
    activateSubscription,
    loginUser,
    setActiveView
  } = useApp();

  const isMobile = useIsMobile(768);
  const [callsPerDay, setCallsPerDay] = useState(2);
  const [phone, setPhone] = useState('+1 (555) 019-2834');
  const [name, setName] = useState('Sarah Connor');
  const [email, setEmail] = useState('sarah@example.com');
  const [password, setPassword] = useState('••••••••');
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  if (!isSubscribeModalOpen) return null;

  const weeklyCost = calculatePrice(callsPerDay);

  const handleCheckout = (e) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      setPaymentSuccess(true);
      setTimeout(() => {
        activateSubscription(callsPerDay, phone, name);
        setPaymentSuccess(false);
        setActiveView('dashboard');
      }, 1200);
    }, 1000);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      loginUser(email, phone);
      setIsSubscribeModalOpen(false);
      setActiveView('dashboard');
    }, 800);
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 100,
        backgroundColor: 'rgba(16, 33, 42, 0.88)',
        backdropFilter: 'blur(10px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: isMobile ? '1rem' : '1.5rem'
      }}
    >
      <div
        className="ringly-card view-fade-enter"
        style={{
          maxWidth: isMobile ? '100%' : '520px',
          width: '100%',
          maxHeight: isMobile ? 'calc(100vh - 2rem)' : 'calc(100vh - 3rem)',
          overflowY: 'auto',
          padding: isMobile ? '1.5rem 1.25rem' : '2.5rem',
          position: 'relative',
          background: 'var(--bg-card, #1C3644)',
          border: '1px solid var(--border-subtle, #3A5C6E)',
          borderRadius: '6px 6px 0 0',
          boxShadow: 'none'
        }}
      >
        {/* Close Button */}
        <button
          onClick={() => setIsSubscribeModalOpen(false)}
          style={{
            position: 'absolute',
            top: '1rem',
            right: '1rem',
            background: 'none',
            border: 'none',
            color: 'var(--text-muted)',
            fontSize: '1.4rem',
            cursor: 'pointer',
            lineHeight: 1,
            minWidth: '44px',
            minHeight: '44px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          ✕
        </button>

        {/* Header Mode Switcher */}
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.75rem' }}>
          <button
            type="button"
            onClick={() => setAuthModalMode('auth')}
            className="font-mono"
            style={{
              background: 'none',
              border: 'none',
              fontSize: '0.82rem',
              fontWeight: 700,
              color: authModalMode === 'auth' ? 'var(--accent-cream)' : 'var(--text-muted)',
              cursor: 'pointer',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              borderBottom: authModalMode === 'auth' ? '2px solid var(--accent-cream)' : 'none',
              paddingBottom: '0.25rem'
            }}
          >
            [ LOG IN / AUTH ]
          </button>
          <button
            type="button"
            onClick={() => setAuthModalMode('subscribe')}
            className="font-mono"
            style={{
              background: 'none',
              border: 'none',
              fontSize: '0.82rem',
              fontWeight: 700,
              color: authModalMode === 'subscribe' ? 'var(--accent-cream)' : 'var(--text-muted)',
              cursor: 'pointer',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              borderBottom: authModalMode === 'subscribe' ? '2px solid var(--accent-cream)' : 'none',
              paddingBottom: '0.25rem'
            }}
          >
            [ SUBSCRIBE / PLAN ]
          </button>
        </div>

        {/* AUTHENTICATION FORM MODE */}
        {authModalMode === 'auth' && (
          <div>
            <div className="font-mono" style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 700, letterSpacing: '0.08em' }}>
              [ USER AUTHENTICATION PROTOCOL ]
            </div>

            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.75rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--text-white)', marginTop: '0.25rem', marginBottom: '1.5rem' }}>
              ACCESS RINGLY DASHBOARD
            </h2>

            {/* Social OAuth Options */}
            <div style={{ marginBottom: '1.5rem' }}>
              <div className="font-mono" style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.75rem', textTransform: 'uppercase' }}>
                QUICK LOG IN WITH:
              </div>
              <div style={{ display: 'flex', gap: '0.75rem' }}>
                {/* Google */}
                <button
                  type="button"
                  onClick={handleLogin}
                  style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                    padding: '0.75rem',
                    background: 'var(--bg-dark)',
                    border: '1px solid var(--border-subtle)',
                    color: 'var(--text-white)',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 15.907 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"/>
                  </svg>
                  GOOGLE
                </button>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.25rem' }}>
              <div style={{ flex: 1, height: '1px', background: 'var(--border-subtle)' }} />
              <span className="font-mono" style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>OR EMAIL LOGIN</span>
              <div style={{ flex: 1, height: '1px', background: 'var(--border-subtle)' }} />
            </div>

            <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div>
                <label className="font-mono" style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '0.4rem', textTransform: 'uppercase' }}>
                  SUBSCRIBER EMAIL
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

              <div>
                <label className="font-mono" style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '0.4rem', textTransform: 'uppercase' }}>
                  PASSWORD / ACCESS CODE
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

              <button
                type="submit"
                className="btn-primary"
                disabled={isProcessing}
                style={{ width: '100%', padding: '1rem', fontSize: '0.95rem', marginTop: '0.5rem' }}
              >
                {isProcessing ? 'AUTHENTICATING ACCOUNT...' : 'AUTHENTICATE & ENTER DASHBOARD'}
              </button>
            </form>
          </div>
        )}

        {/* SUBSCRIBE CHECKOUT MODE */}
        {authModalMode === 'subscribe' && !paymentSuccess && (
          <div>
            <div className="font-mono" style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 700, letterSpacing: '0.08em' }}>
              [ CHECKOUT & SUBSCRIPTION PROTOCOL ]
            </div>

            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.75rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--text-white)', marginTop: '0.25rem', marginBottom: '1.5rem' }}>
              START RINGLY HUMAN CALLS
            </h2>

            <form onSubmit={handleCheckout} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              
              {/* Daily Call Selector */}
              <div>
                <label className="font-mono" style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '0.5rem', textTransform: 'uppercase' }}>
                  DAILY CALL ALLOWANCE (1–6 CALLS/DAY)
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: isMobile ? 'repeat(3, 1fr)' : 'repeat(6, 1fr)', gap: '0.5rem' }}>
                  {[1, 2, 3, 4, 5, 6].map((num) => (
                    <button
                      key={num}
                      type="button"
                      onClick={() => setCallsPerDay(num)}
                      style={{
                        background: callsPerDay === num ? 'var(--accent-cream)' : 'var(--bg-dark)',
                        color: callsPerDay === num ? 'var(--bg-dark)' : 'var(--text-white)',
                        border: `1px solid ${callsPerDay === num ? 'var(--accent-cream)' : 'var(--border-subtle)'}`,
                        borderRadius: '0px',
                        padding: '0.65rem 0',
                        fontFamily: 'var(--font-display)',
                        fontWeight: 800,
                        fontSize: '1.05rem',
                        cursor: 'pointer'
                      }}
                    >
                      {num}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Calculation Display */}
              <div style={{
                background: 'var(--bg-dark)',
                padding: '1.1rem',
                borderRadius: '0px',
                border: '1px solid var(--border-subtle)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}>
                <div>
                  <div className="font-mono" style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                    RATE: ₹149 + ₹60 × ({callsPerDay} − 1)
                  </div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-white)', fontWeight: 600 }}>
                    Weekly Billing Rate
                  </div>
                </div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.75rem', fontWeight: 800, color: 'var(--accent-cream)' }}>
                  ₹{weeklyCost}<span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>/wk</span>
                </div>
              </div>

              {/* Phone Input (Mandatory) */}
              <div>
                <label className="font-mono" style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '0.4rem', textTransform: 'uppercase' }}>
                  OPERATIONAL PHONE NUMBER (FOR HUMAN CALLS)
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

              {/* Name Input */}
              <div>
                <label className="font-mono" style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '0.4rem', textTransform: 'uppercase' }}>
                  SUBSCRIBER FULL NAME
                </label>
                <input
                  type="text"
                  className="ringly-input"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your Name"
                  required
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="btn-primary"
                disabled={isProcessing}
                style={{ width: '100%', padding: '1rem', fontSize: '0.95rem', marginTop: '0.5rem' }}
              >
                {isProcessing ? 'PROCESSING ORDER...' : `PAY ₹${weeklyCost} & ACTIVATE SERVICE`}
              </button>
            </form>
          </div>
        )}

        {/* SUCCESS CONFIRMATION STATE */}
        {paymentSuccess && (
          <div style={{ textAlign: 'center', padding: '2rem 0' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>🎉</div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', fontWeight: 800, color: 'var(--accent-cream)', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
              SUBSCRIPTION ACTIVATED!
            </h2>
            <p className="font-mono" style={{ color: 'var(--text-white)', fontSize: '0.95rem', marginBottom: '1rem' }}>
              WELCOME TO RINGLY, {name.toUpperCase()}. REDIRECTING TO DASHBOARD...
            </p>
          </div>
        )}

      </div>
    </div>
  );
}
