"use client";

import { adminInputClass } from "@/components/admin/AdminPageHeader";
import { cn } from "@/lib/utils";

export type AdminDestinationOption = {
  value: string;
  label: string;
};

type Props = {
  value: string;
  onChange: (value: string) => void;
  options: AdminDestinationOption[];
  placeholder?: string;
  disabled?: boolean;
};

/** Native select — reliable inside Dialog (Popover/combobox was trapped under z-index). */
export function AdminDestinationSelect({
  value,
  onChange,
  options,
  placeholder = "Select destination…",
  disabled,
}: Props) {
  return (
    <select
      value={value}
      disabled={disabled || options.length === 0}
      onChange={(e) => onChange(e.target.value)}
      className={cn(adminInputClass, "cursor-pointer")}
      aria-label="Destination"
    >
      <option value="" disabled>
        {placeholder}
      </option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}
