import useBreakpoints from "../../hooks/useBreakpoints";
import HeaderDesktop from "./Desktop/HeaderDesktop";
import HeadersMobile from "./Mobile/HeadersMobile";
import { auth } from "../../config/firebaseConfig";
import { signOut } from "firebase/auth";

const HeaderContainer = ({ setAccessGranted }: any) => {
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
        <HeadersMobile logout={logout} />
      ) : (
        <HeaderDesktop logout={logout} />
      )}
    </>
  );
};

export default HeaderContainer;
