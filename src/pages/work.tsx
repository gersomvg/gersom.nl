import React from 'react';
import { graphql } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';

import Layout from '../components/Layout';
import MDXWrapper from '../components/mdx/MDXWrapper';
import H1 from '../components/mdx/H1';
import SEO from '../components/SEO';

export type WorkPageProps = {
  data: {
    file: {
      childMdx: {
        body: string;
      };
    };
  };
};

const WorkPage: React.FC<WorkPageProps> = props => {
  return (
    <Layout>
      <SEO title="Work" />
      <H1>Work</H1>
      <MDXWrapper>
        <MDXRenderer>{props.data.file.childMdx.body}</MDXRenderer>
      </MDXWrapper>
    </Layout>
  );
};

export const query = graphql`
  query {
    file(
      relativePath: { eq: "portfolio.mdx" }
      sourceInstanceName: { eq: "mdx" }
    ) {
      childMdx {
        body
      }
    }
  }
`;

export default WorkPage;
