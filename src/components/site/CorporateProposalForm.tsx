"use client";

import { useRef, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { Send } from "lucide-react";
import { z } from "zod";
import { submitInquiry } from "@/lib/inquiries.functions";
import { formatInquiryRef, readStoredInquiryId, storeInquiryId } from "@/lib/inquiry-dedupe";
import { CORPORATE_EMPLOYEE_OPTIONS } from "@/lib/corporate-page-data";
import { toast } from "sonner";
import { RecaptchaField, isRecaptchaEnabled, type RecaptchaFieldRef } from "./RecaptchaField";

const Schema = z.object({
  company_name: z.string().trim().min(1, "Company name is required").max(120),
  name: z.string().trim().min(1, "Contact person is required").max(100),
  phone: z.string().trim().min(5, "Phone is required").max(20),
  email: z.string().trim().min(1, "Official email is required").email("Invalid email").max(255),
  company_location: z.string().trim().max(120).optional(),
  employee_count: z.string().trim().max(80).optional(),
  message: z.string().trim().max(2000).optional(),
});

type FormProps = {
  onSuccess?: () => void;
};

export function CorporateProposalForm({ onSuccess }: FormProps) {
  const submit = useServerFn(submitInquiry);
  const recaptchaRef = useRef<RecaptchaFieldRef>(null);
  const submittingRef = useRef(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (submittingRef.current || loading) return;

    const fd = new FormData(e.currentTarget);
    const raw = Object.fromEntries(fd.entries()) as Record<string, string>;
    const parsed = Schema.safeParse(raw);

    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "Please check the form.");
      return;
    }

    if (isRecaptchaEnabled && !recaptchaRef.current?.getToken()) {
      toast.error("Please complete the reCAPTCHA verification.");
      return;
    }

    const data = parsed.data;
    const composedMessage = [
      data.message?.trim(),
      `Company: ${data.company_name}`,
      data.company_location ? `Location: ${data.company_location}` : "",
      data.employee_count ? `Employees: ${data.employee_count}` : "",
    ]
      .filter(Boolean)
      .join("\n");

    setLoading(true);
    submittingRef.current = true;
    try {
      const existingInquiryId = readStoredInquiryId(data.phone);
      const result = await submit({
        data: {
          service_type: "corporate",
          name: data.name,
          phone: data.phone,
          email: data.email,
          subject: "Corporate Travel Proposal",
          destination: "",
          travel_date: "",
          message: composedMessage,
          package_name: data.company_name,
          source_page: "/corporate",
          selected_inclusions: [],
          selected_exclusions: [],
          recaptcha_token: recaptchaRef.current?.getToken() || "",
          existing_inquiry_id: existingInquiryId || "",
        },
      });

      if (result?.inquiryId) storeInquiryId(result.inquiryId, data.phone);
      const ref = result?.inquiryId ? formatInquiryRef(result.inquiryId) : null;
      toast.success(
        `Proposal sent! Our corporate desk will contact you soon.${ref ? ` Reference: ${ref}.` : ""}`,
      );
      (e.target as HTMLFormElement).reset();
      recaptchaRef.current?.reset();
      onSuccess?.();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not send inquiry. Please try again.");
      recaptchaRef.current?.reset();
    } finally {
      submittingRef.current = false;
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="corp-proposal-form">
      <div className="corp-proposal-form__grid">
        <CorpField label="Company name *" name="company_name" placeholder="Your company name" required />

        <CorpField label="Contact person *" name="name" placeholder="Full name" required />

        <CorpField label="Mobile number *" name="phone" type="tel" placeholder="+91 ..." required />

        <CorpField
          label="Official email *"
          name="email"
          type="email"
          placeholder="you@company.com"
          required
        />

        <CorpField
          label="Company location"
          name="company_location"
          placeholder="City, state"
        />

        <CorpField label="Number of employees" name="employee_count" as="select">
          <option value="">Select employee range</option>
          {CORPORATE_EMPLOYEE_OPTIONS.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </CorpField>
      </div>

      <div className="corp-proposal-form__full">
        <label className="corp-proposal-form__label" htmlFor="corp-message">
          Message / requirements
        </label>
        <textarea
          id="corp-message"
          name="message"
          rows={4}
          placeholder="Tell us about your corporate travel needs, routes, policy requirements…"
          className="corp-proposal-form__textarea"
        />
      </div>

      {isRecaptchaEnabled && <RecaptchaField ref={recaptchaRef} />}

      <button type="submit" disabled={loading} className="corp-proposal-form__submit">
        <Send className="h-4 w-4" aria-hidden="true" />
        {loading ? "Sending…" : "Send Inquiry"}
      </button>

      <p className="corp-proposal-form__note">
        We will respond on WhatsApp & call you within working hours.
      </p>
    </form>
  );
}

function CorpField({
  label,
  name,
  placeholder,
  type = "text",
  required,
  as,
  children,
}: {
  label: string;
  name: string;
  placeholder?: string;
  type?: string;
  required?: boolean;
  as?: "select";
  children?: React.ReactNode;
}) {
  const className = "corp-proposal-form__input";

  return (
    <div>
      <label className="corp-proposal-form__label" htmlFor={name}>
        {label}
      </label>
      {as === "select" ? (
        <select id={name} name={name} required={required} className={className} defaultValue="">
          {children}
        </select>
      ) : (
        <input
          id={name}
          name={name}
          type={type}
          placeholder={placeholder}
          required={required}
          className={className}
        />
      )}
    </div>
  );
}
