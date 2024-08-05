import { Box, Typography } from "@mui/material";
import React, { useEffect } from "react";

const SpotifyPlayer = () => {
  useEffect(() => {
    const token = localStorage.getItem("spotifyToken");
    if (!token) return;

    // Load Spotify Web Playback SDK script
    const script = document.createElement("script");
    script.src = "https://sdk.scdn.co/spotify-player.js";
    script.onload = () => {
      console.log("Spotify SDK script loaded");
      if (window.Spotify) {
        console.log("Spotify SDK is available");
      }
      window.onSpotifyWebPlaybackSDKReady = () => {
        console.log("Spotify SDK ready");
        const player = new window.Spotify.Player({
          name: "My Web Playback SDK Player",
          getOAuthToken: (cb) => cb(token),
          volume: 0.5,
        });

        // Error handling
        player.addListener("initialization_error", ({ message }) =>
          console.error("Initialization Error:", message)
        );
        player.addListener("authentication_error", ({ message }) =>
          console.error("Authentication Error:", message)
        );
        player.addListener("account_error", ({ message }) =>
          console.error("Account Error:", message)
        );
        player.addListener("playback_error", ({ message }) =>
          console.error("Playback Error:", message)
        );

        // Playback status updates
        player.addListener("player_state_changed", (state) =>
          console.log("Player State Changed:", state)
        );

        // Ready
        player.addListener("ready", ({ device_id }) => {
          console.log("Ready:", device_id);
          player.activateElement().then(() => {
            console.log("Playback ready");
          });
        });

        // Not Ready
        player.addListener("not_ready", ({ device_id }) => {
          console.log("Device has gone offline:", device_id);
        });

        // Error: Failed to get access token
        player.addListener("error", ({ message }) =>
          console.error("Player Error:", message)
        );
        player.connect();
      };
    };

    document.body.appendChild(script);

    return () => {
      // Clean up the script when component unmounts
      document.body.removeChild(script);
    };
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        backgroundColor: "white",
        padding: 3,
      }}
    >
      <Typography color="primary.main">Spotify Player</Typography>
    </Box>
  );
};

export default SpotifyPlayer;
