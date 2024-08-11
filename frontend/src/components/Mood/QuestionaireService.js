// src/services/questionnaireService.js
import axios from "axios";
import config from "../../config";

const API_URL = `${config.moodtracker}`; // Update with your backend URL

export const saveAnswers = async (answers, rating) => {
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
      { answers, rating },
      config
    );
    localStorage.removeItem("recommondations");
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
