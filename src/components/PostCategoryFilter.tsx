import React from 'react';
import styled from 'styled-components';
import upperFirst from 'lodash/upperFirst';
import { Link } from 'gatsby';

import opacity from '../theme/opacity';
import getPostEmoji from '../utils/getPostEmoji';
import sortPostCategories from '../utils/sortPostCategories';

export type PostCategoryFilterProps = {
  categories: string[];
};

const PostCategoryFilter: React.FC<PostCategoryFilterProps> = props => {
  const categories = React.useMemo(() => sortPostCategories(props.categories), [
    props.categories,
  ]);
  return (
    <Container>
      <ContainerInner>
        {categories.map(category => (
          <Button key={category} category={category} />
        ))}
      </ContainerInner>{' '}
    </Container>
  );
};

const Button: React.FC<{
  category: string;
}> = props => {
  const emoji = getPostEmoji(props.category);
  const title = upperFirst(props.category);
  return (
    <StyledButton title={title} to={`/posts/${props.category}/`}>
      <span>{emoji}</span>
      <span>{title}</span>
    </StyledButton>
  );
};

const Container = styled.nav`
  margin: 30px auto 40px;
`;

const ContainerInner = styled.div`
  margin: -5px;
  display: flex;
  flex-wrap: wrap;
`;

const StyledButton = styled(Link).attrs({ activeClassName: 'active' })`
  flex: none;
  font-family: inherit;
  font-weight: 500;
  font-size: 15px;
  text-decoration: none;
  color: inherit;
  height: 38px;
  line-height: 38px;
  padding: 0 15px;
  margin: 0.3em;
  border-radius: 5px;
  display: flex;
  background-color: rgba(0,0,0,0.05);
  ${p => p.theme.dark} {
    background-color: rgba(255,255,255,0.05);
  }
  ${p => p.theme.ml} {
    font-size: 16px;
  }
  &:hover,
  &:focus {
    background-color: ${p => opacity(p.theme.color.accent, 0.1)};
    ${p => p.theme.dark} {
      background-color: ${p => opacity(p.theme.color.accentLight, 0.2)};
    }
  }
  > span:first-child {
    filter: grayscale(100%);
    margin-left: -0.1em;
    margin-right: 0.38em;
  }
  > span:last-child {
    opacity: 0.7;
    &:after {
      display: block;
      content: '${p => p.title}';
      font-weight: bold;
      height: 0;
      overflow: hidden;
      visibility: hidden;
    }
  }
  &.active {
    font-weight: bold;
    background-color: ${p => opacity(p.theme.color.accent, 0.05)};
    ${p => p.theme.dark} {
      background-color: ${p => opacity(p.theme.color.accentLight, 0.1)};
    }
    > span:first-child {
      filter: none;
    }
    > span:last-child {
      opacity: 1;
      color: ${p => p.theme.color.accent};
    }
  }
`;

export default PostCategoryFilter;
