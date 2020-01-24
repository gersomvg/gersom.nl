import React from 'react';
import { graphql } from 'gatsby';

import Layout from '../components/Layout';
import SEO from '../components/SEO';
import H1 from '../components/mdx/H1';
import PostList from '../components/PostList';
import PostCategoryFilter from '../components/PostCategoryFilter';

export type PostsPageProps = {
  data: {
    allMdx: {
      edges: {
        node: {
          id: string;
          fields: {
            slug: string;
          };
          frontmatter: {
            categories: string[];
            title: string;
          };
        };
      }[];
    };
  };
  pageContext: {
    activeCategory?: string;
    categories: string[];
  };
};

const PostsPage: React.FC<PostsPageProps> = props => {
  return (
    <Layout>
      <SEO title="Posts" />
      <H1>Posts</H1>
      <PostCategoryFilter categories={props.pageContext.categories} />
      <PostList edges={props.data.allMdx.edges} />
    </Layout>
  );
};

export const query = graphql`
  query($activeCategory: [String]) {
    allMdx(
      filter: {
        fields: { slug: { regex: "/^/post//" } }
        frontmatter: {
          published: { eq: true }
          listed: { eq: true }
          categories: { in: $activeCategory }
        }
      }
      sort: { order: DESC, fields: frontmatter___date }
    ) {
      edges {
        node {
          id
          fields {
            slug
          }
          frontmatter {
            categories
            title
          }
        }
      }
    }
  }
`;

export default PostsPage;
