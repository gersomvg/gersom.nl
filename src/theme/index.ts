const theme = {
  // Media queries
  s: '@media (max-width: 420px)',
  m: '@media (min-width: 420px) and (max-width: 620px)',
  l: '@media (min-width: 621px)',
  sm: '@media (max-width: 620px)',
  ml: '@media (min-width: 421px)',
  light: '@media (prefers-color-scheme: light)',
  dark: '@media (prefers-color-scheme: dark)',

  // Layout
  pageMaxWidth: '750px',

  // Colors
  color: {
    bodyBg: 'white',
    bodyBgDark: '#181818',
    accent: '#007AFF',
    accentLight: '#65AFFF',
    text: 'black',
    textLight: 'rgba(255,255,255,0.7)',
  },
};

export default theme;

export type Theme = typeof theme;
