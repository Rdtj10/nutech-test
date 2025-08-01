import { useEffect, useState } from "react";
import { getAllBanners, getAllServices } from "../../service/action/module";
import type { IBanner, IService } from "../../service/schema/module";
import { toNormalCase } from "../../libs/util";
import { BeatLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";

export default function DashboardContainer() {
  const [service, setService] = useState<IService[]>([]);
  const [banner, setBanner] = useState<IBanner[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    Promise.all([getAllServices(), getAllBanners()])
      .then(([resService, resBanner]) => {
        setService(resService.data);
        setBanner(resBanner.data);
      })
      .catch(console.error)
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div className="w-full flex flex-col gap-8">
      <div className="w-full flex flex-row justify-between ">
        {loading ? (
          <div className="w-full flex justify-center items-center">
            <BeatLoader />
          </div>
        ) : (
          service.map((item) => (
            <div
              key={item.service_code}
              className="flex flex-col items-center justify-start gap-2 text-center cursor-pointer w-full max-w-[80px]"
              onClick={() => navigate(`/transaction/${item.service_code}`)}
            >
              <div className="w-14 h-14 bg-gray-100 rounded-lg flex items-center justify-center shadow-sm">
                <img
                  src={item.service_icon}
                  alt={item.service_name}
                  className="w-8 h-8 object-contain"
                />
              </div>
              <p className="text-xs break-words">
                {toNormalCase(item.service_code)}
              </p>
            </div>
          ))
        )}
      </div>
      <div className="flex flex-col gap-2">
        <h2 className="text-sm">Temukan promo menarik</h2>
        <div className="flex flex-row gap-6 overflow-x-scroll">
          {loading ? (
            <div className="w-full flex justify-center items-center">
              <BeatLoader />
            </div>
          ) : (
            banner.map((item: any, index) => (
              <img
                key={index}
                src={item.banner_image}
                alt={item.description}
                className="cursor-pointer"
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
