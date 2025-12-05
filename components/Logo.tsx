
import React from 'react';

interface LogoProps {
  className?: string;
  outlineColor?: string; // Kept for prop compatibility, though not used in img
  fillColor?: string;    // Kept for prop compatibility
}

// Data URI for the Dawa Health Logo (Green Rounded Cross)
const LOGO_SRC = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3QgeD0iNzAiIHk9IjIwIiB3aWR0aD0iNjAiIGhlaWdodD0iMTYwIiByeD0iMTIiIGZpbGw9IiM0NmM3NDEiLz48cmVjdCB4PSIyMCIgeT0iNzAiIHdpZHRoPSIxNjAiIGhlaWdodD0iNjAiIHJ4PSIxMiIgZmlsbD0iIzQ2Yzc0MSIvPjwvc3ZnPg==";

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
