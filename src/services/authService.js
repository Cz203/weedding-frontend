import axios from "axios";
export const login = (data) => {
  return axios.port("/login", data);
};
