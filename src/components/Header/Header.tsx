import React from 'react'
import { Link as GatsbyLink, graphql } from 'gatsby'
import styles from './Header.module.scss'
import { useWindowSize } from '../../helpers/helpers'

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

export const Header = ({
  menuItems,
  siteTitle,
  setIsMenuOpen,
  isMenuOpen,
  style,
  sticky,
}: any) => {
  const categories =
    menuItems &&
    menuItems.nodes.filter((item: any) => {
      if (item.title !== 'Instagram' && item.title !== 'Contact') {
        return item
      }
    })
  const removed =
    menuItems &&
    menuItems.nodes.filter((item: any) => {
      if (item.title === 'Instagram' || item.title === 'Contact') {
        return item
      }
    })
  removed && removed.map((item: any) => categories.push(item))

  const size = useWindowSize()
  const IS_MOBILE = size && size.width < 767

  return (
    <header className={styles.header} style={style}>
      <div>
        <div>
          <Link to='/'>Hugo Carlier</Link>
        </div>
        {IS_MOBILE ? (
          <button className={styles.burgerButton} onClick={setIsMenuOpen}>
            <div
              style={{
                transform: isMenuOpen ? 'translateY(1px)' : 'translateY(-4px)',
              }}
            />
            <div />
            <div
              style={{
                transform: isMenuOpen ? 'translateY(-1px)' : 'translateY(4px)',
              }}
            />
          </button>
        ) : (
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
                  ) => {
                    return item.url ===
                      'https://www.instagram.com/igotvisions/' ? (
                      <a
                        className={styles.listItem}
                        href={item.url}
                        target='_blank'
                      >
                        {item.title}
                      </a>
                    ) : (
                      <Link
                        to={`/${item.url}`}
                        className={styles.listItem}
                        key={index}
                        state={item.categoryLink ? item.title : null}
                      >
                        {item.title}
                      </Link>
                    )
                  }
                )}
            </nav>
          </div>
        )}
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
