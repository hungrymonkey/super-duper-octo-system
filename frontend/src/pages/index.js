import React from 'react'
import {graphql, useStaticQuery} from 'gatsby'
import get from 'lodash/get'
import {Image, Header} from 'semantic-ui-react'
//  import ProductList from '../components/ProductList' /* unused */
import SEO from '../components/SEO'
import logo from '../images/ill-short-dark.svg'
import Layout from '../components/Layout'

const StoreIndex = ({location}) => {
  const data = useStaticQuery(graphql`
    query IndexQuery {
      site {
        siteMetadata {
          title
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
      allCruise {
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
    }
  `)
  const siteTitle = get(data, 'site.siteMetadata.title')
  //  const products = get(data, 'allCruise.edges')/* unused */
  //  const filterProductsWithoutImages = products.filter(v => v.node.mainImageHref)/* unused */
  return (
    <Layout location={location}>
      <SEO title={siteTitle} />
      <Header
        as="h3"
        icon
        textAlign="center"
        style={{
          marginBottom: '2em',
        }}
      >
        <Header.Content
          style={{
            width: '60%',
            margin: '0 auto',
          }}
        >
          <Image src={logo} alt="logo" />
        </Header.Content>
      </Header>
      {/* <ProductList products={filterProductsWithoutImages} /> */}
    </Layout>
  )
}

export default StoreIndex
