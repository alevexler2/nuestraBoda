import React from 'react';
import type { ContainerProps } from '../../../interface/ContainerInterface';
import styles from './styles.module.scss';

const DesktopContainer: React.FC<ContainerProps> = ({ children }) => {
  return (
    <div className={styles.container}>
      {children}
    </div>
  );
}

export default DesktopContainer;
