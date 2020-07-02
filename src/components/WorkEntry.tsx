import React from 'react';
import styled from 'styled-components';

import A from './mdx/A';
import Paragraph from './mdx/Paragraph';
import opacity from '../theme/opacity';

type Props = {
  name: string;
  href?: string;
  date: string;
  tools?: string[];
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
      <Right hasTools={!!props.tools}>
        {props.children}
        {props.tools && (
          <Tools>
            {props.tools.map(tool => (
              <Tool>{tool}</Tool>
            ))}
          </Tools>
        )}
      </Right>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  margin: 2em 0;
  page-break-inside: avoid;
  ${p => p.theme.ml} {
    display: flex;
  }
`;

const Left = styled.div`
  ${p => p.theme.ml} {
    flex: 0 0 9em;
    margin-right: 20px;
  }
  ${p => p.theme.l} {
    margin-right: 30px;
  }
`;

const Right = styled.div<{ hasTools: boolean }>`
  ${p => p.theme.ml} {
    flex: 1 1 auto;
    min-width: 0;
  }
  > :first-child {
    margin-top: 0;
  }
  > :nth-last-child(${p => (p.hasTools ? 2 : 1)}) {
    margin-bottom: 0;
  }
`;

const Name = styled(Paragraph)`
  font-weight: bold;
  margin: 0;
`;

const DateText = styled.p`
  font-weight: medium;
  font-size: 0.75em;
  opacity: 0.75;
  letter-spacing: 0;
  margin-top: 0.5em;
  ${p => p.theme.s} {
    margin-bottom: 1em;
  }
`;

const Tools = styled.ul`
  display: flex;
  flex-wrap: wrap;
  margin: 0.5em -0.2em 0;
`;

const Tool = styled.li`
  border-radius: 3px;
  background-color: ${p => opacity(p.theme.color.accent, 0.1)};
  border: 1px solid rgba(0, 0, 0, 0.05);
  font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, Courier,
    monospace;
  font-size: 0.75em;
  line-height: 1;
  letter-spacing: -0.01em;
  padding: 0.2em 0.3em 0.1em;
  margin: 0.2em;
  ${p => p.theme.dark} {
    background-color: ${p => opacity(p.theme.color.accentLight, 0.12)};
    border: 1px solid rgba(255, 255, 255, 0.05);
  }
`;

export default Layout;
