
import React from 'react';

interface LogoProps {
  className?: string;
  outlineColor?: string; // Kept for prop compatibility, though not used in img
  fillColor?: string;    // Kept for prop compatibility
}

// Data URI for the Dawa Health Emblem (Blue Outline, Green Cross)
// This ensures the logo works reliably without external file dependencies that might be missing.
const LOGO_SRC = "data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMTAwIDEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMzcgMTAgTDYzIDEwIEw2MyAzNyBMOTAgMzcgTDkwIDYzIEw2MyA2MyBMNjMgOTAgTDM3IDkwIEwzNyA2MyBMMTAgNjMgTDEwIDM3IEwzNyAzNyBaIiBzdHJva2U9IiMxMTI3YWIiIHN0cm9rZS13aWR0aD0iNiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBmaWxsPSIjZmZmZmZmIi8+PHBhdGggZD0iTTQzIDM1IEw1NyAzNSBMNTcgNDMgTDY1IDQzIEw2NSA1NyBMNTcgNTcgTDU3IDY1IEw0MyA2NSBMNDMgNTcgTDM1IDU3IEwzNSA0MyBMNDMgNDMgWiIgZmlsbD0iIzQ2Yzc0MSIvPjwvc3ZnPg==";

export const Logo: React.FC<LogoProps> = ({ 
  className = "w-32 h-32",
  outlineColor, 
  fillColor
}) => (
  <img 
    src={LOGO_SRC} 
    alt="Dawa Health Logo" 
    className={`object-contain ${className}`}
  />
);
