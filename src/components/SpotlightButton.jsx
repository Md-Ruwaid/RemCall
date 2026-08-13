import React from 'react';

const SpotlightButton = ({ text = 'FIX IT', onClick, style = {} }) => {
  return (
    <div className="button-borders" style={style}>
      <button className="primary-button" onClick={onClick}>
        {text}
      </button>
    </div>
  );
};

export default SpotlightButton;
