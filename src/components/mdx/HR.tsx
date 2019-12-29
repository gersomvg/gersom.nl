import React from 'react';
import styled from 'styled-components';

import opacity from '../../theme/opacity';

export type HRProps = {
  children?: React.ReactNode;
  className?: string;
};

const HR: React.FC<HRProps> = props => (
  <Container className={props.className} />
);

const Container = styled.hr`
  margin: 60px -10px;
  border: none;
  height: 2px;
  opacity: 0.62;
  border-radius: 50%;
  background: currentColor;
  ${p => p.theme.ml} {
    margin: 80px -20px;
  }
`;

export default HR;
