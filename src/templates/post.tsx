import React from 'react';
import { graphql } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import styled from 'styled-components';

import Layout from '../components/Layout';
import H1 from '../components/mdx/H1';
import MDXWrapper from '../components/mdx/MDXWrapper';
import SEO from '../components/SEO';
import Paragraph from '../components/mdx/Paragraph';
import A from '../components/mdx/A';
import Emphasis from '../components/mdx/Emphasis';
import opacity from '../theme/opacity';

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
        showTOC: true;
      };
      body: any;
      tableOfContents: {
        items: {
          url: string;
          title: string;
        }[];
      };
    };
  };
};

const PostTemplate: React.FC<PostPageProps> = props => {
  const mdx = props.data.mdx;
  const ogImageUrl = `${
    process.env.DEPLOY_URL
  }/og-images${mdx.fields.slug.slice(0, -1)}.jpeg`;
  return (
    <Layout>
      <SEO
        title={mdx.frontmatter.title}
        description={mdx.frontmatter.description}
        author={mdx.frontmatter.author}
        image={ogImageUrl}
      />
      <H1>{mdx.frontmatter.title}</H1>
      <Paragraph>
        <Emphasis>{mdx.frontmatter.description}</Emphasis>
      </Paragraph>
      <MDXWrapper>
        {mdx.frontmatter.showTOC && (
          <TOC>
            <TOCInner>
              <TOCTitle>Jump to</TOCTitle>
              {mdx.tableOfContents.items.map(item => {
                return (
                  <>
                    {'👉 '}
                    <A href={item.url}>{item.title}</A>
                    <br />
                  </>
                );
              })}
            </TOCInner>
          </TOC>
        )}
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
        showTOC
      }
      body
      tableOfContents
    }
  }
`;

const TOC = styled.nav`
  margin: 2.5em 0;
`;

const TOCInner = styled.div`
  margin: 0;
  border-left: 5px solid ${p => opacity(p.theme.color.accent, 0.3)};
  border-radius: 3px;
  padding: 0.2em 0 0.2em 1em;
  ${p => p.theme.dark} {
    border-color: ${p => opacity(p.theme.color.accentLight, 0.3)};
  }
`;

const TOCTitle = styled.h1`
  margin: 0 0 0.5em;
  font-size: 1em;
  font-weight: bold;
  opacity: 0.7;
`;

export default PostTemplate;
