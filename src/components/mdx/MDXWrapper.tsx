import React from 'react';
import styled from 'styled-components';
import { MDXProvider } from '@mdx-js/react';

import Title from './Title';
import Paragraph from './Paragraph';
import { UL, OL, Li } from './List';
import Strong from './Strong';
import A from './A';

export type MDXWrapperProps = {
  children?: React.ReactNode;
  className?: string;
};

const MDXWrapper: React.FC<MDXWrapperProps> = props => (
  <Wrapper className={props.className}>
    <MDXProvider components={components}>{props.children}</MDXProvider>
  </Wrapper>
);

const components = {
  h1: Title,
  p: Paragraph,
  ul: UL,
  ol: OL,
  li: Li,
  strong: Strong,
  a: A,
};

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  > :first-child {
    margin-top: 0;
  }
`;

export default MDXWrapper;
