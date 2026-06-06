import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8080",
  withCredentials: true,
});

//register api
export const register = async (data) => {
  try {
    const response = await API.post("/api/register", data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

//login api
export const login = async (data) => {
  try {
    const response = await API.post("/api/login", data);
    console.log("login response:", response.data);  // ← add this
    return response.data;
  } catch (error) {
    throw error;
  }
};
  
//profile update
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

//logout api
export const logoutApi = async () => {
  return await API.post("/api/login/logout");
};

//get loggedin user
export const getProfile = async () => {
  const res = await API.get("/api/login/me");
  return res.data;
};

//get all pass
export const getpass = async () =>{
  const response = await API.get("/api/pass");
  return response.data;
}
//buy-pass
export const buyPass = async (passId) => {
  const response = await API.patch(
    `/api/user/buy-pass/${passId}`
  );

  return response.data;
};

//get all events
export const getallEvents =async()=>{
   const response = await API.get("/api/event");
   return response.data;
}

//Booing api
export const bookingapi = async (eventIds) =>{
   const response = await API.post("/api/booking", eventIds);
   return response.data;
}

//create payment
export const createPayment = async () => {
  const response = await API.post("/api/payment/create");
  return response.data;
};

//verify payment
export const verifyPayment = async (orderId) => {
  const response = await API.get(`/api/payment/payment-success/${orderId}`);
  return response.data; // returns boolean
};

export const downloadTicket = async () => {
  const response = await API.get("/api/ticket/my-ticket", {
    responseType: "blob",  // ← important for PDF
  });

  // create download link
  const url = window.URL.createObjectURL(new Blob([response.data]));
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", "ignitron-ticket.pdf");
  document.body.appendChild(link);
  link.click();
  link.remove();
};

//get my booking
export const getMyBooking = async () => {
  const response = await API.get("/api/booking/my-booking");
  return response.data;
};