// src/services/api.js
import axios from "axios";

const API_URL = "http://localhost:5000/api";

export const api = {
  getForms: () => axios.get(`${API_URL}/forms`),
  getForm: (id) => axios.get(`${API_URL}/forms/${id}`),
  createForm: (data) => axios.post(`${API_URL}/forms`, data),
  updateForm: (id, data) => axios.put(`${API_URL}/forms/${id}`, data),
  deleteForm: (id) => axios.delete(`${API_URL}/forms/${id}`),
  submitForm: (id, data) => axios.post(`${API_URL}/forms/${id}/submit`, data),
};
