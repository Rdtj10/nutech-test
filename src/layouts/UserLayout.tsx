import { Outlet } from "react-router-dom";
import UserDisplay from "../components/molecules/UserDisplay";

export default function UserLayout() {
  return (
    <div className="flex flex-col gap-4 w-full">
      <UserDisplay />
      <Outlet />
    </div>
  );
}
