import React from 'react'
import styles from './Header.module.scss'

export const Header = () => {
  return (
    <div className={styles.header}>
      <div>
        <div>
          <h3>Hugo Carlier</h3>
        </div>
        <div className={styles.contactMenu}>
          <ul>
            <li className={styles.listItem}>Instagram</li>
            <li className={styles.listItem}>Contact</li>
          </ul>
        </div>
      </div>
      <div className={styles.navMenu}>
        <ul>
          <li className={styles.listItem}>Narrative</li>
          <li className={styles.listItem}>Stills</li>
          <li className={styles.listItem}>Music Videos</li>
          <li className={styles.listItem}>Commercials</li>
        </ul>
      </div>
    </div>
  )
}
