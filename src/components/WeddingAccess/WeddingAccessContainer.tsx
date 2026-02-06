import WeddingAccesDesktop from "./Desktop/WeddingAccesDesktop";
import type { WeddingAccesInterfaceContainer } from "../../interface/WeddingAccessInterfaceContainer";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../config/firebaseConfig";
import { Oval } from "react-loader-spinner";
import styles from "./Desktop/styles.module.scss";

const WeddingAccessContainer = ({
  setAccessGranted,
  event,
  loadingEventData,
  setLoadingEventData,
}: WeddingAccesInterfaceContainer) => {
  const pathSegments = window.location.pathname.split("/").filter(Boolean);
  const eventId = pathSegments[pathSegments.length - 1];
  const showIcon =
    eventId === "b3a6a831-93a2-4b39-92ba-cce04da821f4" ? false : true;

  const loginWithGoogle = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      setLoadingEventData(true);
      e.preventDefault();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const providerEmail = user.providerData[0]?.email;
      setAccessGranted(true);
      localStorage.setItem("accessGranted", "true");
      localStorage.setItem("userName", user.displayName || "");
      localStorage.setItem("userEmail", providerEmail || "");
    } catch (err) {
      console.error("Error al iniciar sesión:", err);
    } finally {
      setLoadingEventData(false);
    }
  };

  return (
    <>
      {loadingEventData ? (
        <div
          className={styles.loaderContainer}
          style={
            {
              "--bg": event.Theme?.background,
            } as React.CSSProperties
          }
        >
          <Oval
            height={32}
            width={32}
            strokeWidth={4}
            strokeWidthSecondary={4}
            visible={true}
            ariaLabel="loading"
            color="#FFFFFF"
            secondaryColor="#FFFFFF"
          />
        </div>
      ) : (
        <WeddingAccesDesktop
          loginWithGoogle={loginWithGoogle}
          event={event}
          showIcon={showIcon}
        />
      )}
    </>
  );
};

export default WeddingAccessContainer;
