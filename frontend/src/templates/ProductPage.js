/* eslint-disable */
import React from 'react'
import {graphql, useStaticQuery} from 'gatsby'
import SEO from '../components/SEO'
import get from 'lodash/get'
import ProductSummary from '../components/ProductSummary'
import ProductAttributes from '../components/ProductAttributes'
import Layout from '../components/Layout'

class ProductPageTemplate extends React.PureComponent {
  render() {
    const productInfo = get(this, 'props.data.allCruise')
    const data = productInfo.edges[0].node
    const allFiles = get(this, 'props.data.allFile')
    const image = allFiles.edges.find(
      e => productInfo.edges[0].photo === e.base,
    ).node?.childImageSharp?.fluid
    //const image = get(data, 'mainImageHref')
    const slug = data.name
    const sizes = allFiles.edges.find(
      e => productInfo.edges[0].photo === e.base,
    ).node?.childImageSharp?.fluid.sizes
    const product = {
      ...data,
      id: data.id,
      image,
      mainImage: image,
      header: data.name,
      meta: data.meta,
      sku: data.sku,
    }

    if (!sizes) return null

    return (
      <Layout location={this.props.location}>
        <SEO title={slug} />
        <ProductSummary {...product} />
        <ProductAttributes {...product} />
      </Layout>
    )
  }
}

export default ProductPageTemplate

export const pageQuery = graphql`
  query ProductsQuery($id: String!) {
    allCruise(filter: {id: {eq: $id}}) {
      edges {
        node {
          id
          name
          description
          meta {
            display_price {
              with_tax {
                amount
                currency
                formatted
              }
            }
          }
          material
          max_watt
          bulb_qty
          bulb
          sku
          finish
        }
      }
    }
    allFile(
      filter: {
        extension: {regex: "/(jpg)|(png)|(jpeg)/"}
        relativeDirectory: {in: ""}
      }
    ) {
      edges {
        node {
          base
          childImageSharp {
            fluid(maxWidth: 800) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`
