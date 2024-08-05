// In your React component
import { Box } from "@mui/material";
import React from "react";

const SPOTIFY_AUTH_URL = "https://accounts.spotify.com/authorize";
const CLIENT_ID = "0b72b3661a944efe8e4ef62095695820";
const REDIRECT_URI = "http://localhost:3000/callback";
const SCOPES = "streaming user-read-email user-read-private";

const Login = () => {
  const handleLogin = () => {
    window.location.href = `${SPOTIFY_AUTH_URL}?response_type=token&client_id=${CLIENT_ID}&scope=${encodeURIComponent(
      SCOPES
    )}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}`;
  };

  return (
    <Box mt={20}>
      <button onClick={handleLogin}>Login with Spotify</button>
    </Box>
  );
};

export default Login;
