import axios from "axios";

/* ================= AXIOS INSTANCE ================= */
const API = axios.create({
  baseURL: "http://localhost:5000",
});

/* ================= REQUEST INTERCEPTOR ================= */
API.interceptors.request.use(
  (req) => {
    const token = localStorage.getItem("token");

    if (token) {
      req.headers.Authorization = `Bearer ${token}`;
    }

    return req;
  },
  (error) => Promise.reject(error)
);

/* ================= RESPONSE INTERCEPTOR ================= */
/* Auto logout if token expired */
API.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response && error.response.status === 401) {
      console.log("🔒 Session expired");

      localStorage.removeItem("token");
      localStorage.removeItem("premium");

      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

export default API;
