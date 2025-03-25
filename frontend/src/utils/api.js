// utils/api.js
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/community'; 

// Function to create a post
export const createPost = (content, mediaUrl, isAnonymous) => {
  return axios.post(`${API_URL}/post`, { content, mediaUrl, isAnonymous });
};

// Function to like a post
export const likePost = (postId) => {
  return axios.post(`${API_URL}/post/${postId}/like`);
};

// Function to comment on a post
export const commentOnPost = (postId, commentText) => {
  return axios.post(`${API_URL}/post/${postId}/comment`, { commentText });
};

// Function to share a post
export const sharePost = (postId) => {
  return axios.post(`${API_URL}/post/${postId}/share`);
};

// Function to follow a channel
export const followChannel = (channelId) => {
  return axios.post(`${API_URL}/channel/${channelId}/follow`);
};

// Function to unfollow a channel
export const unfollowChannel = (channelId) => {
  return axios.delete(`${API_URL}/channel/${channelId}/unfollow`);
};

// Function to create a channel
export const createChannel = (channelName, description) => {
  return axios.post(`${API_URL}/channel`, { channelName, description });
};

// Function to get followed channels
export const getFollowedChannels = () => {
  return axios.get(`${API_URL}/user/followed-channels`);
};
