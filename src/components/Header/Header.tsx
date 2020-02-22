import React from 'react'
import { Link as GatsbyLink, graphql } from 'gatsby'
import styles from './Header.module.scss'

const Link = ({
  children,
  to,
  activeClassName,
  partiallyActive,
  ...other
}: any) => {
  const internal = /^\/(?!\/)/.test(to)
  if (internal) {
    return (
      <GatsbyLink
        to={to}
        activeClassName={activeClassName}
        partiallyActive={partiallyActive}
        {...other}
      >
        {children}
      </GatsbyLink>
    )
  }
  return (
    <a href={to} {...other}>
      {children}
    </a>
  )
}

export const Header = ({ menuItems, siteTitle }: any) => {
  const categories = menuItems.nodes.filter((item: any) => {
    if (item.title !== 'Instagram' && item.title !== 'Contact') {
      return item
    }
  })
  const removed = menuItems.nodes.filter((item: any) => {
    if (item.title === 'Instagram' || item.title === 'Contact') {
      return item
    }
  })
  removed.map((item: any) => categories.push(item))
  return (
    <header className={styles.header}>
      <div>
        <div>
          <Link to='/'>Hugo Carlier</Link>
        </div>
        <div className={styles.navMenu}>
          <nav>
            {categories &&
              categories.map(
                (
                  item: {
                    url: string
                    title: string
                    id: string
                    categoryLink: boolean
                  },
                  index: number
                ) => (
                  <Link
                    to={`/${item.url}`}
                    className={styles.listItem}
                    key={index}
                    state={item.categoryLink ? item.title : null}
                  >
                    {item.title}
                  </Link>
                )
              )}
          </nav>
        </div>
      </div>
    </header>
  )
}

export const query = graphql`
  {
    allSanityMenuItem {
      nodes {
        categoryLink
        title
        url
        id
      }
    }
  }
`
