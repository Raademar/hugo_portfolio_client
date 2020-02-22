const path = require('path')

exports.createPages = async ({ actions, graphql }) => {
  const result = await graphql(`
    {
      allSanityProject {
        edges {
          node {
            slug {
              current
            }
          }
        }
      }
      allSanityCategory {
        edges {
          node {
            title
            slug {
              current
            }
            description
          }
        }
      }
    }
  `)

  const projects = result.data.allSanityProject.edges.map(({ node }) => node)
  const categories = result.data.allSanityCategory.edges.map(({ node }) => node)

  projects.forEach(project => {
    actions.createPage({
      path: project.slug.current,
      component: path.resolve('./src/templates/project.tsx'),
      context: {
        slug: project.slug.current
      }
    })
  })
  categories.forEach(category => {
    actions.createPage({
      path: category.slug.current,
      component: path.resolve('./src/templates/category.tsx'),
      context: {
        slug: category.slug.current
      }
    })
  })
}
