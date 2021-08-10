const Promise = require('bluebird')
const path = require('path')

exports.sourceNodes = ({
  actions: {createNode},
  createNodeId,
  createContentDigest,
}) => {
  const Cruise = [
    {
      name: 'Trip1',
      photo: 'cruise-princess.jpg',
    },
    {
      name: 'Trip2',
      photo: 'cruise-disney.jpg',
    },
  ]

  Cruise.forEach(d => {
    const node = {
      ...d,
      id: createNodeId(`Cruise-${d.name}`),
      internal: {
        type: 'Cruise',
        contentDigest: createContentDigest(d),
      },
    }
    createNode(node)
  })
}

exports.createPages = ({graphql, actions}) => {
  const {createPage} = actions

  return new Promise((resolve, reject) => {
    const productPageTemplate = path.resolve('src/templates/ProductPage.js')
    resolve(
      graphql(
        `
          {
            allMoltinProduct {
              edges {
                node {
                  id
                }
              }
            }
          }
        `,
      ).then(result => {
        if (result.errors) {
          console.log(result.errors)
          reject(result.errors)
        }
        result.data.allMoltinProduct.edges.forEach(edge => {
          createPage({
            path: `/product/${edge.node.id}/`,
            component: productPageTemplate,
            context: {
              id: edge.node.id,
            },
          })
        })
      }),
    )
  })
}

exports.onCreateWebpackConfig = ({actions}) => {
  actions.setWebpackConfig({
    node: {fs: 'empty'},
  })
}
