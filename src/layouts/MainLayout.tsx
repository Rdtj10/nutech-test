import { Navigate, Outlet, useNavigate } from "react-router-dom";
import HeadBar from "../components/molecules/HeadBar";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getMe } from "../service/action/profile";
import { setUser } from "../service/store/userSlice";
import { setToken } from "../service/store/authSlice";

export default function MainLayout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector((state: any) => state.auth.token);

  useEffect(() => {
    if (token) {
      dispatch({ type: "user/setLoading", payload: true });
      getMe()
        .then((res) => {
          dispatch(setUser(res.data));
        })
        .catch((err) => {
          console.error("Gagal fetch /me", err);
          dispatch(setToken(null));
          dispatch(setUser(null));
          localStorage.removeItem("token");
          dispatch({ type: "user/setLoading", payload: false });
          navigate("/auth/login", { replace: true });
        });
    }
  }, [token, dispatch, navigate]);

  return token ? (
    <div className="min-h-screen w-full">
      <HeadBar />
      <main className="w-full px-36 py-4">
        <Outlet />
      </main>
    </div>
  ) : (
    <Navigate to="/auth/login" replace />
  );
}
