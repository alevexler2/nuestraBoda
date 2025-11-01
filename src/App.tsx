import { useEffect, useState } from "react";
import WeddingAccessContainer from "./components/WeddingAccess/WeddingAccessContainer.js";
import PhotoGalleryContainer from "./components/PhotoGallery/PhotoGalleryContainer.js";

function App() {
  const [accessGranted, setAccessGranted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("accessGranted");
    if (saved === "true") setAccessGranted(true);
  }, []);

  return (
    <>
      {accessGranted ? (
        <PhotoGalleryContainer />
      ) : (
        <WeddingAccessContainer
          setAccessGranted={setAccessGranted}
          accessGranted={accessGranted}
        />
      )}
    </>
  );
}

export default App;
