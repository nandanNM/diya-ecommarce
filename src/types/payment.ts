export interface PaymentAttempt {
  id: string;
  txnId: string;
  amount: string;
  status: string;
  error: string | null;
  gatewayTxnId?: string | null;
  mode?: string | null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  rawResponse?: any;
  createdAt?: string;
  updatedAt?: string;
}
