import { useEffect, useRef, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { submitInquiry } from "@/lib/inquiries.functions";
import { INQUIRY_SERVICES, COMMON_PACKAGE_EXCLUSIONS, TOUR_TYPES } from "@/lib/site-data";
import { CORPORATE_EMPLOYEE_OPTIONS } from "@/lib/corporate-page-data";
import { formatInquiryRef, readStoredInquiryId, storeInquiryId } from "@/lib/inquiry-dedupe";
import { useSiteConfig } from "@/contexts/site-config";
import { toast } from "sonner";
import { Checkbox } from "@/components/ui/checkbox";
import { RecaptchaField, isRecaptchaEnabled, type RecaptchaFieldRef } from "./RecaptchaField";
import { isTravelDateAllowed, todayTravelDateValue } from "@/lib/travel-date";

const ClientSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  phone: z.string().trim().min(5, "Phone is required").max(20),
  email: z.string().trim().email("Invalid email").max(255).optional().or(z.literal("")),
  subject: z.string().trim().max(200).optional(),
  destination: z.string().trim().max(120).optional(),
  travel_date: z
    .string()
    .trim()
    .max(20)
    .optional()
    .refine((value) => isTravelDateAllowed(value), {
      message: "Travel date must be today or a future date.",
    }),
  travelers: z.string().trim().max(3).optional(),
  company_name: z.string().trim().max(160).optional(),
  company_location: z.string().trim().max(160).optional(),
  employee_count: z.string().trim().max(60).optional(),
  message: z.string().trim().max(2000).optional(),
});

export type InquiryFormProps = {
  defaultService?: string;
  defaultDestination?: string;
  packageName?: string;
  sourcePage?: string;
  title?: string;
  compact?: boolean;
  showSubject?: boolean;
  hideServiceSelect?: boolean;
  inclusionOptions?: string[];
  exclusionOptions?: string[];
  onSuccess?: () => void;
  submitLabel?: string;
  showPackageType?: boolean;
};

export function InquiryForm({
  defaultService = "general",
  defaultDestination = "",
  packageName,
  sourcePage,
  title = "Send us an inquiry",
  compact = false,
  showSubject = false,
  hideServiceSelect = false,
  inclusionOptions,
  exclusionOptions,
  onSuccess,
  submitLabel,
  showPackageType,
}: InquiryFormProps) {
  const site = useSiteConfig();
  const resolvedExclusions =
    exclusionOptions ??
    (inclusionOptions
      ? site.commonPackageExclusions?.length > 0
        ? site.commonPackageExclusions
        : [...COMMON_PACKAGE_EXCLUSIONS]
      : undefined);
  const isPackageBooking = defaultService === "packages" || Boolean(packageName);
  const resolvedSubmitLabel = submitLabel ?? (isPackageBooking ? "Book Package" : "Send inquiry");
  const showTypeField =
    showPackageType ?? (isPackageBooking && !packageName && !showSubject);
  const serviceOptions =
    site.inquiryServices.length > 0
      ? site.inquiryServices
      : INQUIRY_SERVICES.map((s) => ({ slug: s.slug, title: s.title }));
  const packageTypeOptions =
    site.tourTypes.length > 0
      ? site.tourTypes
      : TOUR_TYPES.map((t) => ({ slug: t.slug, name: t.name }));
  const submit = useServerFn(submitInquiry);
  const recaptchaRef = useRef<RecaptchaFieldRef>(null);
  const submittingRef = useRef(false);
  const [service, setService] = useState(defaultService);
  const [packageType, setPackageType] = useState("");
  const [employeeCount, setEmployeeCount] = useState("");
  const [loading, setLoading] = useState(false);
  const isCorporateService = service === "corporate";
  const [inclusions, setInclusions] = useState<Record<string, boolean>>(() =>
    Object.fromEntries((inclusionOptions ?? []).map((item) => [item, true])),
  );
  const [exclusions, setExclusions] = useState<Record<string, boolean>>(() =>
    Object.fromEntries((resolvedExclusions ?? []).map((item) => [item, false])),
  );
  const [destination, setDestination] = useState(defaultDestination);

  useEffect(() => {
    setDestination(defaultDestination);
  }, [defaultDestination]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (submittingRef.current || loading) return;

    const fd = new FormData(e.currentTarget);
    const raw = Object.fromEntries(fd.entries()) as Record<string, string>;

    const parsed = ClientSchema.safeParse(raw);
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "Please check the form.");
      return;
    }

    if (isCorporateService && !parsed.data.company_name?.trim()) {
      toast.error("Company name is required.");
      return;
    }

    if (isCorporateService && !parsed.data.email?.trim()) {
      toast.error("Official email is required.");
      return;
    }

    if (isRecaptchaEnabled) {
      const token = recaptchaRef.current?.getToken();
      if (!token) {
        toast.error("Please complete the reCAPTCHA verification.");
        return;
      }
    }

    const selectedInclusions = inclusionOptions
      ? inclusionOptions.filter((item) => inclusions[item])
      : [];
    const selectedExclusions = resolvedExclusions
      ? resolvedExclusions.filter((item) => exclusions[item])
      : [];

    const companyName = parsed.data.company_name?.trim() || "";
    const companyLocation = parsed.data.company_location?.trim() || "";
    const employees = parsed.data.employee_count?.trim() || employeeCount.trim() || "";
    const corporateDetails = [
      companyName ? `Company: ${companyName}` : "",
      companyLocation ? `Location: ${companyLocation}` : "",
      employees ? `Employees: ${employees}` : "",
    ]
      .filter(Boolean)
      .join("\n");
    const messageWithCompany =
      isCorporateService && corporateDetails
        ? `${corporateDetails}${parsed.data.message ? `\n\n${parsed.data.message}` : ""}`
        : parsed.data.message || "";

    setLoading(true);
    submittingRef.current = true;
    try {
      const existingInquiryId = readStoredInquiryId(parsed.data.phone);
      const result = await submit({
        data: {
          service_type: service,
          name: parsed.data.name,
          phone: parsed.data.phone,
          email: parsed.data.email || "",
          subject:
            parsed.data.subject ||
            packageType ||
            (isCorporateService && companyName ? `Corporate â€” ${companyName}` : "") ||
            "",
          destination: parsed.data.destination || "",
          travel_date: parsed.data.travel_date || "",
          travelers: parsed.data.travelers ? Number(parsed.data.travelers) : undefined,
          message: messageWithCompany,
          package_name: packageName || "",
          source_page:
            sourcePage || (typeof window !== "undefined" ? window.location.pathname : ""),
          selected_inclusions: selectedInclusions,
          selected_exclusions: selectedExclusions,
          recaptcha_token: recaptchaRef.current?.getToken() || "",
          existing_inquiry_id: existingInquiryId || "",
        },
      });

      if (result?.inquiryId) {
        storeInquiryId(result.inquiryId, parsed.data.phone);
      }

      const ref = result?.inquiryId ? formatInquiryRef(result.inquiryId) : null;
      const refNote = ref ? ` Your reference: ${ref}.` : "";

      const emailNote =
        parsed.data.email && result?.emailSent === false
          ? " Note: we could not send a confirmation email, but our team will contact you."
          : "";

      toast.success(
        result?.alreadySubmitted
          ? `We already received your inquiry â€” our team will contact you soon.${refNote}${emailNote}`
          : result?.updated
            ? `Your booking request has been updated. Our team will contact you soon.${refNote}${emailNote}`
            : `Inquiry sent! Our team will contact you soon.${refNote}${emailNote}`,
      );
      (e.target as HTMLFormElement).reset();
      setDestination(defaultDestination);
      recaptchaRef.current?.reset();
      setPackageType("");
      setEmployeeCount("");
      if (inclusionOptions) {
        setInclusions(Object.fromEntries(inclusionOptions.map((item) => [item, true])));
      }
      if (resolvedExclusions) {
        setExclusions(Object.fromEntries(resolvedExclusions.map((item) => [item, false])));
      }
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
    <form onSubmit={handleSubmit} className="space-y-4">
      {title && <h3 className="font-display text-xl font-semibold">{title}</h3>}

      <div className={`grid gap-3 ${compact ? "" : "sm:grid-cols-2"}`}>
        {!hideServiceSelect && (
          <div className={isCorporateService ? "sm:col-span-2" : undefined}>
            <label className="text-xs font-medium text-muted-foreground">Service</label>
            <select
              value={service}
              onChange={(e) => {
                setService(e.target.value);
                if (e.target.value !== "corporate") setEmployeeCount("");
              }}
              className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2.5 text-base sm:text-sm"
            >
              <option value="general">General Inquiry</option>
              {serviceOptions.map((s) => (
                <option key={s.slug} value={s.slug}>
                  {s.title}
                </option>
              ))}
            </select>
          </div>
        )}

        {isCorporateService ? (
          <>
            <Field
              name="company_name"
              label="Company name *"
              placeholder="Your company name"
            />
            <Field name="name" label="Contact person *" placeholder="Full name" />
            <Field name="phone" label="Mobile number *" type="tel" placeholder="+91 ..." />
            <Field
              name="email"
              label="Official email *"
              type="email"
              placeholder="you@company.com"
            />
            <Field
              name="company_location"
              label="Company location"
              placeholder="City, state"
            />
            <div>
              <label className="text-xs font-medium text-muted-foreground">
                Number of employees
              </label>
              <select
                name="employee_count"
                value={employeeCount}
                onChange={(e) => setEmployeeCount(e.target.value)}
                className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2.5 text-base sm:text-sm"
              >
                <option value="">Select employee range</option>
                {CORPORATE_EMPLOYEE_OPTIONS.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          </>
        ) : (
          <>
            {showSubject && <Field name="subject" label="Subject" />}
            {showTypeField && (
              <div>
                <label className="text-xs font-medium text-muted-foreground">Package type</label>
                <select
                  value={packageType}
                  onChange={(e) => setPackageType(e.target.value)}
                  className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2.5 text-base sm:text-sm"
                >
                  <option value="">Select type (optional)</option>
                  {packageTypeOptions.map((type) => (
                    <option key={type.slug} value={type.name}>
                      {type.name}
                    </option>
                  ))}
                </select>
              </div>
            )}
            {packageName && (
              <div className="sm:col-span-2">
                <label className="text-xs font-medium text-muted-foreground">Package</label>
                <div className="mt-1 rounded-md border border-border bg-muted/30 px-3 py-2.5 text-base sm:text-sm font-medium">
                  {packageName}
                </div>
              </div>
            )}
            <Field name="name" label="Full name *" />
            <Field name="phone" label="Phone / WhatsApp *" type="tel" />
            <Field name="email" label="Email" type="email" />
            <label className="block space-y-1.5">
              <span className="text-xs font-medium text-muted-foreground">Destination</span>
              <input
                name="destination"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="w-full rounded-md border border-border bg-background px-3 py-2.5 text-base sm:text-sm"
              />
            </label>
            <Field
              name="travel_date"
              label="Travel date"
              type="date"
              min={todayTravelDateValue()}
            />
            <Field name="travelers" label="Travelers" type="number" min={1} max={99} />
          </>
        )}
      </div>

      {!isCorporateService && inclusionOptions && inclusionOptions.length > 0 && (
        <CheckboxGroup
          legend="Inclusions you'd like in your quote"
          hint="Uncheck any item you don't need."
          items={inclusionOptions}
          checked={inclusions}
          onChange={(item, value) => setInclusions((prev) => ({ ...prev, [item]: value }))}
        />
      )}

      {!isCorporateService && resolvedExclusions && resolvedExclusions.length > 0 && (
        <CheckboxGroup
          legend="Exclusions to confirm"
          hint="Check items you want clarified or added to your package."
          items={resolvedExclusions}
          checked={exclusions}
          onChange={(item, value) => setExclusions((prev) => ({ ...prev, [item]: value }))}
        />
      )}

      <div>
        <label className="text-xs font-medium text-muted-foreground">
          {isCorporateService ? "Message / requirements" : "Message"}
        </label>
        <textarea
          name="message"
          rows={isCorporateService ? 4 : 3}
          placeholder={
            isCorporateService
              ? "Tell us about your corporate travel needs, routes, policy requirements..."
              : undefined
          }
          className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2.5 text-base sm:text-sm"
        />
      </div>

      {isRecaptchaEnabled && <RecaptchaField ref={recaptchaRef} />}

      <button
        type="submit"
        disabled={loading}
        aria-busy={loading}
        className="btn-brand-cta"
      >
        {loading ? (isPackageBooking ? "Bookingâ€¦" : "Sendingâ€¦") : resolvedSubmitLabel}
      </button>
      <p className="text-center text-xs text-muted-foreground">
        Your inquiry goes to our travel desk. We&apos;ll call or email you within working hours.
      </p>
    </form>
  );
}

function CheckboxGroup({
  legend,
  hint,
  items,
  checked,
  onChange,
}: {
  legend: string;
  hint?: string;
  items: string[];
  checked: Record<string, boolean>;
  onChange: (item: string, value: boolean) => void;
}) {
  return (
    <fieldset className="rounded-xl border border-border/70 bg-muted/20 p-4">
      <legend className="px-1 text-xs font-semibold text-foreground">{legend}</legend>
      {hint && <p className="mt-1 text-xs text-muted-foreground">{hint}</p>}
      <div className="mt-3 max-h-40 space-y-2 overflow-y-auto pr-1">
        {items.map((item) => (
          <label key={item} className="flex cursor-pointer items-start gap-2.5 text-sm">
            <Checkbox
              checked={checked[item] ?? false}
              onCheckedChange={(value) => onChange(item, value === true)}
              className="mt-0.5"
            />
            <span className="leading-snug text-foreground/90">{item}</span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}

function Field({
  name,
  label,
  placeholder,
  type = "text",
  min,
  max,
  defaultValue,
}: {
  name: string;
  label: string;
  placeholder?: string;
  type?: string;
  min?: number | string;
  max?: number | string;
  defaultValue?: string;
}) {
  return (
    <div>
      <label className="text-xs font-medium text-muted-foreground">{label}</label>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        min={min}
        max={max}
        defaultValue={defaultValue}
        className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2.5 text-base sm:text-sm focus:outline-none focus:ring-2 focus:ring-ring/40"
      />
    </div>
  );
}
