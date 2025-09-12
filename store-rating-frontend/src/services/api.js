import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api', // backend base URL
});

// helper to set token in headers
export const setToken = (token) => {
  if (token) {
    API.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete API.defaults.headers.common['Authorization'];
  }
};

export default API;
