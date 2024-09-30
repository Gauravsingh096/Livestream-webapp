import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

export const createOverlay = async (overlayData) => {
  return axios.post(`${API_BASE_URL}/overlay`, overlayData);
};

export const getOverlays = async () => {
  return axios.get(`${API_BASE_URL}/overlay`);
};

export const updateOverlay = async (id, overlayData) => {
  return axios.put(`${API_BASE_URL}/overlay/${id}`, overlayData);
};

export const deleteOverlay = async (id) => {
  return axios.delete(`${API_BASE_URL}/overlay/${id}`);
};
