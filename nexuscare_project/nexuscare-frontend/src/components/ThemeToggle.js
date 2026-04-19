import React, { useEffect } from 'react';

const ThemeToggle = () => {
  const toggleTheme = () => {
    const current = document.documentElement.getAttribute('data-theme') || 'light';
    const next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
  };

  useEffect(() => {
    const saved = localStorage.getItem('theme');
    if (saved) {
      document.documentElement.setAttribute('data-theme', saved);
    } else {
      document.documentElement.setAttribute('data-theme', 'light'); // Default
    }
  }, []);

  return (
    <div className="theme-toggle">
      <i className="fas fa-sun"></i>
      <label className="theme-switch">
        <input type="checkbox" onChange={toggleTheme} />
        <span className="theme-slider"></span>
      </label>
      <i className="fas fa-moon"></i>
      <span className="label">Theme</span>
    </div>
  );
};

export default ThemeToggle;