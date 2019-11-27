import React from 'react';
import styled from 'styled-components';

import Layout from '../components/Layout';
import MDXWrapper from '../components/mdx/MDXWrapper';
import SEO from '../components/SEO';
import Content from '../content/contact.mdx';

const IndexPage: React.FC = () => (
  <Layout>
    <SEO title="Get in Contact" />
    <MDXWrapperStyled>
      <Content />
    </MDXWrapperStyled>
  </Layout>
);

const MDXWrapperStyled = styled(MDXWrapper)`
  padding: 50px 30px;
`;

export default IndexPage;
