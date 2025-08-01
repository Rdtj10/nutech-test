import { useEffect, useState } from "react";
import type { ITransactionRecord } from "../../service/schema/transaction";
import { getTransactionHistory } from "../../service/action/transaction";
import dayjs from "dayjs";
import Button from "../atoms/Button";
import { cn } from "../../libs/util";

export default function TransactionHistoryContainer() {
  const [records, setRecords] = useState<ITransactionRecord[]>([]);
  const [offset, setOffset] = useState<number>(0);
  const [limit] = useState<number>(5);
  const [showAll, setShowAll] = useState<boolean>(false);

  dayjs.locale("id");

  const loadHistory = async () => {
    try {
      const res = await getTransactionHistory(offset, limit);
      const newRecords = res.data.records;

      if (!newRecords || newRecords.length === 0) {
        setShowAll(true);
        return;
      }

      const updatedRecords = [...records, ...newRecords];
      setRecords(updatedRecords);
      if (newRecords.length < limit) {
        setShowAll(true);
      } else {
        setOffset((prev) => prev + limit);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const resetHistory = async () => {
    try {
      const res = await getTransactionHistory(0, limit);
      setRecords(res.data.records);
      setOffset(limit);
      setShowAll(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadHistory();
  }, []);

  return (
    <div className="w-full flex flex-col gap-4">
      <h2 className="text-xl font-semibold">Semua History</h2>

      {records.map((record, index) => (
        <div
          key={index}
          className="w-full flex flex-row justify-between items-center border border-gray-300 rounded-md px-4 py-2"
        >
          <div className="flex flex-col gap-2">
            <h2
              className={
                record.transaction_type === "PAYMENT"
                  ? "text-2xl text-red-500 font-semibold"
                  : "text-2xl text-green-500 font-semibold"
              }
            >
              {record.transaction_type === "PAYMENT" ? "-" : "+"}{" "}
              {record.total_amount.toLocaleString("id-ID")}
            </h2>
            <p className="text-xs text-gray-400">
              {dayjs(record.created_on).format("D MMMM YYYY HH:mm")}
            </p>
          </div>
          <p>{record.description}</p>
        </div>
      ))}

      <div className="w-full flex justify-center items-center">
        <Button
          className={cn("text-red-500 cursor-pointer")}
          variant="ghost"
          onClick={showAll ? resetHistory : loadHistory}
        >
          {showAll ? "Show less" : "Show more"}
        </Button>
      </div>
    </div>
  );
}
