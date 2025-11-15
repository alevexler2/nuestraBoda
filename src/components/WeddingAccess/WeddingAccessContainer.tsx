import WeddingAccesDesktop from "./Desktop/WeddingAccesDesktop";
import type { WeddingAccesInterfaceContainer } from "../../interface/WeddingAccessInterfaceContainer";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../config/firebaseConfig";
import { Oval } from "react-loader-spinner";
import styles from "./Desktop/styles.module.scss"

const WeddingAccessContainer = ({
  setAccessGranted,
  event,
  loadingEventData,
  setLoadingEventData,
}: WeddingAccesInterfaceContainer) => {
  const loginWithGoogle = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      setLoadingEventData(true)
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
    } finally {
      setLoadingEventData(false)
    }
  };

  return (
    <>
      {loadingEventData ? (
        <div className={styles.loaderContainer}>
          <Oval
            height={32}
            width={32}
            strokeWidth={4}
            strokeWidthSecondary={4}
            visible={true}
            ariaLabel="loading"
          />
        </div>
      ) : (
        <WeddingAccesDesktop loginWithGoogle={loginWithGoogle} event={event} />
      )}
    </>
  );
};

export default WeddingAccessContainer;
