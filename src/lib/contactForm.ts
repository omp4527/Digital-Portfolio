import { PORTFOLIO_EMAIL } from "../config/contact";

type ContactPayload = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

type FormSubmitResponse = {
  success?: string | boolean;
  message?: string;
};

const FORM_ENDPOINT = `https://formsubmit.co/ajax/${encodeURIComponent(PORTFOLIO_EMAIL)}`;

export async function submitContactForm(payload: ContactPayload) {
  // Validate email address existence and check for disposable domains using Disify API
  try {
    const disifyResponse = await fetch(
      `https://disify.com/api/email/${encodeURIComponent(payload.email)}`
    );
    if (disifyResponse.ok) {
      const data = await disifyResponse.json();
      if (data.format === false) {
        throw new Error("Invalid email format.");
      }
      if (data.dns === false) {
        throw new Error("The email domain does not exist or cannot receive mail.");
      }
      if (data.disposable === true) {
        throw new Error("Temporary/disposable email addresses are not allowed.");
      }
    }
  } catch (err) {
    const msg = err instanceof Error ? err.message : "";
    if (
      msg.includes("Invalid email") ||
      msg.includes("does not exist") ||
      msg.includes("disposable email")
    ) {
      throw err;
    }
    console.warn("Disify email validation bypassed:", err);
  }

  let response: Response;
  try {
    response = await fetch(FORM_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        name: payload.name,
        email: payload.email,
        _subject: payload.subject,
        message: payload.message,
        _template: "table",
        _captcha: "false",
      }),
    });
  } catch {
    throw new Error(
      "Could not reach the email service. Check your internet connection or disable ad blockers for this site.",
    );
  }

  const raw = await response.text();
  let result: FormSubmitResponse = {};

  try {
    result = raw ? (JSON.parse(raw) as FormSubmitResponse) : {};
  } catch {
    throw new Error(
      "Unexpected response from email service. If this is your first test, check omp342070@gmail.com for a FormSubmit activation link and click it.",
    );
  }

  const ok =
    response.ok &&
    (result.success === true ||
      result.success === "true" ||
      String(result.message ?? "").toLowerCase().includes("thank"));

  if (!ok) {
    throw new Error(
      result.message ??
        "Could not send your message. Activate FormSubmit via the link sent to your Gmail (first time only).",
    );
  }

  return "Message sent successfully.";
}
