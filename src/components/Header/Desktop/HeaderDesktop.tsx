import styles from './styles.module.scss'
import colors from "../../../assets/_themes-vars.module.scss";
import { Heart } from "lucide-react";
import AvatarContainer from '../../Avatar/AvatarContainer';

const HeaderDesktop = () => {
  return (
    <div className={styles.container}>
      <div className={styles.containerLeft}>
        <Heart fill={colors.backgroundBtn} strokeWidth={0} size={24} />
        <h2>{import.meta.env.VITE_SITE_NAME}</h2>
      </div>
      <div className={styles.containerRight}>
        <p>Ale & Cande</p>
        <AvatarContainer />
      </div>
    </div>
  )
}

export default HeaderDesktop