import React from 'react';
import styled, {
  ThemeProvider,
  createGlobalStyle,
  css,
} from 'styled-components';

import rootTheme from '../theme';

type Props = {
  children: React.ReactNode;
};

const Layout: React.FunctionComponent<Props> = ({ children }) => {
  return (
    <>
      <GlobalStylesReset />
      <GlobalStyles />

      <ThemeProvider theme={rootTheme}>
        <CenterPage>
          <Header>
            <SiteName>
              Gersom
              <span
                css={css`
                  ${props => props.theme.smaller} {
                    display: none;
                  }
                `}
              >
                {' '}
                van Ginkel
              </span>
            </SiteName>
            <Nav>
              <NavItem>Posts</NavItem>
              <NavItem>Work</NavItem>
              <NavItem>Contact</NavItem>
            </Nav>
          </Header>
          <div>{children}</div>
        </CenterPage>
      </ThemeProvider>
    </>
  );
};

const CenterPage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Header = styled.header`
  margin: 30px 20px;
  width: 750px;
  max-width: calc(100% - 40px);
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const SiteName = styled.h1`
  font-size: 18px;
  font-weight: bold;
`;

const Nav = styled.div`
  display: flex;
`;

const NavItem = styled.a`
  font-weight: 500;
  font-size: 15px;
  color: #5f5f5f;
  ${p => p.theme.bigger} {
    font-size: 18px;
  }
  + * {
    margin-left: 30px;
    ${p => p.theme.bigger} {
      margin-left: 50px;
    }
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
    font-size: 16;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
      Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji',
      'Segoe UI Symbol';
    margin: 0;
  }
  * {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
`;

export default Layout;
