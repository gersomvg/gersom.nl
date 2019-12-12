import React from 'react';
import styled from 'styled-components';

export type EmphasisProps = {
  children?: React.ReactNode;
  className?: string;
};

const Emphasis: React.FC<EmphasisProps> = props => (
  <Container className={props.className}>{props.children}</Container>
);

const Container = styled.em`
  font-style: italic;
`;

export default Emphasis;
