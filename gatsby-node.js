const path = require(`path`);

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;
  const result = await graphql(`
    query {
      allMdx(
        filter: { fileAbsolutePath: { regex: "//markdown/posts//" } }
        sort: { order: DESC, fields: frontmatter___date }
      ) {
        edges {
          node {
            frontmatter {
              slug
            }
          }
        }
      }
    }
  `);
  result.data.allMdx.edges.forEach(({ node }) => {
    createPage({
      path: `post/${node.frontmatter.slug}`,
      component: path.resolve(`./src/templates/post.tsx`),
      context: {
        slug: node.frontmatter.slug,
      },
    });
  });
};
