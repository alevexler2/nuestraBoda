import { useEffect, useState } from "react";
import WeddingAccessContainer from "./components/WeddingAccess/WeddingAccessContainer.js";
import PhotoGalleryContainer from "./components/PhotoGallery/PhotoGalleryContainer.js";
import { api } from "./api/apiService.js";
import type { EventInterface } from "./interface/EventInterface.js";

function App() {
  const [accessGranted, setAccessGranted] = useState(false);
  const [event, setEvent] = useState<EventInterface>({
    ID: "",
    EventName: "",
    Subtitle: "",
    EventDate: new Date().toISOString(),
    OwnerEmail1: "",
    OwnerEmail2: "",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  });
  const [loadingEventData, setLoadingEventData] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem("accessGranted");
    if (saved === "true") setAccessGranted(true);

    const pathSegments = window.location.pathname.split("/").filter(Boolean);
    const eventId = pathSegments[pathSegments.length - 1];

    if (eventId) {
      api
        .getEventById(eventId)
        .then((data) => {
          setEvent(data);
        })
        .catch((err) => {
          console.error("Error fetching event:", err);
        })
        .finally(() => setLoadingEventData(false));
    }
  }, []);

  return (
    <>
      {accessGranted ? (
        <PhotoGalleryContainer
          setAccessGranted={setAccessGranted}
          event={event}
        />
      ) : (
        <WeddingAccessContainer
          setAccessGranted={setAccessGranted}
          accessGranted={accessGranted}
          event={event}
          loadingEventData={loadingEventData}
          setLoadingEventData={setLoadingEventData}
        />
      )}
    </>
  );
}

export default App;
