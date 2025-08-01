import { store } from "../service/store";
import { setToken } from "../service/store/authSlice";

export function initAuth() {
  const token = localStorage.getItem("token");
  if (token) {
    store.dispatch(setToken(token));
  }
}
