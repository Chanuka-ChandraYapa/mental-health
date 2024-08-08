import axios from "axios";
import config from "../config"; // Import your config file where the base URL is defined

const checkToken = async () => {
  const token = localStorage.getItem("token"); // Assuming the token is stored in localStorage

  if (!token) {
    console.log("No token found");
    return false;
  }

  try {
    const response = await axios.get(`${config.backend}/api/users/checkToken`, {
      headers: {
        "x-auth-token": token,
      },
    });
    return response.data.valid;
  } catch (error) {
    console.error("Error checking token:", error);
    return false;
  }
};

export default checkToken;
