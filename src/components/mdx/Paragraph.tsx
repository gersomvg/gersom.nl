import React from 'react';
import styled from 'styled-components';

export type ParagraphProps = {
  children?: React.ReactNode;
  className?: string;
};

const Paragraph: React.FC<ParagraphProps> = props => (
  <Container className={props.className}>{props.children}</Container>
);

const Container = styled.p`
  font-size: 18px;
  line-height: 1.55;
  margin: 1em 0;
  width: 100%;
  max-width: ${p => p.theme.pageMaxWidth};
`;

export default Paragraph;
