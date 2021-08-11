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
      description: 'A famous cruise line',
      meta: {
        display_price: {
          with_tax: {
            amount: 800,
            currency: 'USD',
            formatted: '$800',
          },
        },
      },
      material: 'wonder',
      max_watt: 10000,
      bulb_qty: 'buffets',
      bulb: 'Sauna',
      sku: 'BXD100BLF',
      finish: 'Juneau, AL',
    },
    {
      name: 'Trip2',
      photo: 'cruise-disney.jpg',
      description: 'Also makes marvel movies',
      meta: {
        display_price: {
          with_tax: {
            amount: 1000,
            currency: 'USD',
            formatted: '$1,000',
          },
        },
      },
      material: 'fun',
      max_watt: 5000,
      bulb_qty: 'buffets',
      bulb: 'swimming pools',
      sku: 'BXD100BLK',
      finish: 'Miami, FL',
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
            allCruise {
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
        result.data.allCruise.edges.forEach(edge => {
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
