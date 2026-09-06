import axios from "axios";

const BASEURL = import.meta.env.VITE_API_BASE_URL;

// Event Creation API
export const event = async (formData) => {

  const response = await axios.post(
    `${BASEURL}/api/event`,
    formData,
    {
      withCredentials: true,

      headers: {
        "Content-Type":
          "multipart/form-data",
      },
    }
  );

  return response.data;
};

//get all events API
export const getAllEvents = async () => {

  const response = await axios.get(
    `${BASEURL}/api/event`,
    {
      withCredentials: true,
    }
  );

  return response.data;
};

//delete api
export const deleteEvent = async (eventId) => {

  const response = await axios.delete(
    `${BASEURL}/api/event/${eventId}`,
    {
      withCredentials: true,
    }
  );

  return response.data;
};

//==========================================================================
export const createpass = async (passdata) => {

  const response = await axios.post(
    `${BASEURL}/api/pass`,
    
    passdata, // ✅ send data here

    {
      withCredentials: true,
    }
  );

  return response.data;
};

//get pass
export const getpass = async()=>{
 const response =await axios.get(`${BASEURL}/api/pass`,{
     withCredentials:true,
  });
  return response.data;
};

//delete pass
export const deletepass=async(passid)=>{
 const response =await axios.delete(`${BASEURL}/api/pass/${passid}`,{
    withCredentials:true,
  });
  return response.data;
};

//fetch registered students
export const registeredStd=async()=>{
 const response = await axios.get(`${BASEURL}/api/admin/user`,{
    withCredentials:true,
  });

  return response.data;
};

////==========================================================================
// Get all volunteer requests
export const getVolunteerRequests = async () => {
  const response = await axios.get(
    `${BASEURL}/api/admin/volunteer-requests`,
    { withCredentials: true }
  );
  return response.data;
};

// Approve volunteer
export const makeVolunteer = async (userId) => {
  const response = await axios.put(
    `${BASEURL}/api/admin/user/${userId}/make-volunteer`,
    {},
    { withCredentials: true }
  );
  return response.data;
};

// ✅ Admin logout — only clears admin_token (replace any existing logoutApi)
export const logoutApi = async () => {
  return await axios.post(
    `${BASEURL}/api/login/admin/logout`,
    {},
    { withCredentials: true }
  );
};

// fetch all approved organizers
export const getAllOrganizers = async () => {
  const response = await axios.get(
    `${BASEURL}/api/admin/organizers`,
    { withCredentials: true }
  );
  return response.data;
};

// fetch all approved volunteers
export const getAllVolunteers = async () => {
  const response = await axios.get(
    `${BASEURL}/api/admin/volunteers`,
    { withCredentials: true }
  );
  return response.data;
};

//==========================================================================
// Dashboard APIs

// Completed student profiles count
export const getCompletedStudentsCount = async () => {
  const response = await axios.get(
    `${BASEURL}/api/user/completed-profiles/count`,
    {
      withCredentials: true,
    }
  );

  return response.data;
};

// Total events count
export const getEventsCount = async () => {
  const response = await axios.get(
    `${BASEURL}/api/event/events/count`,
    {
      withCredentials: true,
    }
  );

  return response.data;
};

// Total organizers count
export const getOrganizersCount = async () => {
  const response = await axios.get(
    `${BASEURL}/api/organizer/organizers/count`,
    {
      withCredentials: true,
    }
  );

  return response.data;
};

// Total volunteers count
export const getVolunteersCount = async () => {
  const response = await axios.get(
    `${BASEURL}/api/volunteer/volunteers/count`,
    {
      withCredentials: true,
    }
  );

  return response.data;
};

// Get all bookings
export const getAllBookings = async () => {
  const response = await axios.get(
    `${BASEURL}/api/booking/bookings`,
    {
      withCredentials: true,
    }
  );

  return response.data;
};

// Total revenue
export const getTotalRevenue = async () => {
  const response = await axios.get(
    `${BASEURL}/api/admin/revenue`,
    { withCredentials: true }
  );
  return response.data;
};