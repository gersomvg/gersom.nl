import React from 'react';
import styled from 'styled-components';
import upperFirst from 'lodash/upperFirst';

import opacity from '../theme/opacity';
import getPostEmoji from '../utils/getPostEmoji';

export const postCategories = [
  'code',
  'running',
  'veganism',
  'lifehacks',
  'other',
] as const;

export type PostCategoryFilterBy = typeof postCategories[number] | null;

export type PostCategoryFilterProps = {
  value: PostCategoryFilterBy;
  onChange: (value: PostCategoryFilterBy) => void;
};

const PostCategoryFilter: React.FC<PostCategoryFilterProps> = props => {
  return (
    <Container>
      <ContainerInner>
        {postCategories.map(category => (
          <Button
            active={props.value === category}
            onClick={() =>
              props.onChange(props.value === category ? null : category)
            }
            key={category}
            emoji={getPostEmoji(category)}
            title={upperFirst(category)}
          />
        ))}
      </ContainerInner>{' '}
    </Container>
  );
};

const Button: React.FC<{
  title: string;
  active?: boolean;
  onClick: () => void;
  emoji: string;
}> = props => {
  return (
    <StyledButton
      type="button"
      active={props.active}
      onClick={props.onClick}
      title={props.title}
    >
      <span>{props.emoji}</span>
      <span>{props.title}</span>
    </StyledButton>
  );
};

const Container = styled.section`
  margin: 30px auto 40px;
`;

const ContainerInner = styled.div`
  margin: -5px;
  display: flex;
  flex-wrap: wrap;
`;

const StyledButton = styled.button<{ active?: boolean }>`
  flex: none;
  font-family: inherit;
  font-weight: ${p => (p.active ? 'bold' : '500')};
  font-size: 15px;
  height: 38px;
  line-height: 38px;
  padding: 0 15px;
  margin: 0.3em;
  border-radius: 5px;
  display: flex;
  background-color: ${p =>
    p.active ? opacity(p.theme.color.accent, 0.05) : 'rgba(0,0,0,0.05)'};
  ${p => p.theme.dark} {
    background-color: ${p =>
      p.active
        ? opacity(p.theme.color.accentLight, 0.1)
        : 'rgba(255,255,255,0.05)'};
  }
  transition-duration: 0.2s;
  transition-timing-function: ease-out;
  transition-property: background;
  &:hover,
  &:focus {
    background-color: ${p => opacity(p.theme.color.accent, 0.1)};
    ${p => p.theme.dark} {
      background-color: ${p => opacity(p.theme.color.accentLight, 0.2)};
    }
  }
  > span:first-child {
    filter: ${p => !p.active && 'grayscale(100%)'};
    margin-left: -0.1em;
    margin-right: 0.38em;
  }
  > span:last-child {
    opacity: ${p => (p.active ? 1 : 0.7)};
    color: ${p => (p.active ? p.theme.color.accent : 'inherit')};
    &:after {
      display: block;
      content: '${p => p.title}';
      font-weight: bold;
      height: 0;
      overflow: hidden;
      visibility: hidden;
    }
  }
`;

export default PostCategoryFilter;
