import React from 'react';
import DesktopContainer from './Desktop/DesktopContainer';
import type { ContainerProps } from '../../interface/ContainerInterface';

const Container: React.FC<ContainerProps> = ({ children }) => {
  return (
    <DesktopContainer>
      {children}
    </DesktopContainer>
  );
}

export default Container;
