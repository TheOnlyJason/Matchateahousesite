import React from 'react';
import { publicAssetBase } from '../utils/publicAssetBase';

type WordmarkColor = 'white' | 'black' | 'inherit';

type ConstanceWordmarkProps = {
  size?: 'hero' | 'nav' | 'footer';
  color?: WordmarkColor;
  stacked?: boolean;
  splitLetters?: boolean;
  className?: string;
  opacity?: number;
  as?: 'span' | 'h1';
};

const TEXT_STYLES: Record<
  NonNullable<ConstanceWordmarkProps['size']>,
  React.CSSProperties
> = {
  hero: {
    fontSize: 'clamp(3rem, 12vw, 7rem)',
    letterSpacing: '0.1em',
  },
  nav: {
    fontSize: '0.6875rem',
    letterSpacing: '0.24em',
  },
  footer: {
    fontSize: '0.8125rem',
    letterSpacing: '0.22em',
  },
};

const COLOR_STYLES: Record<WordmarkColor, React.CSSProperties> = {
  white: { color: '#ffffff' },
  black: { color: '#000000' },
  inherit: {},
};

const MARK_HEIGHT: Record<NonNullable<ConstanceWordmarkProps['size']>, string> = {
  hero: 'clamp(28px, 4vw, 40px)',
  nav: '20px',
  footer: '24px',
};

export function ConstanceWordmark({
  size = 'hero',
  color = 'inherit',
  stacked = false,
  splitLetters = false,
  className = '',
  opacity,
  as: Tag = 'span',
}: ConstanceWordmarkProps) {
  const markSrc =
    color === 'black'
      ? `${publicAssetBase()}constance-mark-black.svg`
      : `${publicAssetBase()}constance-mark-white.svg`;

  const letterOpacity = stacked ? undefined : opacity;

  const text = splitLetters ? (
    <Tag
      className={`constance-wordmark inline-flex ${className}`.trim()}
      style={{
        ...TEXT_STYLES[size],
        ...COLOR_STYLES[color],
      }}
      aria-label="Constance"
    >
      {[...'CONSTANCE'].map((char, index) => (
        <span
          key={`${char}-${index}`}
          className="constance-wordmark-letter inline-block will-change-transform"
          aria-hidden="true"
        >
          {char}
        </span>
      ))}
    </Tag>
  ) : (
    <Tag
      className={`constance-wordmark block ${className}`.trim()}
      style={{
        ...TEXT_STYLES[size],
        ...COLOR_STYLES[color],
        opacity: letterOpacity,
      }}
    >
      Constance
    </Tag>
  );

  if (!stacked) {
    return text;
  }

  return (
    <span
      className={`inline-flex flex-col items-center gap-1.5 ${className}`.trim()}
      style={{ opacity }}
    >
      <img
        src={markSrc}
        alt=""
        aria-hidden="true"
        style={{ height: MARK_HEIGHT[size], width: 'auto' }}
      />
      {text}
    </span>
  );
}
