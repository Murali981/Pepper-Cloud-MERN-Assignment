import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export const api = {
  getForms: () => axios.get(`${API_URL}/api/forms`),
  getForm: (id) => axios.get(`${API_URL}/api/forms/${id}`),
  createForm: (data) => axios.post(`${API_URL}/api/forms`, data),
  updateForm: (id, data) => axios.put(`${API_URL}/api/forms/${id}`, data),
  deleteForm: (id) => axios.delete(`${API_URL}/api/forms/${id}`),
  submitForm: (id, data) =>
    axios.post(`${API_URL}/api/forms/${id}/submit`, data),
};
