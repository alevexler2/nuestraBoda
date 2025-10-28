import React from 'react'
import type { CustomModalInterfaceContainer } from '../../interface/CustomModalInterfaceContainer'
import CustomModalDesktop from './Desktop/CustomModalDesktop';

const CustomModalContainer: React.FC<CustomModalInterfaceContainer> = ({ children, isOpen, setIsOpen }) => {
  const closeModal = () => setIsOpen(false);

  return (
    <>
      {isOpen && (
        <CustomModalDesktop onClose={closeModal}>
          {children}
        </CustomModalDesktop>
      )}
    </>
  );
}

export default CustomModalContainer