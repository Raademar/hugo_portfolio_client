import React from 'react'
import styles from './Header.module.scss'

export const Header = () => {
  return (
    <div className={styles.header}>
      <div className={styles.navMenu}>
        <ul>
          <li>Commercials</li>
          <li>Music Videos</li>
          <li>Narrative</li>
          <li>Stills</li>
        </ul>
      </div>
      <div className={styles.contactMenu}>
        <ul>
          <li>Instagram</li>
          <li>Contact</li>
        </ul>
      </div>
    </div>
  )
}
