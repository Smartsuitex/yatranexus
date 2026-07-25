import { AdminField, adminInputClass } from "@/components/admin/AdminPageHeader";
import { SOCIAL_KEYS } from "@/components/site/footer/footer-data";

export type SocialLinksForm = {
  facebook: string;
  instagram: string;
  linkedin: string;
  youtube: string;
};

export const EMPTY_SOCIAL_LINKS: SocialLinksForm = {
  facebook: "",
  instagram: "",
  linkedin: "",
  youtube: "",
};

export function socialFromRecord(raw: Record<string, string>): SocialLinksForm {
  return {
    facebook: raw.facebook?.trim() || "",
    instagram: raw.instagram?.trim() || "",
    linkedin: raw.linkedin?.trim() || "",
    youtube: raw.youtube?.trim() || "",
  };
}

export function socialToRecord(form: SocialLinksForm): Record<string, string> {
  const out: Record<string, string> = {};
  for (const { key } of SOCIAL_KEYS) {
    const value = form[key]?.trim();
    if (value) out[key] = value;
  }
  return out;
}

type Props = {
  value: SocialLinksForm;
  onChange: (next: SocialLinksForm) => void;
};

const PLACEHOLDERS: Record<keyof SocialLinksForm, string> = {
  facebook: "https://facebook.com/yatranexus",
  instagram: "https://instagram.com/yatranexus",
  linkedin: "https://linkedin.com/company/yatranexus",
  youtube: "https://youtube.com/@yatranexus",
};

export function AdminSocialLinksFields({ value, onChange }: Props) {
  return (
    <div className="md:col-span-2 space-y-3">
      <h2 className="text-sm font-semibold text-[color:var(--brand-navy)]">Social links</h2>
      <p className="text-xs text-muted-foreground">
        Paste full profile URLs. Leave blank to hide that icon on the site.
      </p>
      <div className="grid gap-3 sm:grid-cols-2">
        {SOCIAL_KEYS.map(({ key, label }) => (
          <AdminField key={key} label={label}>
            <input
              type="url"
              value={value[key]}
              onChange={(e) => onChange({ ...value, [key]: e.target.value })}
              className={adminInputClass}
              placeholder={PLACEHOLDERS[key]}
            />
          </AdminField>
        ))}
      </div>
    </div>
  );
}
