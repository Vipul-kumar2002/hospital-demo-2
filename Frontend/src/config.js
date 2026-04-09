const isProduction = import.meta.env.PROD; // Automatically true on Render

export const API_BASE_URL = isProduction
  ? "https://hospital-demo-2.onrender.com" // Live URL
  : "http://localhost:8000";
export const MOCK_PATIENT_URL =
  "https://d4c5cce4-b1af-4f81-852b-edd97f9bf7e7.mock.pstmn.io/patients";
