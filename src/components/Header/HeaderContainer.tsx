import useBreakpoints from "../../hooks/useBreakpoints";
import HeaderDesktop from "./Desktop/HeaderDesktop";
import HeadersMobile from "./Mobile/HeadersMobile";
import { auth } from "../../config/firebaseConfig";
import { signOut } from "firebase/auth";
import type { HeaderInterfaceContainer } from "../../interface/HeaderInterfaceContainer";

const HeaderContainer = ({ setAccessGranted, event }: HeaderInterfaceContainer) => {
  const { isMdDown } = useBreakpoints();

  const logout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem("accessGranted");
      localStorage.removeItem("userName");
      setAccessGranted(false);
      console.log("Sesión cerrada correctamente");
    } catch (err) {
      console.error("Error cerrando sesión:", err);
    }
  };

  return (
    <>
      {isMdDown ? (
        <HeadersMobile logout={logout} event={event}/>
      ) : (
        <HeaderDesktop logout={logout} event={event}/>
      )}
    </>
  );
};

export default HeaderContainer;
