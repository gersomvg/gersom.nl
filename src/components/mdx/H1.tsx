import React from 'react';
import styled from 'styled-components';

export type H1Props = {
  children?: React.ReactNode;
  className?: string;
};

const H1: React.FC<H1Props> = props => (
  <Container className={props.className}>{props.children}</Container>
);

const Container = styled.h1`
  font-weight: bold;
  font-size: 24px;
  margin: 3.2em 0 1.6em;
`;

export default H1;
