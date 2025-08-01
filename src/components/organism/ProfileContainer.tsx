// src/components/pages/ProfilePage.tsx
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import InputField from "../atoms/InputField";
import Button from "../atoms/Button";
import {
  updateProfile,
  updateProfileImage,
} from "../../service/action/profile";
import { setToken } from "../../service/store/authSlice";
import { setUser } from "../../service/store/userSlice";
import {
  UpdateProfileSchema,
  type IUpdateProfileSchema,
} from "../../service/schema/profile";

const ProfilePage: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { profile: user } = useSelector((state: any) => state.user);

  const [isEditing, setIsEditing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [profileImage, setProfileImage] = useState(user?.profile_image || "");

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IUpdateProfileSchema>({
    resolver: zodResolver(UpdateProfileSchema),
    defaultValues: {
      first_name: user.first_name,
      last_name: user.last_name,
    },
  });

  useEffect(() => {
    reset({
      first_name: user.first_name,
      last_name: user.last_name,
    });
    setProfileImage(user.profile_image);
  }, [user, reset]);

  const onSubmit = async (data: IUpdateProfileSchema) => {
    try {
      const res = await updateProfile(data.first_name, data.last_name);
      if (res.status === 0) {
        dispatch(setUser({ ...user, ...data }));
        setIsEditing(false);
      } else {
        alert(res.message);
      }
    } catch (error) {
      alert("Gagal memperbarui profil.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(setToken(null));
    dispatch(setUser(null));
    navigate("/auth/login", { replace: true });
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result?.toString();
        setProfileImage(base64 || "");
      };
      reader.readAsDataURL(file);

      try {
        const res = await updateProfileImage(file);
        if (res.status === 0) {
          dispatch(setUser({ ...user, profile_image: res.data.profile_image }));
        } else {
          alert(res.message || "Gagal upload foto.");
        }
      } catch (err) {
        alert("Terjadi kesalahan saat upload foto.");
        console.error(err);
      }
    }
  };

  return (
    <div className="w-full max-w-md mx-auto mt-10 text-center">
      <div className="relative w-24 h-24 mx-auto mb-4">
        <img
          src={
            !profileImage || profileImage.includes("null")
              ? "/assets/Profile Photo.png"
              : profileImage
          }
          alt="Avatar"
          className="w-24 h-24 rounded-full border object-cover"
        />
        <button
          onClick={() => fileInputRef.current?.click()}
          className="absolute right-0 bottom-0 bg-white border rounded-full p-1"
        >
          <Icon icon="mdi:pencil" width="24" height="24" />
        </button>

        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleFileUpload}
          style={{ display: "none" }} // agar tidak terlihat
        />
      </div>

      <h2 className="text-xl font-semibold mb-6">
        {user.first_name} {user.last_name}
      </h2>

      <div className="space-y-3">
        <InputField
          name="email"
          value={user.email}
          disabled
          icon={<Icon icon="material-symbols:alternate-email" />}
        />

        <Controller
          name="first_name"
          control={control}
          render={({ field }) => (
            <InputField
              {...field}
              placeholder="Nama Depan"
              icon={<Icon icon="mdi:user" />}
              error={errors.first_name?.message}
              disabled={!isEditing}
            />
          )}
        />

        <Controller
          name="last_name"
          control={control}
          render={({ field }) => (
            <InputField
              {...field}
              placeholder="Nama Belakang"
              icon={<Icon icon="mdi:user" />}
              error={errors.last_name?.message}
              disabled={!isEditing}
            />
          )}
        />
      </div>

      <Button
        onClick={isEditing ? handleSubmit(onSubmit) : () => setIsEditing(true)}
        className={`w-full py-2 border rounded mt-4 ${
          isEditing ? "border-red-500 text-red-500" : "border-gray-400"
        }`}
        variant="outline"
      >
        {isEditing ? "Simpan Perubahan" : "Edit Profile"}
      </Button>

      <Button onClick={handleLogout} className="w-full mt-4">
        Log Out
      </Button>
    </div>
  );
};

export default ProfilePage;
