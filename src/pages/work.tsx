import React from 'react';

import Layout from '../components/Layout';
import MDXWrapper from '../components/mdx/MDXWrapper';
import SEO from '../components/SEO';
import Content from '../content/work.mdx';

const IndexPage: React.FC = () => (
  <Layout>
    <SEO title="Work History" />
    <MDXWrapper>
      <Content />
    </MDXWrapper>
  </Layout>
);

export default IndexPage;
