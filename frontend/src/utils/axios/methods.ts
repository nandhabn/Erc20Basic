import axios from "axios";

export const instance = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
});

export const getCall = async (uri: string, config?: any) =>
  (await instance.get(uri, config)).data;

export const postCall = async (uri: string, data?: any, config?: any) =>
  (await instance.post(uri, data, config)).data;
