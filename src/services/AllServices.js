import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
});



API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      error.response?.status === 401 &&
      error.config?.url !== "/api/login"
    ) {
      localStorage.removeItem("ignitron-app-state-v1");
       window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

// register api
export const register = async (data) => {
  try {
    const response = await API.post("/api/register", data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// login api
export const login = async (data) => {
  try {
    const response = await API.post("/api/login", data);
    console.log("login response:", response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// profile update
export const profileupdate = async (profiledata, file) => {
  try {
    const formData = new FormData();
    formData.append("user", JSON.stringify(profiledata));
    if (file) {
      formData.append("file", file);
    }
    const response = await API.post("/api/user", formData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const logoutApi = async () => {
  return await API.post("/api/login/user/logout");
};

// get loggedin user
export const getProfile = async () => {
  const res = await API.get("/api/login/user/me");
  return res.data;
};

// get all pass
export const getpass = async () => {
  const response = await API.get("/api/pass");
  return response.data;
};

// buy-pass
export const buyPass = async (passId) => {
  const response = await API.patch(`/api/user/buy-pass/${passId}`);
  return response.data;
};

// get all events
export const getallEvents = async () => {
  const response = await API.get("/api/event");
  return response.data;
};

// booking api
export const bookingapi = async (eventIds) => {
  const response = await API.post("/api/booking", eventIds);
  return response.data;
};

// create payment
export const createPayment = async () => {
  const response = await API.post("/api/payment/create");
  return response.data;
};

// In AllServices.js — make sure verifyPayment calls correct URL
export const verifyPayment = async (orderId) => {
    const res = await API.get(`/api/payment/payment-success?orderId=${orderId}`);
    return res.data;
};


// download ticket
export const downloadTicket = async () => {
  const response = await API.get("/api/ticket/my-ticket", {
    responseType: "blob",
  });
  const url = window.URL.createObjectURL(new Blob([response.data]));
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", "ignitron-ticket.pdf");
  document.body.appendChild(link);
  link.click();
  link.remove();
};

// get my booking
export const getMyBooking = async () => {
  const response = await API.get("/api/booking/my-booking");
  return response.data;
};

// request organizer  ← NEW
export const requestOrganizerApi = async () => {
  const response = await API.post("/api/user/request-organizer");
  return response.data;
};

// request volunteer  ← NEW
export const requestVolunteerApi = async () => {
  const response = await API.post("/api/user/request-volunteer");
  return response.data;
};

// AI RAG query (Axios version)
export const askIgnitronAI = async (question) => {
  const response = await API.get("/ai/generate", {
    params: {
      userprompt: question,
    },
  });

  return response.data;
};

// verify email
export const verifyEmail = async (token) => {
  const response = await API.get(`/api/register/verify-email?token=${token}`);
  return response.data;
};