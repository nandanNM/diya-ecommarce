// "use server";

// import MagicLinkEmail from "@/components/emails/magic-link-email";
// import { Resend } from "resend";

// const resend = new Resend(process.env.RESEND_API_KEY);

// export async function sendEmail({
//   to: email,
//   subject,
//   name,
//   message,
//   magicLink,
//   type,
// }: {
//   to: string;
//   subject: string;
//   name: string;
//   message?: string;
//   magicLink: string;
//   type?: "login" | "reset";
// }) {
//   try {
//     const data = await resend.emails.send({
//       from: "MATPG1 <onboarding@matpg1.in>",
//       to: [email],
//       subject,
//       text: `Name: ${name}\nEmail: ${email}\nMessage: ${message || ""}`,
//       react: MagicLinkEmail({
//         magicLink,
//         name,
//         type,
//       }),
//     });
//     return { success: true, data };
//   } catch (error) {
//     return { success: false, error };
//   }
// }
