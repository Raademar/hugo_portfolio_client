import React from 'react'
import { Link } from 'gatsby'
import styles from './Header.module.scss'

export const Header = () => {
  return (
    <header className={styles.header}>
      <div>
        <div>
          <Link to='/'>Hugo Carlier</Link>
        </div>
        {/* <div className={styles.contactMenu}>
          <nav>
            <Link
              to='https://instagram.com/hugocarlier'
              className={styles.listItem}
            >
              Instagram
            </Link>
            <Link to='/contact' className={styles.listItem}>
              Contact
            </Link>
          </nav>
        </div> */}
      </div>
      {/* <div className={styles.navMenu}>
        <nav>
          <Link to='/projects/narrative' className={styles.listItem}>
            Narrative
          </Link>
          <Link to='/projects/stills' className={styles.listItem}>
            Stills
          </Link>
          <Link to='/projects/music-videos' className={styles.listItem}>
            Music Videos
          </Link>
          <Link to='/projects/commercials' className={styles.listItem}>
            Commercials
          </Link>
        </nav>
      </div> */}
    </header>
  )
}
