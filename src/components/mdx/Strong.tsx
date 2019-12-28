import React from 'react';
import styled from 'styled-components';

import opacity from '../../theme/opacity';

export type StrongProps = {
  children?: React.ReactNode;
  className?: string;
};

const Strong: React.FC<StrongProps> = props => (
  <Container className={props.className}>{props.children}</Container>
);

const Container = styled.strong`
  font-weight: bold;
  ${p => p.theme.dark} {
    color: ${p => opacity(p.theme.color.textLight, 0.9)};
  }
`;

export default Strong;
