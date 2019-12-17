const path = require(`path`);
const { createFilePath } = require(`gatsby-source-filesystem`);

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions;
  if (node.internal.type === `Mdx`) {
    const slug = createFilePath({
      node,
      getNode,
      basePath: 'posts',
      trailingSlash: true,
    });
    createNodeField({
      node,
      name: 'slug',
      value: slug,
    });
  }
};

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;
  const result = await graphql(`
    query {
      allMdx(
        filter: {
          fileAbsolutePath: { regex: "//posts//" }
          frontmatter: { published: { eq: true } }
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
            }
          }
        }
      }
    }
  `);

  const categorySet = new Set();

  result.data.allMdx.edges.forEach(({ node }) => {
    (node.frontmatter.categories || []).forEach(category =>
      categorySet.add(category)
    );
    createPage({
      path: `post${node.fields.slug}`,
      component: path.resolve(`./src/templates/post.tsx`),
      context: {
        id: node.id,
      },
    });
  });

  const categoryArray = Array.from(categorySet);

  createPage({
    path: `posts`,
    component: path.resolve(`./src/templates/posts.tsx`),
    context: {
      categories: categoryArray,
    },
  });
  categoryArray.forEach(category => {
    createPage({
      path: `posts/${category}`,
      component: path.resolve(`./src/templates/posts.tsx`),
      context: {
        activeCategory: category,
        categories: categoryArray,
      },
    });
  });
};
