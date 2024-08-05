import React, { useRef, useState } from "react";
import { Box, Fab, CircularProgress } from "@mui/material";
import ReactPlayer from "react-player/lazy";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import StopIcon from "@mui/icons-material/Stop";

const Music = () => {
  // List of SoundCloud URLs
  const urls = [
    // "https://soundcloud.com/electronicmusicproject/rain-pt-2-paul-landry?utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing",
    // "https://soundcloud.com/electronicmusicproject/nirvarna-on-olympus-mons-paul-landry?utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing",
    // "https://soundcloud.com/newagemusicgarden/oslo?utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing",
    // "https://soundcloud.com/electronicmusicproject/cataclysm?utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing",
    "https://www.youtube.com/live/M1l6qMc_a9g?si=5iYo-Pz8C6oVmy54",
    "https://www.youtube.com/live/VVvptFJiyEg?si=6eih3nZLcPKR21F_",
    "https://youtu.be/vBtlMwiOas4?si=VP0gRXU0ub3p7dVE",
    "https://youtu.be/UDVtMYqUAyw?si=K7oRyI9pPsdVvtFI",
    "https://youtu.be/QJHPlKPOc78?si=GRAd6DOdpfqPJDY8",
    "https://youtu.be/ZyvzJfcKyTI?si=ye1pvwfIH3zU5ReL",
    "https://youtu.be/Os47nMrjw_Y?si=cakLTmZEeMdkc4cq",
    "https://youtu.be/U44qKaKpAMk?si=dACQBsgyWoYSaSL2",
    "https://youtu.be/SsBNDryJYSs?si=4OjYlEYs1P4dHkhL",
    // Add more URLs as needed
  ];

  const [currentUrl, setCurrentUrl] = useState(urls[0]);
  const [playing, setPlaying] = useState(false); // Track playing state
  const [loading, setLoading] = useState(false); // Loading state
  const playerRef = useRef(null);

  const getRandomUrl = () => {
    const randomIndex = Math.floor(Math.random() * urls.length);
    return urls[randomIndex];
  };

  const handlePlayStop = () => {
    const token = localStorage.getItem("token");
    if (token) {
      if (playing) {
        setPlaying(false);
        const newUrl = getRandomUrl();
        setCurrentUrl(newUrl);

        setLoading(false);
      } else {
        // Start playback
        setLoading(true); // Show loading animation
        const newUrl = getRandomUrl();
        setCurrentUrl(newUrl);
        setPlaying(true); // Start playback
      }
    }
  };

  const handlePlaying = () => {
    if (playing) {
      setLoading(false);
    }
  };
  const handleReady = () => {
    if (!playing) {
      setLoading(false);
    } // Hide loading animation when player is ready
  };

  return (
    <>
      <ReactPlayer
        ref={playerRef}
        url={currentUrl}
        playing={playing}
        controls={false} // Hide default controls
        width="0" // Hide player
        height="0" // Hide player
        onPlay={handlePlaying}
        onReady={handleReady} // Handle track readiness
      />
      <Fab
        color="primary"
        aria-label={playing ? "stop" : "play"}
        onClick={handlePlayStop}
        disabled={loading} // Disable button while loading
        sx={{
          position: "fixed",
          bottom: "90px",
          right: "20px",
        }}
      >
        {loading ? (
          <CircularProgress size={24} />
        ) : playing ? (
          <StopIcon />
        ) : (
          <PlayArrowIcon />
        )}
      </Fab>
    </>
  );
};

export default Music;
