import axios from "axios";

const BASEURL = import.meta.env.VITE_API_BASE_URL;

//fetch registered students
export const registeredStd=async()=>{
 const response = await axios.get(`${BASEURL}/api/organizer`,{
    withCredentials:true,
  });

  return response.data;
};


// Save attendance
export const saveAttendance = async (data) => {
  const response = await axios.post(`${BASEURL}/api/attendance`, data, {
    withCredentials: true,
  });
  return response.data;
};

//ticket verify
export const verifyTicket = async (ticketId) => {
  const response = await axios.get(
    `${BASEURL}/api/organizer/verify/${ticketId}`,
    { withCredentials: true }
  );
  return response.data;
};

//profile
export const getOrganizerProfile = async () => {
  const response = await axios.get(`${BASEURL}/api/organizer/profile`, {
    withCredentials: true,
  });
  return response.data;
};

export const getOrganizerCount = async () => {
  const response = await axios.get(
    `${BASEURL}/api/organizer/organizers/count`,
    { withCredentials: true }
  );
  return response.data;
};

export const getVolunteerCount = async () => {
  const response = await axios.get(
    `${BASEURL}/api/organizer/volunteers/count`,
    { withCredentials: true }
  );
  return response.data;
};

export const getCompletedProfilesCount = async () => {
  const response = await axios.get(
    `${BASEURL}/api/organizer/completed-profiles/count`,
    { withCredentials: true }
  );
  return response.data;
};

export const getAttendanceCount = async () => {
  const response = await axios.get(
    `${BASEURL}/api/organizer/attendance/count`,
    { withCredentials: true }
  );
  return response.data;
};

// get all attendance
export const getAllAttendance = async () => {
  const response = await axios.get(
    `${BASEURL}/api/organizer/getting-all-attendance`,
    {
      withCredentials: true,
    }
  );

  return response.data;
};