import { REFUND_CANCELLATION } from "@/config/site";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Refund and Cancellation Policy",
  description: "Refund and Cancellation Policy for Diya",
};

export default function RefundCancellationPage() {
  return (
    <div className="container mx-auto max-w-4xl py-12 px-4">
      <h2 className="text-2xl font-bold mb-4">Refund and Cancellation Policy</h2>
      <div
        className="prose prose-stone dark:prose-invert max-w-none"
        dangerouslySetInnerHTML={{ __html: REFUND_CANCELLATION }}
      />
    </div>
  );
}
