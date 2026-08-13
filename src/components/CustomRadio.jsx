import React from 'react';

export default function CustomRadioGroup({ options, value, onChange, label = null }) {
  return (
    <div>
      {label && (
        <div style={{
          fontSize: '0.85rem',
          fontFamily: 'var(--font-display)',
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: '0.06em',
          color: 'var(--text-muted)',
          marginBottom: '0.75rem'
        }}>
          {label}
        </div>
      )}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '0.75rem' }}>
        {options.map((opt) => {
          const isActive = value === opt.value;
          return (
            <div
              key={opt.value}
              className={`custom-pill-option ${isActive ? 'active' : ''}`}
              onClick={() => onChange(opt.value)}
              role="radio"
              aria-checked={isActive}
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === ' ' || e.key === 'Enter') {
                  e.preventDefault();
                  onChange(opt.value);
                }
              }}
            >
              <div>
                <div style={{
                  fontSize: '0.9rem',
                  fontWeight: 700,
                  color: isActive ? 'var(--accent-cream)' : 'var(--text-white)'
                }}>
                  {opt.label}
                </div>
                {opt.sublabel && (
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.15rem' }}>
                    {opt.sublabel}
                  </div>
                )}
              </div>
              <div style={{
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                border: `1.5px solid ${isActive ? 'var(--accent-cream)' : 'var(--border-subtle)'}`,
                backgroundColor: isActive ? 'var(--accent-cream)' : 'transparent',
                transition: 'all 0.15s ease'
              }} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
