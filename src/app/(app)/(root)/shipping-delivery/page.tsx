import { SHIPPING_DELIVERY } from "@/config/site";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shipping and Delivery Policy",
  description: "Shipping and Delivery Policy for Diya",
};

export default function ShippingDeliveryPage() {
  return (
    <div className="container mx-auto max-w-4xl py-12 px-4">
      <h2 className="text-2xl font-bold mb-4">Shipping and Delivery Policy</h2>
      <div
        className="prose prose-stone dark:prose-invert max-w-none"
        dangerouslySetInnerHTML={{ __html: SHIPPING_DELIVERY }}
      />
    </div>
  );
}
