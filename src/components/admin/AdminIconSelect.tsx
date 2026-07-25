import { AdminField, adminInputClass } from "@/components/admin/AdminPageHeader";
import { CMS_ICON_OPTIONS, resolveCmsIcon } from "@/lib/cms-icons";

type Props = {
  label: string;
  hint?: string;
  value: string;
  onChange: (icon: string) => void;
};

export function AdminIconSelect({ label, hint, value, onChange }: Props) {
  const Icon = resolveCmsIcon(value);
  return (
    <AdminField label={label} hint={hint}>
      <div className="flex items-center gap-2">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-border bg-muted/40">
          <Icon className="h-4 w-4 text-[color:var(--brand-navy)]" />
        </span>
        <select
          value={value || "Sparkles"}
          onChange={(e) => onChange(e.target.value)}
          className={`${adminInputClass} flex-1`}
        >
          {CMS_ICON_OPTIONS.map((name) => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
        </select>
      </div>
    </AdminField>
  );
}
