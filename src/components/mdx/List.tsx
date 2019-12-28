import React from 'react';
import styled from 'styled-components';

import opacity from '../../theme/opacity';

// UL

export type ULProps = {
  children?: React.ReactNode;
  className?: string;
};

export const UL: React.FC<ULProps> = props => (
  <ULStyled className={props.className}>{props.children}</ULStyled>
);

const ULStyled = styled.ul`
  font-size: 16px;
  line-height: 1.66;
  margin: 2em 0;
  padding-left: 2em;
  text-indent: -2em;
  > {
    :before {
      content: '▪︎';
      display: inline-block;
      width: 2em;
      text-indent: 0;
    }
  }
  ${p => p.theme.m} {
    font-size: 19px;
  }
  ${p => p.theme.l} {
    font-size: 20px;
  }
`;

// OL

export type OLProps = {
  children?: React.ReactNode;
  className?: string;
};

export const OL: React.FC<OLProps> = props => (
  <OLStyled className={props.className}>{props.children}</OLStyled>
);

const OLStyled = styled.ol`
  font-size: 16px;
  line-height: 1.55;
  margin: 2em 0;
  padding-left: 1.4em;
  text-indent: 0.6em;
  list-style-type: decimal;
  color: ${p => opacity(p.theme.color.text, 0.62)};
  font-weight: 500;
  ${p => p.theme.dark} {
    color: ${p => opacity(p.theme.color.textLight, 0.62)};
  }
  ${p => p.theme.m} {
    font-size: 19px;
  }
  ${p => p.theme.l} {
    font-size: 20px;
  }
`;

// LI

export type LiProps = {
  children?: React.ReactNode;
  className?: string;
};

export const Li: React.FC<LiProps> = props => (
  <LiStyled className={props.className}>
    <span>{props.children}</span>
  </LiStyled>
);

const LiStyled = styled.li`
  padding: 0.2em 0;
  > span {
    font-weight: normal;
    color: ${p => p.theme.color.text};
    ${p => p.theme.dark} {
      color: ${p => p.theme.color.textLight};
    }
  }
`;
