import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  GoogleMap,
  LoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import { Box, Divider, Rating, Typography } from "@mui/material";
import TherapistProfiles from "./Profiles";
import InfoGrid from "./Crisis";

const GOOGLE_MAPS_API_KEY = "AIzaSyANtAnAwYLJv7rIz-Fuef2cJulsgCdTek0";

const containerStyle = {
  width: "90vh",
  height: "80vh",
};

const TherapistMap = () => {
  const [therapists, setTherapists] = useState([]);
  const [selected, setSelected] = useState(null);
  const [center, setCenter] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCenter({ lat: latitude, lng: longitude });
          fetchTherapists(latitude, longitude);
        },
        (error) => {
          console.error("Error getting location", error);
          // Set a default location or handle error accordingly
          setCenter({ lat: -3.745, lng: -38.523 }); // Default location if geolocation fails
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
      // Set a default location
      setCenter({ lat: -3.745, lng: -38.523 }); // Default location
    }
  }, []);

  const getStarRating = (rating) => {
    const fullStar = "★";
    const emptyStar = "☆";
    const stars = Array(5).fill(fullStar);
    for (let i = Math.ceil(rating); i < stars.length; i++) {
      stars[i] = emptyStar;
    }
    return stars.join(" ");
  };

  const fetchTherapists = async (lat, lng) => {
    try {
      const response = await axios.get(`http://localhost:3005/api/therapists`, {
        params: {
          lat: lat,
          lng: lng,
        },
      });
      setTherapists(response.data.results);
      console.log(response.data.results);
    } catch (error) {
      console.error("Error fetching therapists", error);
    }
  };

  if (!center) return <div>Loading...</div>;

  return (
    <Box pt={3} bgcolor="background.default">
      <InfoGrid />
      <Divider />
      <Typography
        variant="h4"
        component="h1"
        gutterBottom
        color="primary.main"
        align="center"
        mt={5}
      >
        Reccomended Therapists
      </Typography>
      <Box
        bgcolor="background.default"
        minHeight="90vh"
        display="flex"
        justifyContent="center"
        //   alignItems="center"
      >
        <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY}>
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={10}
          >
            {therapists.map((therapist) => (
              <Marker
                key={therapist.place_id}
                position={{
                  lat: therapist.geometry.location.lat,
                  lng: therapist.geometry.location.lng,
                }}
                onClick={() => setSelected(therapist)}
              />
            ))}

            {selected && (
              <InfoWindow
                position={{
                  lat: selected.geometry.location.lat,
                  lng: selected.geometry.location.lng,
                }}
                onCloseClick={() => setSelected(null)}
              >
                <div>
                  <h2>{selected.name}</h2>
                  <p>{selected.vicinity}</p>
                  <Typography variant="h6" color="primary.main">
                    Rating: {getStarRating(selected.rating)}
                  </Typography>
                  <Rating value={selected.rating} readOnly precision={0.1} />
                </div>
              </InfoWindow>
            )}
          </GoogleMap>
        </LoadScript>
      </Box>
      <TherapistProfiles />
    </Box>
  );
};

export default TherapistMap;
