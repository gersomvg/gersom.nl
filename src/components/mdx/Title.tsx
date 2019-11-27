import React from 'react';
import styled from 'styled-components';

export type TitleProps = {
  children?: React.ReactNode;
  className?: string;
};

const Title: React.FC<TitleProps> = props => (
  <Container className={props.className}>{props.children}</Container>
);

const Container = styled.h1`
  font-weight: bold;
  font-size: 24px;
  width: 100%;
  max-width: ${p => p.theme.pageMaxWidth};
  margin: 1.62em 0 1em;
`;

export default Title;
