import axios from "axios";

const BASEURL = "http://localhost:8080";

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