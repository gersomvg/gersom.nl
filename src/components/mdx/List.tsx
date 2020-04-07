import React from 'react';
import styled from 'styled-components';

import opacity from '../../theme/opacity';
import Paragraph from './Paragraph';

// UL

export type ULProps = {
  children?: React.ReactNode;
  className?: string;
};

export const UL: React.FC<ULProps> = props => {
  return <ULStyled className={props.className}>{props.children}</ULStyled>;
};

const ULStyled = styled.ul`
  margin: 2em 0;
  > li {
    position: relative;
    padding-left: 1.6em;
    ${p => p.theme.ml} {
      padding-left: 2em;
    }
    :before {
      position: absolute;
      content: '';
      top: 0.7em;
      right: 100%;
      margin-right: -0.4em;
      color: ${p => opacity(p.theme.color.text, 0.55)};
      border: 0.18em solid currentColor;
      border-radius: 38%;
      ${p => p.theme.dark} {
        color: ${p => opacity(p.theme.color.textLight, 0.55)};
      }
    }
  }
`;

// OL

export type OLProps = {
  children?: React.ReactNode;
  className?: string;
};

export const OL: React.FC<OLProps> = props => {
  return <OLStyled className={props.className}>{props.children}</OLStyled>;
};

const ULAsOL = ULStyled.withComponent('ol');
const OLStyled = styled(ULAsOL)`
  counter-reset: list;
  > li {
    :before {
      border: none;
      border-radius: 0;
      margin-right: -0.9em;
      top: 0;
      text-align: right;
      font-weight: 500;
      counter-increment: list;
      content: counter(list) '.';
    }
  }
`;

// LI

export type LiProps = {
  children?: React.ReactNode;
  className?: string;
};

export const Li: React.FC<LiProps> = props => (
  <LiStyled className={props.className}>{props.children}</LiStyled>
);

const ParagraphAsLi = Paragraph.withComponent('li');
const LiStyled = styled(ParagraphAsLi)`
  margin: 0.4em 0;
  > :first-child {
    margin-top: 0;
  }
  > :last-child {
    margin-bottom: 0;
  }
  > ul,
  > ol {
    margin: 0.4em 0;
  }
`;
