import React from 'react';
import styled from 'styled-components';

export type H1Props = {
  children?: React.ReactNode;
  className?: string;
  id?: string;
};

const H1: React.FC<H1Props> = props => {
  return (
    <Container className={props.className} id={props.id}>
      {props.children}
    </Container>
  );
};

const Container = styled.h1`
  font-weight: bold;
  font-size: 1.2em;
  margin: 2.6em 0 1.4em;
  position: relative;
  a.anchor {
    ${p => p.theme.s} {
      display: none;
    }
    opacity: 0;
    transition: opacity 0.15s ease-out;
    :hover,
    :focus {
      background: none;
      opacity: 1;
      path {
        fill: ${p => p.theme.color.accent};
      }
    }
    :active {
      transform: scale(0.95);
    }
    position: absolute;
    top: calc(1.66em / 2 - 15px);
    right: 100%;
    width: 30px;
    height: 30px;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    svg {
      width: 16px;
      height: 16px;
    }
  }
  ${p => p.theme.ml} {
    :hover,
    :focus {
      a.anchor {
        opacity: 1;
      }
    }
  }
`;

export default H1;
