import axios from "axios";

export const useApi = (token?: string) => axios.create({
  baseURL: "http://localhost:3000/api/v1",
  headers: { Authorization: !!(process.client) ? `Bearer ${localStorage.token}` : "" }
});