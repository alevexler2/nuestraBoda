import type { WeddingAccesInterface } from '../../../interface/WeddingAccesInterface'
import CustomBtnContainer from '../../CustomBtn/CustomBtnContainer'
import CustomInputContainer from '../../CustomInput/CustomInputContainer'
import styles from './styles.module.scss'
import colors from "../../../assets/_themes-vars.module.scss";
import { Heart } from "lucide-react";
import AvatarContainer from '../../Avatar/AvatarContainer';

const WeddingAccesDesktop = ({ inputValue, setInputValue, setAccessGranted, accessGranted, setError, showError, error, handleSubmit }: WeddingAccesInterface) => {
  return (
    <div className={styles.container}>
      <AvatarContainer big={true} />
      <div className={styles.titleContainer}>
        <Heart fill={colors.backgroundBtn} strokeWidth={0} size={24} />
        <h1>{import.meta.env.VITE_SITE_NAME}</h1>
        <Heart fill={colors.backgroundBtn} strokeWidth={0} size={24} />
      </div>
      <h4>Ale & Cande</h4>
      <form onSubmit={handleSubmit}>
        <CustomInputContainer placeholder='Ingresa Tu Nombre' value={inputValue} setValue={setInputValue} />
        {showError && <p className={styles.inputError}>{error}</p>}
        <CustomBtnContainer value='Entrar' setAccessGranted={setAccessGranted} accessGranted={accessGranted} inputValue={inputValue} setError={setError} />
      </form>
    </div>
  )
}

export default WeddingAccesDesktop