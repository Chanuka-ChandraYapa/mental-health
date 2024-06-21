// src/services/questionnaireService.js
import axios from "axios";

const API_URL = "https://mental-health-mood-tracker.onrender.com/api"; // Update with your backend URL

export const saveAnswers = async (answers) => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No token found");

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await axios.post(
      `${API_URL}/answers`,
      { answers },
      config
    );
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const getAnswers = async () => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No token found");

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await axios.get(`${API_URL}/answers`, config);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
