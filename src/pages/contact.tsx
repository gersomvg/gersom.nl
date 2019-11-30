import React from 'react';

import Layout from '../components/Layout';
import MDXWrapper from '../components/mdx/MDXWrapper';
import SEO from '../components/SEO';
import Content from '../content/contact.mdx';

const IndexPage: React.FC = () => (
  <Layout>
    <SEO title="Get in Contact" />
    <MDXWrapper>
      <Content />
    </MDXWrapper>
  </Layout>
);

export default IndexPage;
