import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

export default function AuthLayout() {
  const token = useSelector((state: any) => state.auth.token);

  return !token ? (
    <div>
      <Outlet />
    </div>
  ) : (
    <Navigate to="/" replace />
  );
}
