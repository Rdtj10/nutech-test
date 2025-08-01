import api from "../api";

export const getMe = async () => {
  const res = await api.get("/profile");
  return res.data;
};

export const updateProfile = async (first_name: string, last_name: string) => {
  const res = await api.put("/profile/update", {
    first_name: first_name,
    last_name: last_name,
  });
  return res.data;
};

export const updateProfileImage = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);
  const res = await api.put("/profile/image", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};
