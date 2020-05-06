import { graphql, Link as GatsbyLink } from 'gatsby'
import React from 'react'
import styles from './Menu.module.scss'

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
    <a href={to} {...other} target='_blank'>
      {children}
    </a>
  )
}

export const Menu = ({ menuItems, isMenuOpen }: any) => {
  const categories =
    menuItems &&
    menuItems.nodes.filter((item: any) => {
      if (item.title !== 'Instagram' && item.title !== 'Contact') {
        return item
      }
    })
  const socialLinks =
    menuItems &&
    menuItems.nodes.filter((item: any) => {
      if (item.title === 'Instagram' || item.title === 'Contact') {
        return item
      }
    })

  // Add this line to merge the social links with the categories link.
  // socialLinks && socialLinks.map((item: any) => categories.push(item))

  return (
    <div
      className={styles.navMenu}
      style={{ transform: isMenuOpen ? 'translateX(0)' : 'translateX(-100%)' }}
    >
      <nav>
        <div className={styles.categoryLinks}>
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
        </div>
        <div className={styles.socialLinks}>
          {socialLinks &&
            socialLinks.map((item: any, index: number) => {
              return item.url === 'https://www.instagram.com/igotvisions/' ? (
                <a
                  className={`${styles.listItem} ${styles.centerListItem}`}
                  href={item.url}
                  target='_blank'
                  key={index}
                >
                  {item.title}
                </a>
              ) : (
                <Link
                  to={`/${item.url}`}
                  className={`${styles.listItem} ${styles.centerListItem}`}
                  key={index}
                  state={item.categoryLink ? item.title : null}
                >
                  {item.title}
                </Link>
              )
            })}
        </div>
      </nav>
    </div>
  )
}
