import React from 'react';
import { graphql } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';

import Layout from '../components/Layout';
import MDXWrapper from '../components/mdx/MDXWrapper';
import SEO from '../components/SEO';

const PostTemplate: React.FC<{ data: any }> = props => {
  const mdx = props.data.mdx;
  return (
    <Layout>
      <SEO title={mdx.frontmatter.title} />
      <MDXWrapper>
        <MDXRenderer>{mdx.body}</MDXRenderer>
      </MDXWrapper>
    </Layout>
  );
};

export const query = graphql`
  query($slug: String!) {
    mdx(frontmatter: { slug: { eq: $slug } }) {
      frontmatter {
        author
        banner
        categories
        date
        description
        slug
        title
      }
      body
    }
  }
`;

export default PostTemplate;
