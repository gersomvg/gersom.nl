import React from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby';

import opacity from '../theme/opacity';
import getPostEmoji from '../utils/getPostEmoji';

export type PostListProps = {
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

const PostList: React.FunctionComponent<PostListProps> = props => {
  return (
    <Wrapper>
      {props.edges.map(({ node }) => (
        <div key={node.id}>
          <LinkStyled to={`/post${node.fields.slug}`}>
            <Emoji>{getPostEmoji(node.frontmatter.categories[0])}</Emoji>
            <Title>{node.frontmatter.title}</Title>
          </LinkStyled>
        </div>
      ))}
    </Wrapper>
  );
};

const Wrapper = styled.nav`
  margin: 20px auto;
`;

const LinkStyled = styled(Link)`
  font-weight: 500;
  font-size: 17px;
  line-height: 1.66;
  color: inherit;
  display: flex;
  text-decoration: none;
  border-radius: 5px;
  padding: calc(22px - 0.83em) 10px;
  margin: 0 -10px;
  ${p => p.theme.ml} {
    padding-left: 15px;
    padding-right: 15px;
    margin: 0 -15px;
    font-size: 19px;
  }
  :hover,
  :focus {
    background-color: ${p => opacity(p.theme.color.accent, 0.05)};
    ${p => p.theme.dark} {
      background-color: ${p => opacity(p.theme.color.accentLight, 0.1)};
    }
  }
`;

const Emoji = styled.span`
  align-self: flex-start;
  margin-right: 10px;
  ${p => p.theme.ml} {
    margin-right: 20px;
  }
`;

const Title = styled.span`
  opacity: 0.62;
  flex: 1;
  a:hover > &,
  a:focus > & {
    opacity: 1;
  }
`;

export default PostList;
