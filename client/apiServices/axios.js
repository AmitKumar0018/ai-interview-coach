import axios from "axios";

const api = axios.create({
  baseURL: "https://ai-interview-coach-pi-eosin.vercel.app",
  withCredentials: true,
});

export default api;
