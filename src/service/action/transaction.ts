import api from "../api";

export const getBalance = async () => {
  const res = await api.get("/balance");
  return res.data;
};

export const topUp = async (amount: number) => {
  const res = await api.post("/topup", {
    top_up_amount: amount,
  });
  return res.data;
};

export const getTransactionHistory = async (offset = 0, limit = 3) => {
  const res = await api.get("transaction/history", {
    params: {
      offset,
      limit,
    },
  });
  return res.data;
};

export const payment = async (code: string) => {
  const res = await api.post("transaction", {
    service_code: code,
  });
  return res.data;
};
