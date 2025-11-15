import type { WeddingAccesInterface } from "../../../interface/WeddingAccesInterface";
import CustomBtnContainer from "../../CustomBtn/CustomBtnContainer";
import styles from "./styles.module.scss";
import colors from "../../../assets/_themes-vars.module.scss";
import { Heart } from "lucide-react";
import AvatarContainer from "../../Avatar/AvatarContainer";
import { GoogleIcon } from "../../GoogleIcon/GoogleIcon";

const WeddingAccesDesktop = ({
  loginWithGoogle, event
}: WeddingAccesInterface) => {
  return (
    <div className={styles.container}>
      <AvatarContainer big={true} />
      <div className={styles.titleContainer}>
        <Heart fill={colors.error} strokeWidth={0} size={24} />
        <h1>{event.EventName}</h1>
        <Heart fill={colors.error} strokeWidth={0} size={24} />
      </div>
      <h4>{event.Subtitle}</h4>
      <form onSubmit={loginWithGoogle}>
        <CustomBtnContainer
          value="Ingresar"
          icon={GoogleIcon}
          hasIcon={true}
        />
      </form>
    </div>
  );
};

export default WeddingAccesDesktop;
