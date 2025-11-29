import useBreakpoints from "../../hooks/useBreakpoints";
import HeaderDesktop from "./Desktop/HeaderDesktop";
import HeadersMobile from "./Mobile/HeadersMobile";
import { auth } from "../../config/firebaseConfig";
import { signOut } from "firebase/auth";
import type { HeaderInterfaceContainer } from "../../interface/HeaderInterfaceContainer";

const HeaderContainer = ({ setAccessGranted, event }: HeaderInterfaceContainer) => {
  const { isMdDown } = useBreakpoints();
  const pathSegments = window.location.pathname.split("/").filter(Boolean);
  const eventId = pathSegments[pathSegments.length - 1];
  const showIcon =
    eventId === "b3a6a831-93a2-4b39-92ba-cce04da821f4" ? false : true;

  const logout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem("accessGranted");
      localStorage.removeItem("userName");
      localStorage.removeItem("userEmail");
      setAccessGranted(false);
      console.log("Sesión cerrada correctamente");
    } catch (err) {
      console.error("Error cerrando sesión:", err);
    }
  };

  return (
    <>
      {isMdDown ? (
        <HeadersMobile logout={logout} event={event} showIcon={showIcon} />
      ) : (
        <HeaderDesktop logout={logout} event={event} showIcon={showIcon} />
      )}
    </>
  );
};

export default HeaderContainer;
