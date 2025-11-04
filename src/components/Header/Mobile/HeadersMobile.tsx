import styles from "./styles.module.scss";
import colors from "../../../assets/_themes-vars.module.scss";
import { Heart } from "lucide-react";
import AvatarContainer from "../../Avatar/AvatarContainer";
import { LogOut } from "lucide-react";
import type { HeaderInterface } from "../../../interface/HeaderInterface";

const HeadersMobile = ({ logout, event }: HeaderInterface) => {
  return (
    <div className={styles.container}>
      <div className={styles.containerLeft}>
        <Heart fill={colors.backgroundBtn} strokeWidth={0} size={24} />
        <div>
          <h2>{event.EventName}</h2>
          <p>{event.Subtitle}</p>
        </div>
      </div>
      <div className={styles.containerRight}>
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

export default HeadersMobile;
