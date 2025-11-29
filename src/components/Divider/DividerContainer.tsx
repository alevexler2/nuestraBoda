import useBreakpoints from '../../hooks/useBreakpoints';
import styles from './styles.module.scss'

const DividerContainer = () => {
  const { isMdDown } = useBreakpoints();

  return (
    <div className={isMdDown ? styles.containerMobile : styles.container}></div>
  )
}

export default DividerContainer