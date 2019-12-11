import React from 'react';
import { graphql } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import styled from 'styled-components';
import Img, { FluidObject } from 'gatsby-image';

import Layout from '../components/Layout';
import H1 from '../components/mdx/H1';
import MDXWrapper from '../components/mdx/MDXWrapper';
import SEO from '../components/SEO';
import Paragraph from '../components/mdx/Paragraph';

export type PostPageProps = {
  data: {
    mdx: {
      frontmatter: {
        author: string;
        cover: {
          childImageSharp: {
            fluid: FluidObject;
          };
        };
        categories: string[];
        date: string;
        description: string;
        slug: string;
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
      <SEO title={mdx.frontmatter.title} />
      <H1>{mdx.frontmatter.title}</H1>
      <Paragraph>
        <span>{mdx.frontmatter.description}</span>
      </Paragraph>
      <Cover fluid={mdx.frontmatter.cover.childImageSharp.fluid} />
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
        cover {
          childImageSharp {
            fluid(maxWidth: 790, maxHeight: 300, cropFocus: CENTER) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        categories
        date
        description
        slug
        title
        published
        listed
      }
      body
    }
  }
`;

const Cover = styled(Img)`
  border-radius: 6px;
  margin: 30px -15px;
  ${p => p.theme.ml} {
    margin: 60px -20px;
  }
`;

export default PostTemplate;
