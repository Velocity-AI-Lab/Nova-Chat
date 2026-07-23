import axios from "axios";

// get the base url from env
const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";

//   now write the asynv function with message and convo id params
export const sendMessage = async (message: string, conversationId?: string) => {
  try {
    // call the api
    const response = await axios.post(`${API_BASE}/api/v1/chat`, {
      message,
      conversationId,
    });
    // return the response data
    return response?.data?.data;
  } catch (error) {
    // throw error if the response doesn't exist
    throw error;
  }
};
