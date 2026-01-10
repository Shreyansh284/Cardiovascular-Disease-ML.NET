import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5218";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const predictHeartDisease = async (data) => {
  try {
    // Data should match PatientInput DTO in Backend
    // { AgeYears, Gender, Height, Weight, ApHi, ApLo, Cholesterol, Gluc, Smoke, Alco, Active }
    const response = await api.post("/Predict", data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default api;
