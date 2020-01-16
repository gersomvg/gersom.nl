import React from 'react';
import { graphql } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';

import Layout from '../components/Layout';
import H1 from '../components/mdx/H1';
import MDXWrapper from '../components/mdx/MDXWrapper';
import SEO from '../components/SEO';
import Paragraph from '../components/mdx/Paragraph';
import Emphasis from '../components/mdx/Emphasis';

export type PostPageProps = {
  data: {
    mdx: {
      fields: {
        slug: string;
      };
      frontmatter: {
        author: string;
        categories: string[];
        date: string;
        description: string;
        title: string;
      };
      body: any;
    };
  };
};

const PostTemplate: React.FC<PostPageProps> = props => {
  const mdx = props.data.mdx;
  return (
    <Layout>
      <SEO
        title={mdx.frontmatter.title}
        description={mdx.frontmatter.description}
        author={mdx.frontmatter.author}
        image={`${
          process.env.DEPLOY_URL
        }/og-images/post/${mdx.fields.slug.replace(/\//g, '')}.jpeg`}
      />
      <H1>{mdx.frontmatter.title}</H1>
      <Paragraph>
        <Emphasis>{mdx.frontmatter.description}</Emphasis>
      </Paragraph>
      <MDXWrapper>
        <MDXRenderer>{mdx.body}</MDXRenderer>
      </MDXWrapper>
    </Layout>
  );
};

export const query = graphql`
  query($id: String!) {
    mdx(id: { eq: $id }) {
      fields {
        slug
      }
      frontmatter {
        author
        categories
        date
        description
        title
        published
        listed
      }
      body
    }
  }
`;

export default PostTemplate;
