import React from 'react';
import styled from 'styled-components';

export type H1Props = {
  children?: React.ReactNode;
  className?: string;
};

const H1: React.FC<H1Props> = props => {
  return <Container className={props.className}>{props.children}</Container>;
};

const Container = styled.h1`
  font-weight: bold;
  font-size: 1.2em;
  margin: 3em 0 1.5em;
`;

export default H1;
