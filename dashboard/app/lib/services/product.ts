import axios, { AxiosInstance } from 'axios';

export const productHttpService: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API,
});
