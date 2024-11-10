// src/api/posts.js
import axios from "axios";

const API_URL = "http://localhost:3333"; // Replace with your actual API base URL
// const token = localStorage.getItem("token");
// const cleanedToken = token.replace(/^"|"$/g, "");
export const postsApi = {
  getPosts: async (page = 1, limit = 50) => {
    const response = await axios.get(`${API_URL}/get-post`, {
      params: { page, limit },
      withCredentials: true,
    });

    return response.data;
  },

  getPostsByUserId: async (page = 1, limit = 50, userId) => {
    console.log("userId", userId);
    const response = await axios.get(`${API_URL}/get-post-user`, {
      params: { page, limit, userId },
      withCredentials: true,
    });

    return response.data;
  },

  createPost: async (postData) => {
    const response = await axios.post(`${API_URL}/create-post`, postData, {
      withCredentials: true,
    });
    return response.data;
  },

  updatePost: async (postData) => {
    const response = await axios.post(`${API_URL}/update-post`, postData, {
      withCredentials: true,
    });
    return response.data;
  },

  updatePostVisibility: async (postData) => {
    const response = await axios.post(`${API_URL}/post-visibility`, postData, {
      withCredentials: true,
    });
    return response.data;
  },

  deletePost: async (postData) => {
    console.log("postData", postData);
    const response = await axios.post(`${API_URL}/delete-post`, postData, {
      withCredentials: true,
    });
    return response.data;
  },

  reactToPost: async (reactData) => {
    const response = await axios.post(`${API_URL}/post-react`, reactData, {
      withCredentials: true,
    });
    return response.data;
  },

  // Comment APIs
  createComment: async (commentData) => {
    const response = await axios.post(
      `${API_URL}/create-comment`,
      commentData,
      {
        withCredentials: true,
      }
    );
    return response.data;
  },

  getComments: async (postId) => {
    const response = await axios.get(`${API_URL}/get-comment`, {
      params: { postId },
    });
    return response.data;
  },

  updateComment: async (commentData) => {
    const response = await axios.post(`${API_URL}/update-comment`, commentData);
    return response.data;
  },

  deleteComment: async (commentData) => {
    const response = await axios.delete(`${API_URL}/delete-comment`, {
      data: commentData,
    });
    return response.data;
  },

  reactToComment: async (reactData) => {
    const response = await axios.post(`${API_URL}/comment-react`, reactData, {
      withCredentials: true,
    });
    return response.data;
  },

  // Reply APIs
  createReply: async (replyData) => {
    const response = await axios.post(`${API_URL}/create-reply`, replyData, {
      withCredentials: true,
    });
    return response.data;
  },

  getReplies: async (commentId, prevPage = 1) => {
    const response = await axios.get(`${API_URL}/get-replies`, {
      params: { commentId, prevPage },
    });
    return response.data;
  },

  updateReply: async (replyData) => {
    const response = await axios.post(`${API_URL}/update-reply`, replyData);
    return response.data;
  },

  deleteReply: async (replyData) => {
    const response = await axios.delete(`${API_URL}/delete-reply`, {
      data: replyData,
    });
    return response.data;
  },

  reactToReply: async (reactData) => {
    const response = await axios.post(`${API_URL}/reply-react`, reactData, {
      withCredentials: true,
    });
    return response.data;
  },
};
