import React, { useEffect, useRef, useState } from "react";
import GoogleMapReact from "google-map-react";
import LocationOnOutlinedIcon from "@material-ui/icons/LocationOnOutlined";
import "../styles/Map.css";

// const MarkerComponent = () => (
//   <div className="markerContainer">
//     <LocationOnOutlinedIcon color="primary" fontSize="large" />
//   </div>
// );

const Map = ({
  setCoordinates,
  setBounds,
  coordinates,
  places,
  setChildClicked,
}) => {
  const mapRef = useRef(null); // Ref to hold map instance
  const markersRef = useRef([]); // Ref to hold markers instances

  const [loading, setLoading] = useState(true); // Loading state

  // Function to render markers on the map
  const renderMarkers = (map, maps) => {
    if (!markersRef.current) return;

    // Clear existing markers from the map
    markersRef.current.forEach((marker) => marker.setMap(null));
    markersRef.current = [];

    // Create markers based on the list of places
    places?.forEach((place, index) => {
      const marker = new google.maps.Marker({
        position: { lat: Number(place.latitude), lng: Number(place.longitude) },
        map,
        title: place.title,
      });

      marker.addListener("click", () => {
        if (setChildClicked) {
          setChildClicked(index); // Call the onMarkerClick handler with the place data
        }
      });

      markersRef.current.push(marker);
    });
  };

  const handleApiLoaded = (map, maps) => {
    mapRef.current = map;
    if (places && places.length > 0) {
      renderMarkers(map, maps);
      setLoading(false); // Set loading to false once markers are rendered
    }
  };

  // Effect to update markers when places change
  useEffect(() => {
    if (mapRef.current && window.google && places && places.length > 0) {
      renderMarkers(mapRef.current, window.google.maps);
    }
  }, [places]);

  // Effect to handle loading state
  useEffect(() => {
    if (places) {
      setLoading(false);
    } else {
      setLoading(true);
    }
  }, [places]);

  return (
    <div className="map-container">
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLEMAPS_KEY }}
        // Replace with your actual API key
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
        defaultCenter={coordinates}
        center={coordinates}
        defaultZoom={15}
        margin={[50, 50, 50, 50]}
        options={{ disableDefaultUI: true, zoomControl: true }}
        onChange={(e) => {
          setCoordinates({ lat: e.center.lat, lng: e.center.lng });
          setBounds({
            ne: e.marginBounds.ne,
            sw: e.marginBounds.sw,
          });
        }}
      >
        {/* {places?.map((place, index) => (
          <MarkerComponent
            key={index}
            lat={Number(place.lat)}
            lng={Number(place.lng)}
          />
        ))} */}
      </GoogleMapReact>
    </div>
  );
};

export default Map;
