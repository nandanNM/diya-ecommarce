import { PRIVACY_POLICY } from "@/config/site";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy Policy for Diya",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="container mx-auto max-w-4xl py-12 px-4">
      <h2 className="text-2xl font-bold mb-4">Privacy Policy</h2>
      <div
        className="prose prose-stone dark:prose-invert max-w-none"
        dangerouslySetInnerHTML={{ __html: PRIVACY_POLICY }}
      />
    </div>
  );
}
