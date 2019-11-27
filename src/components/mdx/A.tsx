import React from 'react';
import styled from 'styled-components';

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
  font-size: 18px;
  line-height: 1.55;
  color: ${p => p.theme.color.accent};
  text-decoration: none;
  display: inline-block;
  position: relative;
  ${p => p.theme.dark} {
    color: ${p => p.theme.color.accentLight};
  }
  :before {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    border-top: 2px solid currentColor;
    opacity: 0.38;
  }
`;

export default A;
