import axios, { AxiosInstance } from 'axios';
import { getAuth, User } from 'firebase/auth';

export const IS_PRODUCTION = 'sandbox';
export const BASE_URL = `http://${window.location.hostname}:3000/api`;

const CLIENT_TIMEOUT_DEV = 300000;

const apiInstance: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: CLIENT_TIMEOUT_DEV,
});

apiInstance.interceptors.request.use((config) => {
  const auth = getAuth();
  const user: User | null = auth.currentUser;

  if (user) {
    config.headers.Authorization = `Bearer ${user.getIdToken()}`;
  }

  return config;
});

export const api: AxiosInstance = apiInstance;
