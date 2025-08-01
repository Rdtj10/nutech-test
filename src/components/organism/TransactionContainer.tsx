import { useEffect, useMemo, useState } from "react";
import type { IService } from "../../service/schema/module";
import { useNavigate, useParams } from "react-router-dom";
import { getAllServices } from "../../service/action/module";
import Button from "../atoms/Button";
import InputField from "../atoms/InputField";
import { Icon } from "@iconify/react/dist/iconify.js";
import { payment } from "../../service/action/transaction";
import { BeatLoader } from "react-spinners";

export default function TransactionContainer() {
  const [service, setService] = useState<IService[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const { name } = useParams();

  useEffect(() => {
    getAllServices()
      .then((res) => setService(res.data))
      .catch(console.error);
  }, []);

  const selectedService = useMemo(() => {
    return service.find((item) => item.service_code === name);
  }, [service, name]);

  const handlePay = async () => {
    try {
      setIsLoading(true);
      if (selectedService?.service_code) {
        const res = await payment(selectedService.service_code);
        console.log("berhasil bayar", res);
        window.dispatchEvent(new Event("balanceUpdated"));
      }
      navigate("/transaction/history");
      alert("Pembayaran berhasil!");
    } catch (err) {
      setIsLoading(false);
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full flex flex-col gap-8">
      <div className="felx flex-col gap-1">
        <p className="text-sm text-gray-400">Pembayaran</p>
        <div className="flex flex-row items-center gap-1">
          <img src={selectedService?.service_icon} className="w-6" />
          <h2 className="text-xl font-semibold">
            {selectedService?.service_name}
          </h2>
        </div>
      </div>
      <div className="flex flex-col">
        <InputField
          name="amount"
          placeholder="masukkan nominal topup"
          value={String(selectedService?.service_tariff)}
          disabled
          icon={
            <Icon
              icon="material-symbols:money-outline"
              width="24"
              height="24"
            />
          }
        />
        <Button className="h-fit" size="md" onClick={handlePay}>
          {isLoading ? <BeatLoader /> : "Bayar"}
        </Button>
      </div>
    </div>
  );
}
