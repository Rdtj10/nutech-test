import api from "../api";

export const login = async (data: any) => {
  const res = await api.post("/login", data);
  return res.data;
};

export const register = async (data: any) => {
  const res = await api.post("/registration", data);
  return res.data;
};
