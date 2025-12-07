interface LogoProps {
  className?: string;
  outlineColor?: string;
  fillColor?: string; // color for inner cross
}

export function Logo({
  className,
  outlineColor = "#FFFFFF", // white outline
  fillColor = "#3CCB4A",     // green cross
}: LogoProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1250 1250"
      className={className}
    >
      {/* INNER GREEN CROSS */}
      <path
        d="
        M 547,346 L 530,361 L 505,511 L 350,538 L 346,704 
        L 363,720 L 517,742 L 671,892 L 742,740 L 900,743 L 900,710
        L 903,547 L 887,530 L 738,505 L 707,348 Z
        "
        fill={fillColor}
      />

      {/* OUTER WHITE OUTLINE */}
      <path
        d="
        M 412,1 L 356,353 L 1,412 L 1,838 L 351,892 
        L 413,1249 L 836,1249 L 891,899 L 1248,837 
        L 1248,412 L 892,352 L 839,2 Z
        "
        fill="none"
        stroke={outlineColor}
        strokeWidth="60"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </svg>
  );
}
