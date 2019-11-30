import React from 'react';
import styled from 'styled-components';

import A from './mdx/A';
import Paragraph from './mdx/Paragraph';

type Props = {
  name: string;
  href?: string;
  date: string;
  children: React.ReactNode;
};

const Layout: React.FunctionComponent<Props> = props => {
  return (
    <Wrapper>
      <Left>
        <Name>
          {props.href ? <A href={props.href}>{props.name}</A> : props.name}
        </Name>
        <DateText>{props.date}</DateText>
      </Left>
      <Right>{props.children}</Right>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  max-width: ${p => p.theme.pageMaxWidth};
  margin: 40px 0;
  ${p => p.theme.ml} {
    display: flex;
  }
`;

const Left = styled.div`
  ${p => p.theme.m} {
    flex: 1 0 140px;
    margin-right: 20px;
  }
  ${p => p.theme.l} {
    flex: 1 0 180px;
    margin-right: 30px;
  }
`;

const Right = styled.div`
  ${p => p.theme.ml} {
    flex: 1 1 auto;
    min-width: 0;
  }
  > :first-child {
    margin-top: 0;
  }
  > :last-child {
    margin-bottom: 0;
  }
`;

const Name = styled(Paragraph)`
  font-weight: bold;
  margin: 0;
`;

const DateText = styled.p`
  font-weight: medium;
  font-size: 15px;
  opacity: 0.75;
  letter-spacing: 0;
  margin-top: 0.5em;
  ${p => p.theme.s} {
    margin-bottom: 1em;
  }
`;

export default Layout;
