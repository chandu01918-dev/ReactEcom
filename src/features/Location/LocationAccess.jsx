import { useState } from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import "./LocationAccess.css";

export default function LocationAccess() {
  const [location, setLocation] = useState(
    "Enable Location Access"
  );

  const [loading, setLoading] = useState(false);

  const getLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation not supported");
      return;
    }

    setLoading(true);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const latitude =
          position.coords.latitude;

        const longitude =
          position.coords.longitude;

          
        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`
          );

          const data =
            await response.json();

          const city =
            data.address.city ||
            data.address.town ||
            data.address.village;

          const state =
            data.address.state;

          setLocation(
            `${city}, ${state}`
          );
        } catch (error) {
          alert("Failed to fetch location");
        }

        setLoading(false);
      },

      () => {
        alert("Permission denied");
        setLoading(false);
      },

      {
        enableHighAccuracy: true,
      }
    );
  };

  return (
    <button
      className="location-btn"
      onClick={getLocation}
    >
      <FaMapMarkerAlt />

      <span>
        {loading
          ? "Detecting..."
          : location}
      </span>
    </button>
  );
}