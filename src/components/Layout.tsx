import React from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby';

import ThemeProvider from './ThemeProvider';

type Props = {
  children: React.ReactNode;
};

const Layout: React.FunctionComponent<Props> = ({ children }) => {
  return (
    <ThemeProvider>
      <Header>
        <SiteNameBigger>
          <Link to="/">Gersom van Ginkel</Link>
        </SiteNameBigger>
        <SiteNameSmaller>
          <Link to="/">Gersom</Link>
        </SiteNameSmaller>
        <Nav>
          <NavItem to="/posts/">Posts</NavItem>
          <NavItem to="/work/">Work</NavItem>
          <NavItem to="/contact/">Contact</NavItem>
        </Nav>
      </Header>
      <Content>{children}</Content>
    </ThemeProvider>
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
  ${p => p.theme.ml} {
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
  padding: 20px 0 40px;
  margin: 0 auto;
  max-width: calc(100% - 40px);
  ${p => p.theme.m} {
    padding: 40px 0 80px;
  }
  ${p => p.theme.l} {
    padding: 50px 0 100px;
  }
  ${p => p.theme.ml} {
    max-width: calc(100% - 60px);
  }
  > :first-child {
    margin-top: 0;
  }
  > :last-child {
    margin-bottom: 0;
  }
`;

export default Layout;
