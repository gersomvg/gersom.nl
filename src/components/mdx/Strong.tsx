import React from 'react';
import styled from 'styled-components';

export type StrongProps = {
  children?: React.ReactNode;
  className?: string;
};

const Strong: React.FC<StrongProps> = props => (
  <Container className={props.className}>{props.children}</Container>
);

const Container = styled.strong`
  font-weight: bold;
`;

export default Strong;
