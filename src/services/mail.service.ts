import { Resend } from "resend";

import { OrderReceiptEmail } from "@/components/emails/order-receipt";
import type { Order } from "@/types/order";

const resend = new Resend(process.env.RESEND_API_KEY);

export const mailService = {
  async sendOrderReceipt(order: Order, customerEmail: string) {
    if (!process.env.RESEND_API_KEY) {
      console.warn("RESEND_API_KEY is not set. Skipping email.");
      return;
    }

    try {
      const { data, error } = await resend.emails.send({
        from: "Diya E-commerce <noreply@apnadiya.in>",
        to: [customerEmail],
        subject: `Order Confirmation - #${order.orderNumber}`,
        react: OrderReceiptEmail({ order, customerEmail }),
      });

      if (error) {
        console.error("Failed to send order email:", error);
        return { success: false, error };
      }

      return { success: true, data };
    } catch (err) {
      console.error("Mail Service Error:", err);
      return { success: false, error: err };
    }
  },
};
