import React from 'react';
import Helmet from 'react-helmet';
import { useStaticQuery, graphql } from 'gatsby';

export type SEOProps = {
  title: string;
  description?: string;
  lang?: string;
  meta?: { name: string; content: string }[];
  author?: string;
  twitterAuthor?: string;
};

export type PureSEOProps = SEOProps & { titleTemplate: string };

export const PureSEO: React.FunctionComponent<PureSEOProps> = props => {
  return (
    <Helmet
      htmlAttributes={{
        lang: props.lang ?? 'en',
      }}
      title={props.title}
      titleTemplate={props.titleTemplate}
      meta={[
        {
          name: `description`,
          content: props.description,
        },
        {
          name: 'author',
          content: props.author,
        },
        {
          property: `og:title`,
          content: props.title,
        },
        {
          property: `og:description`,
          content: props.description,
        },
        {
          property: `og:type`,
          content: `website`,
        },
        {
          name: `twitter:card`,
          content: `summary`,
        },
        {
          name: `twitter:creator`,
          content: props.twitterAuthor,
        },
        {
          name: `twitter:title`,
          content: props.title,
        },
        {
          name: `twitter:description`,
          content: props.description,
        },
      ].concat(props.meta ?? [])}
    />
  );
};

const SEO: React.FC<SEOProps> = props => {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            author
            twitterAuthor
          }
        }
      }
    `
  );

  return (
    <PureSEO
      {...props}
      title={props.title}
      titleTemplate={`%s » ${site.siteMetadata.title} 👨‍💻`}
      description={props.description ?? site.siteMetadata.description}
      author={props.author ?? site.siteMetadata.author}
      twitterAuthor={props.twitterAuthor ?? site.siteMetadata.twitterAuthor}
    />
  );
};

export default SEO;
