import React from 'react';
import { graphql } from 'gatsby';

import Layout from '../components/Layout';
import SEO from '../components/SEO';
import H1 from '../components/mdx/H1';
import PostList from '../components/PostList';
import PostCategoryFilter, {
  PostCategoryFilterBy,
} from '../components/PostCategoryFilter';

export type PostsPageProps = {
  data: {
    allMdx: {
      edges: {
        node: {
          id: string;
          frontmatter: {
            categories: string[];
            date: string;
            slug: string;
            title: string;
          };
        };
      }[];
    };
  };
};

const PostsPage: React.FC<PostsPageProps> = props => {
  const [category, setCategory] = React.useState<PostCategoryFilterBy>(null);
  return (
    <Layout>
      <SEO title="Posts" />
      <H1>Posts</H1>
      <PostCategoryFilter value={category} onChange={setCategory} />
      <PostList edges={props.data.allMdx.edges} />
    </Layout>
  );
};

export const query = graphql`
  query {
    allMdx(
      filter: { fileAbsolutePath: { regex: "//posts//" } }
      sort: { order: DESC, fields: frontmatter___date }
    ) {
      edges {
        node {
          id
          frontmatter {
            categories
            date
            slug
            title
          }
        }
      }
    }
  }
`;

export default PostsPage;
