import axios from "axios";
export const login = (data) => {
  return axios.post("/login", data);
};
