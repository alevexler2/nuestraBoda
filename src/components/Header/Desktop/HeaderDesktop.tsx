import styles from "./styles.module.scss";
import colors from "../../../assets/_themes-vars.module.scss";
import { Heart } from "lucide-react";
import AvatarContainer from "../../Avatar/AvatarContainer";
import type { HeaderInterfaceContainer } from "../../../interface/HeaderInterfaceContainer";
import { LogOut } from "lucide-react";

const HeaderDesktop = ({ logout }: HeaderInterfaceContainer) => {
  return (
    <div className={styles.container}>
      <div className={styles.containerLeft}>
        <Heart fill={colors.backgroundBtn} strokeWidth={0} size={24} />
        <h2>{import.meta.env.VITE_SITE_NAME}</h2>
      </div>
      <div className={styles.containerRight}>
        <p>Ale & Cande</p>
        <AvatarContainer />
        <LogOut
          size={24}
          color={colors.backgroundBtn}
          style={{ cursor: "pointer", marginLeft: "10px" }}
          onClick={logout}
        />
      </div>
    </div>
  );
};

export default HeaderDesktop;
