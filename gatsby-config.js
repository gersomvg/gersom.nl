require('dotenv').config({ path: '.env.development' });

module.exports = {
  siteMetadata: {
    siteUrl: process.env.URL,
    title: 'Gersom van Ginkel',
    description:
      'From Amsterdam with love, this is the space where I write about code, running, and veganism.',
    author: 'Gersom van Ginkel',
    twitterAuthor: '@gersomvg',
    gitRepo: 'https://github.com/gersomvg/gersom.nl/',
    gitRepoFilePath: 'https://github.com/gersomvg/gersom.nl/blob/master/',
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'mdx',
        path: `${__dirname}/src/mdx`,
      },
    },
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: "Gersom van Ginkel's personal website",
        short_name: 'Gersom van Ginkel',
        start_url: '/',
        background_color: '#ffffff',
        theme_color: '#007aff',
        display: 'minimal-ui',
        icon: 'src/images/favicon.png', // This path is relative to the root of the site.
      },
    },
    'gatsby-plugin-typescript',
    'gatsby-plugin-typescript-checker',
    'gatsby-plugin-styled-components',
    {
      resolve: 'gatsby-plugin-mdx',
      options: {
        gatsbyRemarkPlugins: [
          { resolve: 'gatsby-remark-autolink-headers', options: {} },
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 790,
              quality: 90,
            },
          },
          {
            resolve: 'gatsby-remark-prismjs',
            options: {
              classPrefix: 'language-',
              inlineCodeMarker: null,
              aliases: {},
              showLineNumbers: true,
              noInlineHighlight: true,
            },
          },
        ],
      },
    },
    'gatsby-plugin-catch-links',
    {
      resolve: `gatsby-plugin-env-variables`,
      options: {
        whitelist: ['URL'],
      },
    },
    {
      resolve: 'gatsby-plugin-sitemap',
      options: {
        exclude: ['/cv'],
      },
    },
  ],
};
