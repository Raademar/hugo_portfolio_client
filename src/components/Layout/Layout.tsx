import { graphql, StaticQuery } from 'gatsby'
import React, { useState } from 'react'
import Headroom from 'react-headroom'
import Helmet from 'react-helmet'
import { Header } from '../Header/Header'
import { Menu } from '../Menu/Menu'
import styles from './Layout.module.scss'

export const Layout = ({ children }: any) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <StaticQuery
      query={graphql`
        query {
          site {
            siteMetadata {
              title
            }
          }
          allSanityMenuItem {
            nodes {
              title
              url
              id
            }
          }
        }
      `}
      render={(data) => (
        <div className={styles.wrapper}>
          <Helmet
            title={'Hugo Carlier'}
            meta={[
              {
                name: 'description',
                content: 'Film Director (BANDITS FR) and Cinematographer.',
              },
              { name: 'keywords', content: 'Film Director, Cinematographer' },
            ]}
          ></Helmet>
          <Headroom disableInlineStyles>
            <Header
              menuItems={data.allSanityMenuItem}
              siteTitle={data.site.siteMetadata.title}
              isMenuOpen={isMenuOpen}
              setIsMenuOpen={() => setIsMenuOpen(!isMenuOpen)}
            />
          </Headroom>
          <Menu menuItems={data.allSanityMenuItem} isMenuOpen={isMenuOpen} />
          <>{children}</>
        </div>
      )}
    />
  )
}
