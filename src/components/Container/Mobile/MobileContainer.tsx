import React from "react";
import type { ContainerProps } from "../../../interface/ContainerInterface";
import styles from "./styles.module.scss";

const MobileContainer: React.FC<ContainerProps> = ({ children, event }) => {

  return (
    <div
      className={styles.container}
      style={
        {
          "--bg": event.Theme?.background,
        } as React.CSSProperties
      }
    >
      {children}
    </div>
  );
};

export default MobileContainer;
