import { TERMS_OF_SERVICE } from "@/config/site";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms of Service for Diya",
};

export default function TermsOfServicePage() {
  return (
    <div className="container mx-auto max-w-4xl py-12 px-4">
      <h2 className="text-2xl font-bold mb-4">Terms and Conditions</h2>
      <div
        className="prose prose-stone dark:prose-invert max-w-none"
        dangerouslySetInnerHTML={{ __html: TERMS_OF_SERVICE }}
      />
    </div>
  );
}
