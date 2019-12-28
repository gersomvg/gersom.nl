import React from 'react';
import styled from 'styled-components';

export type H1Props = {
  children?: React.ReactNode;
  className?: string;
};

const H1: React.FC<H1Props> = props => {
  console.log(props);
  return <Container className={props.className}>{props.children}</Container>;
};

const Container = styled.h1`
  font-weight: bold;
  font-size: 20px;
  margin: 60px 0 30px;
  ${p => p.theme.m} {
    font-size: 22px;
    margin: 70px 0 35px;
  }
  ${p => p.theme.l} {
    font-size: 24px;
    margin: 80px 0 40px;
  }
`;

export default H1;
