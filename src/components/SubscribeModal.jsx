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
        backgroundColor: 'rgba(23, 23, 23, 0.45)',
        backdropFilter: 'blur(6px)',
        WebkitBackdropFilter: 'blur(6px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: isMobile ? '1rem' : '1.5rem'
      }}
      onClick={() => setIsSubscribeModalOpen(false)}
    >
      <div
        className="ringly-card view-fade-enter"
        style={{
          maxWidth: '480px',
          width: '100%',
          maxHeight: 'calc(100vh - 3rem)',
          overflowY: 'auto',
          padding: isMobile ? '1.75rem 1.25rem' : '2.5rem',
          position: 'relative',
          backgroundColor: 'var(--bg-surface)',
          borderRadius: 'var(--radius-lg)',
          boxShadow: 'var(--shadow-modal)'
        }}
        onClick={e => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        {/* Close Button */}
        <button
          onClick={() => setIsSubscribeModalOpen(false)}
          className="btn-ghost"
          style={{
            position: 'absolute',
            top: '1rem',
            right: '1rem',
            fontSize: '1.25rem',
            padding: '0.4rem',
            lineHeight: 1
          }}
          aria-label="Close"
        >
          ✕
        </button>

        {/* Header Mode Switcher */}
        <div style={{
          display: 'flex',
          borderBottom: '1px solid var(--border-subtle)',
          marginBottom: '1.75rem'
        }}>
          <button
            type="button"
            onClick={() => setAuthModalMode('subscribe')}
            className="btn-ghost"
            style={{
              flex: 1,
              padding: '0.65rem 0',
              borderRadius: 0,
              borderBottom: authModalMode === 'subscribe' ? '2px solid var(--text-primary)' : '2px solid transparent',
              color: authModalMode === 'subscribe' ? 'var(--text-primary)' : 'var(--text-secondary)',
              fontWeight: authModalMode === 'subscribe' ? 600 : 500
            }}
          >
            Start Plan
          </button>
          <button
            type="button"
            onClick={() => setAuthModalMode('auth')}
            className="btn-ghost"
            style={{
              flex: 1,
              padding: '0.65rem 0',
              borderRadius: 0,
              borderBottom: authModalMode === 'auth' ? '2px solid var(--text-primary)' : '2px solid transparent',
              color: authModalMode === 'auth' ? 'var(--text-primary)' : 'var(--text-secondary)',
              fontWeight: authModalMode === 'auth' ? 600 : 500
            }}
          >
            Log In
          </button>
        </div>

        {/* AUTHENTICATION FORM MODE */}
        {authModalMode === 'auth' && (
          <div>
            <h2 style={{
              fontSize: '1.5rem',
              fontWeight: 700,
              color: 'var(--text-primary)',
              marginBottom: '1.5rem'
            }}>
              Access your dashboard
            </h2>

            <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.35rem' }}>
                  Email Address
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
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.35rem' }}>
                  Password
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
                className="btn-primary btn-coral"
                disabled={isProcessing}
                style={{ width: '100%', padding: '0.85rem', marginTop: '0.5rem', fontSize: '0.95rem' }}
              >
                {isProcessing ? 'Authenticating…' : 'Log In to Dashboard'}
              </button>
            </form>
          </div>
        )}

        {/* SUBSCRIBE CHECKOUT MODE */}
        {authModalMode === 'subscribe' && !paymentSuccess && (
          <div>
            <h2 style={{
              fontSize: '1.5rem',
              fontWeight: 700,
              color: 'var(--text-primary)',
              marginBottom: '1.5rem'
            }}>
              Activate human phone reminders
            </h2>

            <form onSubmit={handleCheckout} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              
              {/* Daily Call Selector */}
              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
                  Calls per day
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '0.35rem' }}>
                  {[1, 2, 3, 4, 5, 6].map((num) => (
                    <button
                      key={num}
                      type="button"
                      onClick={() => setCallsPerDay(num)}
                      style={{
                        backgroundColor: callsPerDay === num ? 'var(--text-primary)' : 'var(--bg-surface-subtle)',
                        color: callsPerDay === num ? 'var(--text-inverse)' : 'var(--text-primary)',
                        border: `1px solid ${callsPerDay === num ? 'var(--text-primary)' : 'var(--border-subtle)'}`,
                        borderRadius: 'var(--radius-sm)',
                        padding: '0.65rem 0',
                        fontSize: '1rem',
                        fontWeight: 600,
                        cursor: 'pointer',
                        transition: 'all 0.15s ease'
                      }}
                    >
                      {num}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Calculation Display */}
              <div style={{
                backgroundColor: 'var(--bg-surface-subtle)',
                padding: '1rem 1.25rem',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-subtle)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}>
                <div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-primary)', fontWeight: 600 }}>
                    Weekly subscription
                  </div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                    ₹149 base + ₹60 × ({callsPerDay} − 1)
                  </div>
                </div>
                <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                  ₹{weeklyCost}<span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>/wk</span>
                </div>
              </div>

              {/* Phone Input */}
              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.35rem' }}>
                  Phone number for operator calls
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
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.35rem' }}>
                  Full name
                </label>
                <input
                  type="text"
                  className="ringly-input"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Sarah Connor"
                  required
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="btn-primary btn-coral"
                disabled={isProcessing}
                style={{ width: '100%', padding: '0.85rem', fontSize: '0.95rem', marginTop: '0.5rem' }}
              >
                {isProcessing ? 'Processing…' : `Pay ₹${weeklyCost} & Activate Plan`}
              </button>
            </form>
          </div>
        )}

        {/* SUCCESS CONFIRMATION STATE */}
        {paymentSuccess && (
          <div style={{ textAlign: 'center', padding: '2rem 0' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem', color: 'var(--accent-green)' }}>✓</div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
              Subscription activated
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginBottom: '1rem' }}>
              Welcome to Ringly, {name}. Entering your dashboard…
            </p>
          </div>
        )}

      </div>
    </div>
  );
}
