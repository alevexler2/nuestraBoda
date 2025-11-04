import WeddingAccesDesktop from "./Desktop/WeddingAccesDesktop";
import type { WeddingAccesInterfaceContainer } from "../../interface/WeddingAccessInterfaceContainer";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../config/firebaseConfig";

const WeddingAccessContainer = ({
  setAccessGranted, event
}: WeddingAccesInterfaceContainer) => {
  const loginWithGoogle = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log("Usuario logueado:", user.displayName, user.email);
      setAccessGranted(true);
      localStorage.setItem("accessGranted", "true");
      localStorage.setItem("userName", user.displayName || "");
      localStorage.setItem("userEmail", user.email || "");
    } catch (err) {
      console.error("Error al iniciar sesión:", err);
    }
  };

  return (
    <WeddingAccesDesktop
      loginWithGoogle={loginWithGoogle} event={event}
    />
  );
};

export default WeddingAccessContainer;
