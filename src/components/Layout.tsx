import React from 'react';
import styled, { ThemeProvider, createGlobalStyle } from 'styled-components';
import { Link } from 'gatsby';

import rootTheme from '../theme';

type Props = {
  children: React.ReactNode;
};

const Layout: React.FunctionComponent<Props> = ({ children }) => {
  return (
    <>
      <ThemeProvider theme={rootTheme}>
        <GlobalStylesReset />
        <GlobalStyles />

        <Header>
          <SiteNameBigger>
            <Link to="/">Gersom van Ginkel</Link>
          </SiteNameBigger>
          <SiteNameSmaller>
            <Link to="/">Gersom</Link>
          </SiteNameSmaller>
          <Nav>
            <NavItem to="/posts">Posts</NavItem>
            <NavItem to="/work">Work</NavItem>
            <NavItem to="/contact">Contact</NavItem>
          </Nav>
        </Header>
        <Content>{children}</Content>
      </ThemeProvider>
    </>
  );
};

const Header = styled.header`
  width: ${p => p.theme.pageMaxWidth};
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 30px auto;
  max-width: calc(100% - 40px);
  ${p => p.theme.ml} {
    max-width: calc(100% - 60px);
  }
`;

const SiteNameSmaller = styled.h1`
  font-size: 16px;
  line-height: 1.25;
  font-weight: bold;
  display: block;
  ${p => p.theme.l} {
    display: none;
  }
  a {
    color: inherit;
    text-decoration: none;
  }
  a:hover,
  a:focus {
    color: ${p => p.theme.color.accent};
    ${p => p.theme.dark} {
      color: ${p => p.theme.color.accentLight};
    }
  }
  a:active {
    transform: scale(0.95);
  }
`;

const SiteNameBigger = styled(SiteNameSmaller)`
  font-size: 18px;
  display: none;
  ${p => p.theme.l} {
    display: block;
  }
`;

const Nav = styled.div`
  display: flex;
`;

const NavItem = styled(Link).attrs({ activeClassName: 'active' })`
  line-height: 1.25;
  font-weight: 500;
  font-size: 15px;
  text-decoration: none;
  position: relative;
  color: inherit;
  opacity: 0.7;
  ${p => p.theme.l} {
    font-size: 18px;
  }
  + * {
    margin-left: 25px;
    ${p => p.theme.l} {
      margin-left: 50px;
    }
  }
  :hover,
  :focus {
    opacity: 1;
  }
  &.active {
    opacity: 1;
    color: ${p => p.theme.color.accent};
    ${p => p.theme.dark} {
      color: ${p => p.theme.color.accentLight};
    }
  }
`;

const Content = styled.section`
  width: ${p => p.theme.pageMaxWidth};
  padding: 30px 0;
  margin: 0 auto;
  max-width: calc(100% - 40px);
  ${p => p.theme.ml} {
    padding: 50px 0;
    max-width: calc(100% - 60px);
  }
  > :first-child {
    margin-top: 0;
  }
  > :last-child {
    margin-bottom: 0;
  }
`;

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
  html {
    box-sizing: border-box;
  }
  body {
    font-size: 16px;
    line-height: 1.4;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
      Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji',
      'Segoe UI Symbol';
    margin: 0;
    height: 100%;
    background: ${p => p.theme.color.bodyBg};
    color: ${p => p.theme.color.text};
    ${p => p.theme.dark} {
      background: ${p => p.theme.color.bodyBgDark};
      color: ${p => p.theme.color.textLight};
    }
  }
  * {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
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

export default Layout;
