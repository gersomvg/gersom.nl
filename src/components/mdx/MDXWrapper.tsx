import React from 'react';
import styled from 'styled-components';
import { MDXProvider } from '@mdx-js/react';

import H1 from './H1';
import Paragraph from './Paragraph';
import { UL, OL, Li } from './List';
import Strong from './Strong';
import Emphasis from './Emphasis';
import InlineCode from './InlineCode';
import A from './A';
import Blockquote from './Blockquote';

export type MDXWrapperProps = {
  children?: React.ReactNode;
};

const MDXWrapper: React.FC<MDXWrapperProps> = props => (
  <MDXProvider components={components}>{props.children}</MDXProvider>
);

const components = {
  h1: H1,
  p: Paragraph,
  ul: UL,
  ol: OL,
  li: Li,
  inlineCode: InlineCode,
  strong: Strong,
  em: Emphasis,
  a: A,
  blockquote: Blockquote,
};

export default MDXWrapper;
