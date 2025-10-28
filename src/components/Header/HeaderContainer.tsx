import useBreakpoints from '../../hooks/useBreakpoints';
import HeaderDesktop from './Desktop/HeaderDesktop'
import HeadersMobile from './Mobile/HeadersMobile';

const HeaderContainer = () => {
  const { isMdDown } = useBreakpoints();
  return (
    <>
      {isMdDown ? <HeadersMobile /> : <HeaderDesktop />}
    </>
  )
}

export default HeaderContainer