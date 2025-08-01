// src/components/molecules/RegisterForm.tsx
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { type RegisterSchema, registerSchema } from "../../service/schema/auth";
import InputField from "../atoms/InputField";
import { Icon } from "@iconify/react";
import Button from "../atoms/Button";
import { register } from "../../service/action/auth";
import { useNavigate } from "react-router-dom";

const RegisterForm = () => {
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      first_name: "",
      last_name: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: RegisterSchema) => {
    try {
      const res = await register(data);
      if (res.status === 0) {
        alert("Registrasi selesai! silahkan lakukan login");
        navigate("/auth/login");
      } else {
        alert(res.message);
      }
    } catch (err) {
      alert("Registrasi gagal.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-md w-full flex flex-col text-center items-center justify-center"
    >
      <div className="flex justify-center gap-2 w-fit">
        <img src="/assets/Logo.png" alt="Logo" className="w-6 mx-auto mb-4" />
        <h2 className="font-semibold">SIMS PPOB</h2>
      </div>
      <h2 className="text-4xl font-semibold mb-6 text-center">
        Lengkapi data untuk membuat akun
      </h2>

      <div className="w-full space-y-3">
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <InputField
              {...field}
              placeholder="masukan email anda"
              icon={<Icon icon="material-symbols:alternate-email" />}
              error={errors.email?.message}
            />
          )}
        />
        <Controller
          name="first_name"
          control={control}
          render={({ field }) => (
            <InputField
              {...field}
              placeholder="nama depan"
              icon={<Icon icon="mdi:user" />}
              error={errors.first_name?.message}
            />
          )}
        />
        <Controller
          name="last_name"
          control={control}
          render={({ field }) => (
            <InputField
              {...field}
              placeholder="nama belakang"
              icon={<Icon icon="mdi:user" />}
              error={errors.last_name?.message}
            />
          )}
        />
        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <InputField
              {...field}
              placeholder="buat password"
              type="password"
              icon={<Icon icon="material-symbols:lock-outline" />}
              error={errors.password?.message}
            />
          )}
        />
        <Controller
          name="confirmPassword"
          control={control}
          render={({ field }) => (
            <InputField
              {...field}
              placeholder="konfirmasi password"
              type="password"
              icon={<Icon icon="material-symbols:lock-outline" />}
              error={errors.confirmPassword?.message}
            />
          )}
        />
      </div>

      <Button type="submit" variant="default" className="w-full mt-8">
        Registrasi
      </Button>

      <p className="text-sm mt-4">
        sudah punya akun? login{" "}
        <a
          href="/auth/login"
          className="text-red-600 font-medium hover:underline"
        >
          di sini
        </a>
      </p>
    </form>
  );
};

export default RegisterForm;
