import styles from "./styles.module.scss";
import colors from "../../../assets/_themes-vars.module.scss";
import { Heart } from "lucide-react";
import AvatarContainer from "../../Avatar/AvatarContainer";
import { LogOut } from "lucide-react";
import type { HeaderInterface } from "../../../interface/HeaderInterface";

const HeaderDesktop = ({ logout, event }: HeaderInterface) => {
  return (
    <div className={styles.container}>
      <div className={styles.containerLeft}>
        <Heart fill={colors.error} strokeWidth={0} size={24} />
        <h2>{event.EventName}</h2>
      </div>
      <div className={styles.containerRight}>
        <p>{event.Subtitle}</p>
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
