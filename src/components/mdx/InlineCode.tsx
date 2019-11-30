import React from 'react';
import styled from 'styled-components';

import opacity from '../../theme/opacity';

export type InlineCodeProps = {
  children?: React.ReactNode;
  className?: string;
};

const InlineCode: React.FC<InlineCodeProps> = props => (
  <Container className={props.className}>{props.children}</Container>
);

const Container = styled.code`
  /* border: 1px solid ${p => opacity(p.theme.color.accent, 0.08)}; */
  border-radius: 3px;
  background-color: ${p => opacity(p.theme.color.accent, 0.1)};
  border: 1px solid rgba(0,0,0,0.05);
  font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, Courier,
    monospace;
  font-size: 0.87em;
  padding: 0.06em 0.3em;
  margin: 0 0.1em;
  ${p => p.theme.dark} {
    background-color: ${p => opacity(p.theme.color.accent, 0.12)};
    border: 1px solid rgba(255,255,255,0.05);
  }
`;

export default InlineCode;
