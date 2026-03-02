import { Resend } from "resend";

import { OrderReceiptEmail } from "@/components/emails/order-receipt";
import { ORDER_UPDATE_ADMIN_EMAILS } from "@/lib/constants";
import type { Order } from "@/types/order";

const resend = new Resend(process.env.RESEND_API_KEY);

export const mailService = {
  async sendOrderReceipt(order: Order, customerEmail: string) {
    if (!process.env.RESEND_API_KEY) {
      return { success: false, error: "RESEND_API_KEY is missing" };
    }

    const { data, error } = await resend.emails.send({
      from: "Apanadiya <noreply@updates.apanadiya.in>",
      to: [customerEmail, ...ORDER_UPDATE_ADMIN_EMAILS],
      subject: `Order Confirmation - #${order.orderNumber}`,
      react: OrderReceiptEmail({ order, customerEmail }),
    });
    if (error) {
      return { success: false, error };
    }
    return { success: true, data };
  },
};
