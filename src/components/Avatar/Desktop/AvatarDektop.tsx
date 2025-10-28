import React from 'react';
import styles from './styles.module.scss';
import type { AvatarProps } from '../../../interface/AvatarInterface';

const AvatarDesktop: React.FC<AvatarProps> = ({ initials, imageUrl, big }) => {
  return (
    <div className={`${styles.avatar} ${big && styles.big}`}>
      {imageUrl ? (
        <img src={imageUrl} alt="Avatar" className={styles.image} />
      ) : (
        <span className={styles.initials}>{initials}</span>
      )}
    </div>
  );
};

export default AvatarDesktop;
