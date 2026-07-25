import type { InquiryStatus } from "@/integrations/supabase/types";
import { INQUIRY_STATUS_COLORS, INQUIRY_STATUS_LABELS } from "@/lib/admin-api";
import { cn } from "@/lib/utils";

export function InquiryStatusBadge({
  status,
  className,
}: {
  status: InquiryStatus;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold",
        INQUIRY_STATUS_COLORS[status],
        className,
      )}
    >
      {INQUIRY_STATUS_LABELS[status]}
    </span>
  );
}
