"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label"; 

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [values, setValues] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          ...values,
          access_key: process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY,
        }),
      });

      const result = await response.json();

      if (result.success) {
        toast.success(
          "We've received your message, as soon as possible MAT team contact you. Thank you!"
        );
        setValues({
          name: "",
          email: "",
          message: "",
        });
      } else {
        throw new Error(result.message || "Something went wrong");
      }
    } catch (error) {
      toast.error("There was a problem sending your message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <Label htmlFor="name" className="font-medium">
          Full name
        </Label>
        <Input
          type="text"
          name="name"
          id="name"
          required
          value={values.name}
          onChange={handleChange}
          placeholder="John Doe"
          className="mt-2 w-full"
        />
      </div>
      <div>
        <Label htmlFor="email" className="font-medium">
          Email
        </Label>
        <Input
          type="email"
          name="email"
          id="email"
          required
          value={values.email}
          onChange={handleChange}
          placeholder="john@example.com"
          className="mt-2 w-full"
        />
      </div>
      <div>
        <Label htmlFor="message" className="font-medium">
          Message
        </Label>
        <Textarea
          name="message"
          id="message"
          required
          value={values.message}
          onChange={handleChange}
          placeholder="Your message here..."
          className="mt-2 h-36 w-full resize-none"
        />
      </div>
      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-indigo-600 font-medium text-white duration-150 hover:bg-indigo-500 active:bg-indigo-600"
      >
        {isSubmitting ? "Submitting..." : "Submit"}
      </Button>
    </form>
  );
}
