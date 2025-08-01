import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import InputField from "../atoms/InputField";
import { Icon } from "@iconify/react";
import Button from "../atoms/Button";
import { loginSchema, type ILoginForm } from "../../service/schema/auth";
import { login } from "../../service/action/auth";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { BeatLoader } from "react-spinners";
import { useDispatch } from "react-redux";
import { setToken } from "../../service/store/authSlice";

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginForm>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: ILoginForm) => {
    try {
      setIsLoading(true);
      const res = await login(data);
      if (res.status === 0) {
        localStorage.setItem("token", res.data.token);
        alert("Login sukses!");
        dispatch(setToken(res.data.token));
        navigate("/");
      } else {
        alert(res.message);
      }
    } catch (err) {
      setIsLoading(false);
      alert("Login gagal.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-md w-full flex flex-col gap-8 text-center items-center justify-center"
    >
      <div className="flex justify-center gap-2 w-fit">
        <img src="/assets/Logo.png" alt="Logo" className="w-6 mx-auto" />
        <h2 className="font-semibold">SIMS PPOB</h2>
      </div>
      <h2 className="text-4xl font-semibold text-center">
        Masuk atau buat akun untuk memulai
      </h2>
      <div className="w-full">
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <InputField
              name={field.name}
              placeholder="masukan email anda"
              value={field.value}
              onChange={field.onChange}
              error={errors.email?.message}
              icon={<Icon icon="material-symbols:alternate-email" />}
            />
          )}
        />

        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <InputField
              type="password"
              name={field.name}
              placeholder="masukan password anda"
              value={field.value}
              onChange={field.onChange}
              error={errors.password?.message}
              icon={<Icon icon="material-symbols:lock-outline" />}
            />
          )}
        />
      </div>

      <Button
        type="submit"
        variant="default"
        className="w-full"
        disabled={isLoading}
      >
        {isLoading ? <BeatLoader /> : "Masuk"}
      </Button>

      <p className="text-sm">
        belum punya akun? registrasi{" "}
        <a
          href="/auth/register"
          className="text-red-600 font-medium hover:underline"
        >
          di sini
        </a>
      </p>
    </form>
  );
};

export default LoginForm;
