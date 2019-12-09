import React from 'react';
import styled from 'styled-components';
import { graphql } from 'gatsby';
import Img, { FluidObject } from 'gatsby-image';

import Layout from '../components/Layout';
import SEO from '../components/SEO';

type Props = {
  data: { file: { childImageSharp: { fluid: FluidObject } } };
};

const IndexPage: React.FC<Props> = props => {
  return (
    <Layout>
      <SEO title="Home" />
      <Hero>
        <HeroTextGroup>
          <HeroTitle>Hi There! 👋</HeroTitle>
          <HeroSub>
            From Amsterdam with love, this is the space where I write about
            code, running, and veganism.
          </HeroSub>
        </HeroTextGroup>
        <ImgContainer>
          <Img fluid={props.data.file.childImageSharp.fluid} />
        </ImgContainer>
      </Hero>
    </Layout>
  );
};

export const query = graphql`
  query {
    file(relativePath: { eq: "me-running.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 200) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`;

const Hero = styled.section`
  ${p => p.theme.l} {
    display: flex;
  }
`;

const HeroTextGroup = styled.div`
  flex: 1;
  ${p => p.theme.sm} {
    margin-bottom: 40px;
    text-align: center;
  }
  ${p => p.theme.l} {
    margin-right: 30px;
  }
`;

const HeroTitle = styled.h1`
  font-size: 24px;
  margin-bottom: 1em;
  font-weight: bold;
  ${p => p.theme.l} {
    margin-top: 1em;
  }
`;

const HeroSub = styled.p`
  font-size: 20px;
`;

const ImgContainer = styled.div`
  border-radius: 5px;
  overflow: hidden;
  width: 200px;
  height: 200px;
  ${p => p.theme.s} {
    width: 150px;
    height: 150px;
  }
  ${p => p.theme.sm} {
    margin: auto;
  }
`;

export default IndexPage;
