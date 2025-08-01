import api from "../api";

export const getAllServices = async () => {
  const res = await api.get("/services");
  return res.data;
};

export const getAllBanners = async () => {
  const res = await api.get("/banner");
  return res.data;
};
