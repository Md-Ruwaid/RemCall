import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import CustomRadioGroup from './CustomRadio';

export default function SubscribeModal() {
  const { isSubscribeModalOpen, setIsSubscribeModalOpen, calculatePrice, activateSubscription } = useApp();

  const [callsPerDay, setCallsPerDay] = useState(2);
  const [phone, setPhone] = useState('+1 (555) 019-2834');
  const [name, setName] = useState('Sarah Connor');
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  if (!isSubscribeModalOpen) return null;

  const weeklyCost = calculatePrice(callsPerDay);

  const handleCheckout = (e) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate Razorpay server-side order calculation & payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setPaymentSuccess(true);
      setTimeout(() => {
        activateSubscription(callsPerDay, phone, name);
        setPaymentSuccess(false);
      }, 1400);
    }, 1200);
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 100,
      backgroundColor: 'rgba(10, 22, 29, 0.85)',
      backdropFilter: 'blur(10px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1.5rem'
    }}>
      
      <div className="ringly-card view-fade-enter" style={{
        maxWidth: '540px',
        width: '100%',
        padding: '3rem 2.5rem',
        position: 'relative',
        boxShadow: 'none'
      }}>

        {/* Close Button */}
        <button
          onClick={() => setIsSubscribeModalOpen(false)}
          style={{
            position: 'absolute',
            top: '1.5rem',
            right: '1.5rem',
            background: 'none',
            border: 'none',
            color: 'var(--text-muted)',
            fontSize: '1.5rem',
            cursor: 'pointer',
            lineHeight: 1
          }}
        >
          ✕
        </button>

        {!paymentSuccess ? (
          <div>
            <div style={{ fontSize: '0.8rem', fontFamily: 'var(--font-display)', color: 'var(--accent-cream)', fontWeight: 700, letterSpacing: '0.1em' }}>
              [ CHECKOUT & SUBSCRIPTION ]
            </div>

            <h2 style={{ fontSize: '2rem', fontWeight: 800, textTransform: 'uppercase', marginTop: '0.2rem', marginBottom: '1.5rem' }}>
              START RINGLY SERVICE
            </h2>

            <form onSubmit={handleCheckout} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              
              {/* Daily Call Selector */}
              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', fontFamily: 'var(--font-display)', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '0.5rem', textTransform: 'uppercase' }}>
                  DAILY CALL ALLOWANCE (1–6 CALLS/DAY)
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '0.5rem' }}>
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
                        padding: '0.75rem 0',
                        fontFamily: 'var(--font-display)',
                        fontWeight: 800,
                        fontSize: '1.1rem',
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
                padding: '1.25rem',
                borderRadius: '0px',
                border: '1px solid var(--border-subtle)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}>
                <div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                    FORMULA: ₹149 + ₹60 × ({callsPerDay} − 1)
                  </div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-white)', fontWeight: 600 }}>
                    Weekly Billing Rate
                  </div>
                </div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', fontWeight: 800, color: 'var(--accent-cream)' }}>
                  ₹{weeklyCost}<span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>/wk</span>
                </div>
              </div>

              {/* Phone Input (Mandatory) */}
              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', fontFamily: 'var(--font-display)', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '0.4rem', textTransform: 'uppercase' }}>
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
                <label style={{ display: 'block', fontSize: '0.78rem', fontFamily: 'var(--font-display)', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '0.4rem', textTransform: 'uppercase' }}>
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
                style={{ width: '100%', padding: '1.1rem', fontSize: '1rem', marginTop: '0.5rem' }}
              >
                {isProcessing ? 'PROCESSING RAZORPAY ORDER...' : `PAY ₹${weeklyCost} & ACTIVATE SERVICE`}
              </button>

              <div style={{ fontSize: '0.75rem', color: 'var(--text-subtle)', textAlign: 'center' }}>
                🔒 Secure 256-bit encrypted checkout via Razorpay API. Auto-renews every Sunday.
              </div>

            </form>
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '2rem 0' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🎉</div>
            <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--accent-cream)', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
              SUBSCRIPTION ACTIVATED!
            </h2>
            <p style={{ color: 'var(--text-white)', fontSize: '1.05rem', marginBottom: '1rem' }}>
              Welcome to Ringly, {name}. Your phone ({phone}) is now verified for daily human calls!
            </p>
          </div>
        )}

      </div>

    </div>
  );
}
