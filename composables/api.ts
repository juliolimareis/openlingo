import axios from "axios";

export const useApi = () => {
  const instance = axios.create({ baseURL: "http://localhost:3001" });

  return instance;
};

// export const useApiAddress = () => {
//   const instance = axios.create({ baseURL: process.env.API_ADDRESS });

//   return instance;
// };

// export const useApiAuthentication = () => {
//   const instance = axios.create({ baseURL: process.env.API_AUTHENTICATION });

//   return instance;
// };
