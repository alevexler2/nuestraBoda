import React from 'react';
import DesktopContainer from './Desktop/DesktopContainer';
import type { ContainerProps } from '../../interface/ContainerInterface';
import useBreakpoints from '../../hooks/useBreakpoints';
import MobileContainer from './Mobile/MobileContainer';

const Container: React.FC<ContainerProps> = ({ children }) => {
  const { isMdDown } = useBreakpoints();

  return (
    <>
      {isMdDown ? (
        <MobileContainer>
          {children}
        </MobileContainer>
      ) : (
        <DesktopContainer>
          {children}
        </DesktopContainer>
      )}
    </>
  );
}

export default Container;
