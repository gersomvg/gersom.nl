import React from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby';

import { FrontMatter } from '../types/frontmatter';

export type PostListProps = {
  edges: {
    node: {
      frontmatter: FrontMatter;
    };
  }[];
};

const PostList: React.FunctionComponent<PostListProps> = props => {
  return (
    <Wrapper>
      {props.edges.map(({ node }) => (
        <Row>
          <Link to={`/post/${node.frontmatter.slug}`}>
            {node.frontmatter.title}
          </Link>
        </Row>
      ))}
    </Wrapper>
  );
};

const Wrapper = styled.nav`
  margin: 30px auto;
`;

const Row = styled.p`
  height: 44px;
`;

export default PostList;
