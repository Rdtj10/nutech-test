import { useEffect, useState } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import Avatar from "../atoms/Avatar";
import { useSelector } from "react-redux";
import { BeatLoader } from "react-spinners";
import { getBalance } from "../../service/action/transaction";

const UserDisplay = () => {
  const [balance, setBalance] = useState<number>(0);
  const [visible, setVisible] = useState<boolean>(true);
  const { profile: user, isLoading } = useSelector((state: any) => state.user);

  useEffect(() => {
    const handleBalanceUpdate = () => {
      getBalance().then((res) => setBalance(res.data.balance));
    };

    window.addEventListener("balanceUpdated", handleBalanceUpdate);

    handleBalanceUpdate();

    return () => {
      window.removeEventListener("balanceUpdated", handleBalanceUpdate);
    };
  }, []);

  return (
    <div className="min-h-38 grid grid-cols-5">
      <div className="col-span-2 flex flex-col gap-2 justify-center h-full">
        {isLoading ? (
          <BeatLoader />
        ) : (
          <>
            <Avatar
              src={
                !user?.profile_image ||
                user.profile_image ===
                  "https://minio.nutech-integrasi.com/take-home-test/null"
                  ? "/assets/Profile Photo.png"
                  : user.profile_image
              }
              alt="John Doe"
              size="lg"
            />

            <div>
              <p>Selamat Datang,</p>
              <h2 className="text-2xl font-bold">
                {user?.first_name && user?.last_name
                  ? user.first_name + " " + user.last_name
                  : "-"}
              </h2>
            </div>
          </>
        )}
      </div>
      <div className="col-span-3 flex flex-col gap-2 justify-center rounded-2xl bg-[url(/assets/bg-saldo.png)] p-6 text-white">
        <p>Saldo Dana</p>
        <h2 className="font-bold text-4xl">
          Rp.{" "}
          {visible
            ? balance.toLocaleString("id-ID")
            : "•".repeat(balance.toString().length || 0)}
        </h2>
        <div className="flex flex-row items-center gap-4">
          <p>Lihat Saldo</p>
          <span onClick={() => setVisible(!visible)} className="cursor-pointer">
            {visible ? (
              <Icon icon="streamline:visible" width="16" height="16" />
            ) : (
              <Icon icon="streamline:invisible-1" width="16" height="16" />
            )}
          </span>
        </div>
      </div>
    </div>
  );
};
export default UserDisplay;
