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
  image?: string;
};

export type PureSEOProps = SEOProps & { titleTemplate: string };

export const PureSEO: React.FunctionComponent<PureSEOProps> = props => {
  return (
    <Helmet
      htmlAttributes={{ lang: props.lang ?? 'en' }}
      title={props.title}
      titleTemplate={props.titleTemplate}
    >
      {props.description && (
        <meta name="description" content={props.description} />
      )}
      {props.author && <meta name="author" content={props.author} />}

      {props.title && <meta property="og:title" content={props.title} />}
      {props.description && (
        <meta property="og:description" content={props.description} />
      )}
      <meta property="og:type" content="website" />
      {props.image && <meta property="og:image" content={props.image} />}

      <meta
        name="twitter:card"
        content={props.image ? 'summary_large_image' : 'summary'}
      />
      {props.twitterAuthor && (
        <meta name="twitter:creator" content={props.twitterAuthor} />
      )}
      {props.title && <meta name="twitter:title" content={props.title} />}
      {props.description && (
        <meta name="twitter:description" content={props.description} />
      )}
    </Helmet>
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
      image={props.image}
    />
  );
};

export default SEO;
