import axios from 'axios';

const API = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/',
});

export const patientsAPI = {
  getAll: (params) => API.get('patients/', { params }),
  get: (id) => API.get(`patients/${id}/`),
  create: (data) => API.post('patients/', data),
  update: (id, data) => API.put(`patients/${id}/`, data),
  delete: (id) => API.delete(`patients/${id}/`),
};

export const observationsAPI = {
  getAll: (params) => API.get('observations/', { params }),
  get: (id) => API.get(`observations/${id}/`),
  create: (data) => API.post('observations/', data),
  update: (id, data) => API.put(`observations/${id}/`, data),
  delete: (id) => API.delete(`observations/${id}/`),
};

export const practitionersAPI = {
  getAll: (params) => API.get('practitioners/', { params }),
  get: (id) => API.get(`practitioners/${id}/`),
  create: (data) => API.post('practitioners/', data),
  update: (id, data) => API.put(`practitioners/${id}/`, data),
  delete: (id) => API.delete(`practitioners/${id}/`),
};

export const encountersAPI = {
  getAll: (params) => API.get('encounters/', { params }),
  get: (id) => API.get(`encounters/${id}/`),
  create: (data) => API.post('encounters/', data),
  update: (id, data) => API.put(`encounters/${id}/`, data),
  delete: (id) => API.delete(`encounters/${id}/`),
};

export const conditionsAPI = {
  getAll: (params) => API.get('conditions/', { params }),
  get: (id) => API.get(`conditions/${id}/`),
  create: (data) => API.post('conditions/', data),
  update: (id, data) => API.put(`conditions/${id}/`, data),
  delete: (id) => API.delete(`conditions/${id}/`),
};

export const proceduresAPI = {
  getAll: (params) => API.get('procedures/', { params }),
  get: (id) => API.get(`procedures/${id}/`),
  create: (data) => API.post('procedures/', data),
  update: (id, data) => API.put(`procedures/${id}/`, data),
  delete: (id) => API.delete(`procedures/${id}/`),
};

export const medicationsAPI = {
  getAll: (params) => API.get('medications/', { params }),
  get: (id) => API.get(`medications/${id}/`),
  create: (data) => API.post('medications/', data),
  update: (id, data) => API.put(`medications/${id}/`, data),
  delete: (id) => API.delete(`medications/${id}/`),
};

export const medicationRequestsAPI = {
  getAll: (params) => API.get('medication-requests/', { params }),
  get: (id) => API.get(`medication-requests/${id}/`),
  create: (data) => API.post('medication-requests/', data),
  update: (id, data) => API.put(`medication-requests/${id}/`, data),
  delete: (id) => API.delete(`medication-requests/${id}/`),
};

export const allergiesAPI = {
  getAll: (params) => API.get('allergies/', { params }),
  get: (id) => API.get(`allergies/${id}/`),
  create: (data) => API.post('allergies/', data),
  update: (id, data) => API.put(`allergies/${id}/`, data),
  delete: (id) => API.delete(`allergies/${id}/`),
};

export const immunizationsAPI = {
  getAll: (params) => API.get('immunizations/', { params }),
  get: (id) => API.get(`immunizations/${id}/`),
  create: (data) => API.post('immunizations/', data),
  update: (id, data) => API.put(`immunizations/${id}/`, data),
  delete: (id) => API.delete(`immunizations/${id}/`),
};

export const carePlansAPI = {
  getAll: (params) => API.get('careplans/', { params }),
  get: (id) => API.get(`careplans/${id}/`),
  create: (data) => API.post('careplans/', data),
  update: (id, data) => API.put(`careplans/${id}/`, data),
  delete: (id) => API.delete(`careplans/${id}/`),
};

export const diagnosticReportsAPI = {
  getAll: (params) => API.get('diagnostic-reports/', { params }),
  get: (id) => API.get(`diagnostic-reports/${id}/`),
  create: (data) => API.post('diagnostic-reports/', data),
  update: (id, data) => API.put(`diagnostic-reports/${id}/`, data),
  delete: (id) => API.delete(`diagnostic-reports/${id}/`),
};

export default API;
