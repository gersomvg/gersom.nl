import React from 'react';
import { ThemeProvider, createGlobalStyle } from 'styled-components';

import rootTheme from '../theme';

type Props = {
  children: React.ReactNode;
};

const CustomThemeProvider: React.FunctionComponent<Props> = ({ children }) => {
  return (
    <>
      <ThemeProvider theme={rootTheme}>
        <GlobalStylesReset />
        <GlobalStyles />
        {children}
      </ThemeProvider>
    </>
  );
};

const GlobalStylesReset = createGlobalStyle`
  /* http://meyerweb.com/eric/tools/css/reset/
	   v2.0 | 20110126
	   License: none (public domain)
	*/
  html,
  body,
  div,
  span,
  applet,
  object,
  iframe,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p,
  blockquote,
  pre,
  a,
  abbr,
  acronym,
  address,
  big,
  cite,
  code,
  del,
  dfn,
  em,
  img,
  ins,
  kbd,
  q,
  s,
  samp,
  small,
  strike,
  strong,
  sub,
  sup,
  tt,
  var,
  b,
  u,
  i,
  center,
  dl,
  dt,
  dd,
  ol,
  ul,
  li,
  fieldset,
  form,
  label,
  legend,
  table,
  caption,
  tbody,
  tfoot,
  thead,
  tr,
  th,
  td,
  article,
  aside,
  canvas,
  details,
  embed,
  figure,
  figcaption,
  footer,
  header,
  hgroup,
  menu,
  nav,
  output,
  ruby,
  section,
  summary,
  time,
  mark,
  audio,
  video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
  }
  /* HTML5 display-role reset for older browsers */
  article,
  aside,
  details,
  figcaption,
  figure,
  footer,
  header,
  hgroup,
  menu,
  nav,
  section {
    display: block;
  }
  body {
    line-height: 1;
  }
  ol,
  ul {
    list-style: none;
  }
  blockquote,
  q {
    quotes: none;
  }
  blockquote:before,
  blockquote:after,
  q:before,
  q:after {
    content: '';
    content: none;
  }
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }
`;

const GlobalStyles = createGlobalStyle`
  body {
    margin: 0;
    height: 100%;
    background: ${p => p.theme.color.bodyBg};
    line-height: 1.66;
    box-sizing: border-box;
    -webkit-text-size-adjust: 100%;
    font-size: 16px;
    ${p => p.theme.m} {
      font-size: 19px;
    }
    ${p => p.theme.l} {
      font-size: 20px;
    }
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
      Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji',
      'Segoe UI Symbol';
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: ${p => p.theme.color.text};
    ${p => p.theme.dark} {
      color: ${p => p.theme.color.textLight};
      background: ${p => p.theme.color.bodyBgDark};
    }
  }

  *,
  *:before,
  *:after {
      box-sizing: inherit;
  }

  button {
        border: none;
        margin: 0;
        padding: 0;
        width: auto;
        overflow: visible;
        background: transparent;
        color: inherit;
        font: inherit;
        line-height: normal;
        -webkit-font-smoothing: inherit;
        -moz-osx-font-smoothing: inherit;
        -webkit-appearance: none;
        cursor: pointer;
    }

    button::-moz-focus-inner {
        border: 0;
        padding: 0;
    }

    input {
        padding: 0;
        margin: 0;
        border: 0;
    }
`;

export default CustomThemeProvider;
