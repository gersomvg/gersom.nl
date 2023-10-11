import React from 'react';
import styled from 'styled-components';
import { graphql, Link } from 'gatsby';
import Img, { FixedObject } from 'gatsby-image';

import opacity from '../theme/opacity';
import Layout from '../components/Layout';
import SEO from '../components/SEO';
import H1 from '../components/mdx/H1';
import Paragraph from '../components/mdx/Paragraph';
import PostList from '../components/PostList';

export type IndexPageProps = {
  data: {
    file: { childImageSharp: { fixed: FixedObject } };
    allMdx: {
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
  };
};

const IndexPage: React.FC<IndexPageProps> = props => {
  return (
    <Layout>
      <SEO title="Home" />
      <Hero>
        <HeroTextGroup>
          <HeroTitle>Hi There! 👋</HeroTitle>
          <HeroSub>
            Whenever I'm not out running, this is the space where I write about
            software development and other personal interests.
          </HeroSub>
        </HeroTextGroup>
        <ImgContainer>
          <Img fixed={props.data.file.childImageSharp.fixed} alt="Me running" />
        </ImgContainer>
      </Hero>
      <TitleWithCTA title="Posts" ctaText="See all" ctaTo="/posts/" />
      <PostList edges={props.data.allMdx.edges} />
      <TitleWithCTA title="Work" ctaText="See portfolio" ctaTo="/work/" />
      <Paragraph>
        I’m an Amsterdam-based freelance full-stack JavaScript developer that is
        looking for challenging projects with social or sustainable impact.
      </Paragraph>
    </Layout>
  );
};

export const query = graphql`
  query {
    file(relativePath: { eq: "me-running.jpg" }) {
      childImageSharp {
        fixed(width: 200, quality: 90) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    allMdx(
      filter: {
        frontmatter: {
          published: { eq: true }
          listed: { eq: true }
          featured: { eq: true }
        }
      }
      sort: { order: DESC, fields: frontmatter___date }
    ) {
      edges {
        node {
          id
          fields {
            slug
          }
          frontmatter {
            categories
            date
            title
            featured
          }
        }
      }
    }
  }
`;

type TitleWithCTAProps = {
  title: string;
  ctaText: string;
  ctaTo?: string;
  ctaHref?: string;
};
const TitleWithCTA: React.FC<TitleWithCTAProps> = props => {
  const button = props.ctaTo ? (
    <TitleCTALink to={props.ctaTo}>
      <span>{props.ctaText}</span>
    </TitleCTALink>
  ) : (
    <TitleCTAHref href={props.ctaHref}>
      <span>{props.ctaText}</span>
    </TitleCTAHref>
  );
  return (
    <TitleWithCTAContainer>
      <TitleWithCTAInner>
        <H1>{props.title}</H1>
        {button}
      </TitleWithCTAInner>
    </TitleWithCTAContainer>
  );
};

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

const HeroTitle = styled(H1)`
  margin: 0 0 1em;
  ${p => p.theme.l} {
    margin-top: 0.5em;
  }
`;

const HeroSub = styled(Paragraph)`
  margin: 0;
`;

const ImgContainer = styled.div`
  border-radius: 5px;
  overflow: hidden;
  width: 200px;
  height: 200px;
  ${p => p.theme.sm} {
    margin: auto;
  }
`;

const TitleWithCTAContainer = styled.div`
  margin: 80px 0 40px;
`;

const TitleWithCTAInner = styled.div`
  display: flex;
  margin: -15px 0 0 -15px;
  ${p => p.theme.ml} {
    margin-left: -30px;
  }
  flex-wrap: wrap;
  align-items: center;
  > * {
    margin: 15px 0 0 15px;
    ${p => p.theme.ml} {
      margin-left: 30px;
    }
  }
`;

const TitleCTALink = styled(Link)`
  border-radius: 6px;
  height: 28px;
  line-height: 28px;
  padding: 0 10px;
  font-size: 15px;
  font-weight: 500;
  color: inherit;
  text-decoration: none;
  background-color: rgba(0, 0, 0, 0.05);
  ${p => p.theme.dark} {
    background-color: rgba(255, 255, 255, 0.05);
  }
  &:hover,
  &:focus {
    background-color: ${p => opacity(p.theme.color.accent, 0.1)};
    ${p => p.theme.dark} {
      background-color: ${p => opacity(p.theme.color.accentLight, 0.2)};
    }
  }
  > span {
    opacity: 0.8;
  }
`;

const TitleCTAHref = TitleCTALink.withComponent('a');

export default IndexPage;
