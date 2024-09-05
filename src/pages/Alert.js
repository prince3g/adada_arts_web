// src/components/Alert.js
import React from 'react';
import './Alert.css'; // Add your styles here

const Alert = ({ type, message, onClose }) => {
  return (
    <div className={`alert ${type}`}>
      <span className="alert-message">{message}</span>
      <button className="alert-close" onClick={onClose}>×</button>
    </div>
  );
};

export default Alert;
