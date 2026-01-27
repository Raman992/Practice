import axios from "axios";

const api = axios.create({
  baseURL: "https://shop-api.hyhimal.com/gateway/auth/api/Login",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export default api;
