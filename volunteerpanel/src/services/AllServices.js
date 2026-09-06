import axios from "axios";

const BASEURL = import.meta.env.VITE_API_BASE_URL;

export const registeredStd = async () => {
  const response = await axios.get(`${BASEURL}/api/volunteer`, {
    withCredentials: true,
  });
  return response.data;
};

export const getVolunteerProfile = async () => {
  const response = await axios.get(`${BASEURL}/api/volunteer/profile`, {
    withCredentials: true,
  });
  return response.data;
};

// Total Volunteers
export const getVolunteerCount = async () => {
  const response = await axios.get(
    `${BASEURL}/api/volunteer/volunteers/count`,
    {
      withCredentials: true,
    }
  );
  return response.data;
};

// Completed Profiles
export const getCompletedProfilesCount = async () => {
  const response = await axios.get(
    `${BASEURL}/api/volunteer/completed-profiles/count`,
    {
      withCredentials: true,
    }
  );
  return response.data;
};