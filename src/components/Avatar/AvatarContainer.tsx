import React from 'react';
import type { AvatarContainerProps } from '../../interface/AvatarContainerInterface';
import AvatarDesktop from './Desktop/AvatarDektop';
import avatarImage from '../../assets/avatar.png'

const AvatarContainer: React.FC<AvatarContainerProps> = ({ name = 'A & C', big }) => {
  const initials = name
    .split('&')
    .map((n) => n.trim()[0]?.toUpperCase())
    .join(' & ');

  return <AvatarDesktop initials={initials} imageUrl={avatarImage} big={big} />;
};

export default AvatarContainer;
