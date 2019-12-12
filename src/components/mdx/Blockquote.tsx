import React from 'react';
import styled from 'styled-components';

import opacity from '../../theme/opacity';

export type BlockquoteProps = {
  children?: React.ReactNode;
  className?: string;
};

const Blockquote: React.FC<BlockquoteProps> = props => (
  <Container className={props.className}>{props.children}</Container>
);

const Container = styled.blockquote`
  margin: 25px -20px;
  padding: 15px;
  ${p => p.theme.ml} {
    border-radius: 6px;
    margin: 50px -20px;
    padding: 25px 20px;
  }
  > :first-child {
    margin-top: 0;
  }
  > :last-child {
    margin-bottom: 0;
  }
  border-left: 5px solid ${p => opacity(p.theme.color.accent, 0.5)};
  background-color: ${p => opacity(p.theme.color.accent, 0.05)};
  ${p => p.theme.dark} {
    background-color: ${p => opacity(p.theme.color.accentLight, 0.1)};
    border-color: ${p => opacity(p.theme.color.accentLight, 0.5)};
  }
`;

export default Blockquote;
