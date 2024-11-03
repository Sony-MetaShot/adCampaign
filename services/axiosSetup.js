
import axios from 'axios';

const environment = process.env.NODE_ENV === "development";
const apiClient = axios.create({
  // baseURL: 'http://localhost:8000',
  baseURL: environment?"http://localhost:8000":'https://metashot-backend.azurewebsites.net', // base URL for api
  // baseUrl:'http://localhost:8000',
  headers: {
    'Content-Type': 'application/json',
  },
});
//random change jsut for namesake

apiClient.interceptors.request.use(
  (config) => {
    // Add token to headers if available
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 401) {

      router.push('/');
    }
    return Promise.reject(error);
  }
);
apiClient.defaults.withCredentials = true;
export default apiClient;
