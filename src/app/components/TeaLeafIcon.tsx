import React from 'react';

type TeaLeafIconProps = {
  variant?: 'outline' | 'filled';
  width?: number;
  height?: number;
  className?: string;
};

/** Same organic tea-leaf silhouette used in the Freshness chapter particles */
export function TeaLeafIcon({
  variant = 'outline',
  width = 15,
  height = 20,
  className = '',
}: TeaLeafIconProps) {
  const filled = variant === 'filled';

  return (
    <svg
      viewBox="0 0 20 28"
      width={width}
      height={height}
      aria-hidden
      className={className}
    >
      <path
        d="M10 2.2 C15.8 4.4 15.2 12.2 10 25.8 C4.8 12.2 4.2 4.4 10 2.2 Z"
        fill={filled ? '#6d8f4f' : 'none'}
        stroke={filled ? '#5a7340' : 'rgba(98, 128, 72, 0.55)'}
        strokeWidth={filled ? 0.55 : 1.1}
        strokeLinejoin="round"
      />
      <path
        d="M10 5.8 V22.2"
        fill="none"
        stroke={filled ? 'rgba(42, 62, 30, 0.5)' : 'rgba(98, 128, 72, 0.45)'}
        strokeWidth={filled ? 0.65 : 0.85}
        strokeLinecap="round"
      />
      {filled ? (
        <>
          <path
            d="M10 10.5 Q12.8 13.2 13.6 16.2"
            fill="none"
            stroke="rgba(42, 62, 30, 0.35)"
            strokeWidth="0.45"
            strokeLinecap="round"
          />
          <path
            d="M10 12 Q7.4 14.2 6.6 17"
            fill="none"
            stroke="rgba(42, 62, 30, 0.35)"
            strokeWidth="0.45"
            strokeLinecap="round"
          />
        </>
      ) : null}
    </svg>
  );
}
