import React from 'react';
import styled from 'styled-components';

// UL

export type ULProps = {
  children?: React.ReactNode;
  className?: string;
};

export const UL: React.FC<ULProps> = props => (
  <ULStyled className={props.className}>{props.children}</ULStyled>
);

const ULStyled = styled.ul`
  font-size: 18px;
  line-height: 1.55;
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
  font-size: 18px;
  line-height: 1.55;
  margin: 2em 0;
`;

// LI

export type LiProps = {
  children?: React.ReactNode;
  className?: string;
};

export const Li: React.FC<LiProps> = props => (
  <LiStyled className={props.className}>{props.children}</LiStyled>
);

const LiStyled = styled.li`
  padding: 0.2em 0;
`;
