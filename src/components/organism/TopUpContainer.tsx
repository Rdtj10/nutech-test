import { useState } from "react";
import InputField from "../atoms/InputField";
import { Icon } from "@iconify/react/dist/iconify.js";
import Button from "../atoms/Button";
import { topUp } from "../../service/action/transaction";
import { useNavigate } from "react-router-dom";
import { BeatLoader } from "react-spinners";

const nominalList = [10000, 20000, 50000, 100000, 250000, 500000];

export default function TopUpContainer() {
  const navigate = useNavigate();
  const [amount, setAmount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleTopUp = async () => {
    try {
      setIsLoading(true);
      const res = await topUp(amount);
      console.log("Top Up", res);
      alert("Top Up Berhasil");
      window.dispatchEvent(new Event("balanceUpdated"));
      navigate("/transaction/history");
    } catch (err) {
      setIsLoading(false);
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full flex flex-col gap-10">
      <div className="flex flex-col">
        <p>Silahkan Masuk</p>
        <h2 className="text-2xl font-semibold">Nominal Top Up</h2>
      </div>
      <div className="w-full grid grid-cols-2 gap-4 items-start">
        {/* Kiri */}
        <div className="flex flex-col">
          <InputField
            name="amount"
            placeholder="masukkan nominal topup"
            value={amount.toString()}
            onChange={(e) => {
              const val = e.target.value;
              setAmount(val === "" ? 0 : Number(val));
            }}
            icon={
              <Icon
                icon="material-symbols:money-outline"
                width="24"
                height="24"
              />
            }
          />
          <Button
            className="h-fit"
            size="md"
            disabled={!amount || isLoading}
            onClick={handleTopUp}
          >
            {isLoading ? <BeatLoader /> : "Top Up"}
          </Button>
        </div>

        {/* Kanan */}
        <div className="grid grid-cols-3 gap-4">
          {nominalList.map((no, index) => (
            <Button
              key={index}
              variant="outline"
              size="md"
              className="h-fit"
              onClick={() => setAmount(no)}
            >
              {no.toLocaleString("id-ID", {
                style: "currency",
                currency: "IDR",
              })}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}
