import React from 'react'
import styles from './Video.module.scss'
export const Video = ({ videoSrcURL, videoTitle, ...props }: any) => (
  <div className={styles.video}>
    <iframe
      src={videoSrcURL}
      title={videoTitle}
      allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture'
      frameBorder='0'
      webkitallowfullscreen='true'
      mozallowfullscreen='true'
      allowFullScreen={true}
    />
  </div>
)
