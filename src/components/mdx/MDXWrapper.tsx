import React from 'react';
import styled from 'styled-components';
import { MDXProvider } from '@mdx-js/react';

import H1 from './H1';
import Paragraph from './Paragraph';
import { UL, OL, Li } from './List';
import Strong from './Strong';
import InlineCode from './InlineCode';
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
  h1: H1,
  p: Paragraph,
  ul: UL,
  ol: OL,
  li: Li,
  inlineCode: InlineCode,
  strong: Strong,
  a: A,
};

const Wrapper = styled.section`
  padding: 50px 30px;
  ${p => p.theme.s} {
    padding: 30px 20px;
  }
  > :first-child {
    margin-top: 0;
  }
`;

export default MDXWrapper;
