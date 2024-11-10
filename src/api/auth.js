// src/api/auth.js
import axios from "axios";

const API_URL = "http://localhost:3333"; // Replace with your actual API base URL

export const authApi = {
  register: async (credentials) => {
    const response = await axios.post(`${API_URL}/user/register`, credentials);
    return response.data;
  },

  login: async (credentials) => {
    const response = await axios.post(`${API_URL}/user/login`, credentials, {
      withCredentials: true,
    });
    return response.data;
  },

  logout: async () => {
    const response = await axios.post(
      `${API_URL}/user/logout`,
      {},
      {
        withCredentials: true,
      }
    );
    return response.data;
  },

  // logout: async () => {
  //   const response = await axios.get(`${API_URL}/user`, {
  //     withCredentials: true,
  //   });
  //   return response.data;
  // },

  getUser: async () => {
    const response = await axios.get(`${API_URL}/user`);
    return response.data;
  },
};
