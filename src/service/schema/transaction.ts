import { z } from "zod";

export const TransactionHistorySchema = z.object({
  invoice_number: z.string(),
  transaction_type: z.enum(["TOPUP", "PAYMENT"]),
  description: z.string(),
  total_amount: z.number(),
  created_on: z.string().datetime(),
});

export const TransactionDataSchema = z.object({
  offset: z.number(),
  limit: z.number(),
  records: z.array(TransactionHistorySchema),
});

export type ITransactionHistory = z.infer<typeof TransactionDataSchema>;
export type ITransactionRecord = z.infer<typeof TransactionHistorySchema>;
