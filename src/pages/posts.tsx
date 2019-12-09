import React from 'react';
import { graphql } from 'gatsby';

import Layout from '../components/Layout';
import SEO from '../components/SEO';
import H1 from '../components/mdx/H1';
import { FrontMatter } from '../types/frontmatter';
import PostList from '../components/PostList';

export type PostsPageProps = {
  data: {
    allMdx: {
      edges: {
        node: {
          frontmatter: FrontMatter;
        };
      }[];
    };
  };
};

const PostsPage: React.FC<PostsPageProps> = props => (
  <Layout>
    <SEO title="Posts" />
    <H1>Posts</H1>
    <PostList edges={props.data.allMdx.edges} />
  </Layout>
);

export const query = graphql`
  query {
    allMdx(
      filter: { fileAbsolutePath: { regex: "//markdown/posts//" } }
      sort: { order: DESC, fields: frontmatter___date }
    ) {
      edges {
        node {
          frontmatter {
            author
            banner
            categories
            date
            description
            slug
            title
          }
        }
      }
    }
  }
`;

export default PostsPage;
