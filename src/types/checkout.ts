export interface CheckoutItem {
  itemId: string;
  productId: string;
  variantId: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
  selectedOptions: Record<string, string>;
}

export interface DirectCheckoutSession {
  isDirectBuy: boolean;
  items: CheckoutItem[];
  subtotal: number;
}

export interface CouponApplyResponse {
  success: boolean;
  couponId: string;
  code: string;
  discountAmount: number;
  discountType: "percentage" | "fixed_amount";
  message?: string;
}

export interface PayUInitiateResponse {
  key: string;
  txnid: string;
  amount: string;
  productinfo: string;
  firstname: string;
  email: string;
  phone: string;
  surl: string;
  furl: string;
  hash: string;
  service_provider: string;
  payuUrl: string;
}

export interface CheckoutVerifyResponse {
  success: boolean;
  orderId: string;
  orderNumber: string;
  guestOrderToken?: string;
}
