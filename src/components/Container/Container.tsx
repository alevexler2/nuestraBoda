import React from 'react';
import DesktopContainer from './Desktop/DesktopContainer';
import type { ContainerProps } from '../../interface/ContainerInterface';
import useBreakpoints from '../../hooks/useBreakpoints';
import MobileContainer from './Mobile/MobileContainer';

const Container: React.FC<ContainerProps> = ({ children, event  }) => {
  const { isMdDown } = useBreakpoints();

  return (
    <>
      {isMdDown ? (
        <MobileContainer event={event} >
          {children}
        </MobileContainer>
      ) : (
        <DesktopContainer event={event}>
          {children}
        </DesktopContainer>
      )}
    </>
  );
}

export default Container;
