import React from "react";
import type { AvatarContainerProps } from "../../interface/AvatarContainerInterface";
import AvatarDesktop from "./Desktop/AvatarDektop";
import avatarImage from "../../assets/avatar.png";
import diveriaImage from "../../assets/Union-2.svg";

const AvatarContainer: React.FC<AvatarContainerProps> = ({
  name = "A & C",
  big,
}) => {
  const pathSegments = window.location.pathname.split("/").filter(Boolean);
  const eventId = pathSegments[pathSegments.length - 1];

  const initials = name
    .split("&")
    .map((n) => n.trim()[0]?.toUpperCase())
    .join(" & ");

  const imageUrl =
    eventId === "b3a6a831-93a2-4b39-92ba-cce04da821f4" ? diveriaImage : avatarImage;

  return <AvatarDesktop initials={initials} imageUrl={imageUrl} big={big} />;
};

export default AvatarContainer;
