"use server";

import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";
import { PORTFOLIO_EMAIL } from "@/config/contact";

const supabaseUrl = process.env.SUPABASE_URL || "";
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "";
const resendApiKey = process.env.RESEND_API_KEY || "";

// Initialize Supabase Client with service role key for secure server-side operations
const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

// Initialize Resend Client
const resend = new Resend(resendApiKey);

export type ContactFormState = {
  success: boolean;
  message: string;
};

export async function submitContactFormAction(
  prevState: any,
  formData: FormData
): Promise<ContactFormState> {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const subject = formData.get("subject") as string;
  const message = formData.get("message") as string;

  // Simple backend validation
  if (!name || !email || !message) {
    return {
      success: false,
      message: "Please fill in all required fields (Name, Email, and Message).",
    };
  }

  try {
    // 1. Insert into Supabase Table
    const { error: dbError } = await supabase
      .from("contact_messages")
      .insert([
        {
          name,
          email,
          subject: subject || "Portfolio Contact",
          message,
        },
      ]);

    if (dbError) {
      console.error("Supabase Database error:", dbError);
      throw new Error("Failed to save message to database.");
    }

    // 2. Send email notification using Resend
    const emailResponse = await resend.emails.send({
      from: "Portfolio Form <onboarding@resend.dev>",
      to: PORTFOLIO_EMAIL,
      subject: `New Portfolio Message: ${subject || "No Subject"}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px;">
          <h2 style="color: #0d9488; border-bottom: 2px solid #0d9488; padding-bottom: 10px; margin-top: 0;">New Contact Form Message</h2>
          <p><strong>From:</strong> ${name} (&lt;${email}&gt;)</p>
          <p><strong>Subject:</strong> ${subject || "N/A"}</p>
          <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 20px 0;" />
          <p><strong>Message:</strong></p>
          <p style="white-space: pre-wrap; background-color: #f8fafc; padding: 15px; border-radius: 6px; color: #334155; line-height: 1.6;">${message}</p>
        </div>
      `,
    });

    if (emailResponse.error) {
      console.error("Resend Email error:", emailResponse.error);
    }

    return {
      success: true,
      message: "Your message has been sent successfully!",
    };
  } catch (error) {
    console.error("Contact Form Action error:", error);
    return {
      success: false,
      message: error instanceof Error ? error.message : "An unexpected error occurred. Please try again.",
    };
  }
}
