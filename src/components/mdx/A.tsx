import React from 'react';
import styled from 'styled-components';

import opacity from '../../theme/opacity';

export type AProps = {
  children?: React.ReactNode;
  className?: string;
  href?: string;
};

export const A: React.FC<AProps> = props => (
  <AStyled className={props.className} href={props.href}>
    {props.children}
  </AStyled>
);

const AStyled = styled.a`
  font-weight: bold;
  color: ${p => p.theme.color.accent};
  text-decoration: none;
  display: inline;
  position: relative;
  border-bottom: 2px solid ${p => opacity(p.theme.color.accent, 0.2)};
  border-radius: 2px;
  ${p => p.theme.dark} {
    color: ${p => p.theme.color.accentLight};
    border-color: ${p => opacity(p.theme.color.accentLight, 0.2)};
  }
  :hover,
  :focus {
    background-color: ${p => opacity(p.theme.color.accent, 0.05)};
    border-color: ${p => opacity(p.theme.color.accent, 0.5)};
    ${p => p.theme.dark} {
      background-color: ${p => opacity(p.theme.color.accentLight, 0.1)};
      border-color: ${p => opacity(p.theme.color.accentLight, 0.5)};
    }
  }
  &.gatsby-resp-image-link {
    display: block;
    border: none;
    border-radius: 6px;
    overflow: hidden;
    margin: 30px -15px;
    ${p => p.theme.ml} {
      margin: 60px -20px;
    }
  }
`;

export default A;
