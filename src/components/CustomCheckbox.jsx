import React from 'react';

export default function CustomCheckbox({ label, checked, onChange, disabled = false, subtext = null }) {
  const handleKeyDown = (e) => {
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      if (!disabled) onChange(!checked);
    }
  };

  return (
    <div
      className={`custom-checkbox-container ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      onClick={() => !disabled && onChange(!checked)}
      role="checkbox"
      aria-checked={checked}
      tabIndex={disabled ? -1 : 0}
      onKeyDown={handleKeyDown}
    >
      <div className={`custom-checkbox ${checked ? 'checked' : ''}`}>
        <svg className="custom-checkbox-icon" viewBox="0 0 24 24">
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </div>
      <div>
        <span style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--text-white)' }}>
          {label}
        </span>
        {subtext && (
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.1rem' }}>
            {subtext}
          </div>
        )}
      </div>
    </div>
  );
}
