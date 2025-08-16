import React from "react";

export const NavButton = ({ icon, label, onClick, active }) => (
  <button className={`nav-btn${active ? " active" : ""}`} onClick={onClick}>
    <span className="nav-icon">{icon}</span>
    <span>{label}</span>
  </button>
);

export const MobileNavButton = ({ icon, label, onClick, active }) => (
  <button
    className={`nav-btn mobile${active ? " active" : ""}`}
    onClick={onClick}
  >
    <span className="nav-icon">{icon}</span>
    <span>{label}</span>
  </button>
);
