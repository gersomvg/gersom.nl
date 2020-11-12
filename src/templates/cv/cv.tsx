import React from 'react';
import { graphql } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import styled from 'styled-components';

import MDXWrapper from '../../components/mdx/MDXWrapper';
import H1 from '../../components/mdx/H1';
import A from '../../components/mdx/A';
import ThemeProvider from '../../components/ThemeProvider';

// @ts-ignore
const fontBold = preval`
  const fs = require('fs')
  module.exports = fs.readFileSync(require.resolve('./Roboto-Bold.ttf'), { encoding: 'base64' });
`;

// @ts-ignore
const fontRegular = preval`
  const fs = require('fs')
  module.exports = fs.readFileSync(require.resolve('./Roboto-Regular.ttf'), { encoding: 'base64' });
`;

export type CVProps = {
  data: {
    file: {
      childMdx: {
        body: string;
      };
    };
  };
};

const CV: React.FC<CVProps> = props => {
  return (
    <ThemeProvider>
      <Wrapper>
        <Hero>
          <HeroLeft>
            <MainTitle css={{ marginTop: 0 }}>Gersom van Ginkel</MainTitle>
            <SubTitle>Freelance Javascript Developer</SubTitle>
          </HeroLeft>
          <HeroRight>
            <p>
              <A href="https://gersom.nl">Gersom.nl</A>
            </p>
            <p>
              <A href="tel:0031645237316">+31645237316</A>
            </p>
            <p>
              <A href="mailto:inbox@gersom.nl">inbox@gersom.nl</A>
            </p>
          </HeroRight>
        </Hero>
        <MDXWrapper>
          <MDXRenderer>{props.data.file.childMdx.body}</MDXRenderer>
        </MDXWrapper>
      </Wrapper>
    </ThemeProvider>
  );
};

export const query = graphql`
  query {
    file(
      relativePath: { eq: "portfolio.mdx" }
      sourceInstanceName: { eq: "mdx" }
    ) {
      childMdx {
        body
      }
    }
  }
`;

const Wrapper = styled.div`
  font-size: 0.8em;
  font-family: Roboto;

  @font-face {
    font-family: Roboto;
    src: url(data:application/x-font-ttf;charset=utf-8;base64,${fontBold});
    font-weight: bold;
  }

  @font-face {
    font-family: Roboto;
    src: url(data:application/x-font-ttf;charset=utf-8;base64,${fontRegular});
    font-weight: normal;
  }
`;

const Hero = styled.div`
  margin-bottom: 2em;
  display: flex;
  align-items: stretch;
  padding-bottom: 1em;
  border-bottom: 1px solid currentColor;
`;

const HeroLeft = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const HeroRight = styled.div`
  text-align: right;
  line-height: 1.8;
  align-self: center;
`;

const MainTitle = styled(H1)`
  font-size: 2.5em;
  margin: 0;
`;

const SubTitle = styled.p`
  font-size: 1.3em;
  margin-top: auto;
`;

export default CV;
