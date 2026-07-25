type AdminFloatingSaveButtonProps = {
  /** Associates the button with a `<form id="…">` when rendered outside the form. */
  formId: string;
  label: string;
  saving?: boolean;
  savingLabel?: string;
  hint?: string;
  /** Stack multiple floating buttons (0 = lowest). Used on Site settings + Email. */
  stackIndex?: number;
};

/**
 * Fixed bottom-right save control so long admin forms stay savable while scrolling.
 */
export function AdminFloatingSaveButton({
  formId,
  label,
  saving = false,
  savingLabel = "Saving…",
  hint,
  stackIndex = 0,
}: AdminFloatingSaveButtonProps) {
  const bottomOffset = 16 + stackIndex * 56;

  return (
    <div
      className="pointer-events-none fixed inset-x-0 z-40 flex justify-end p-4 sm:p-6"
      style={{ bottom: bottomOffset }}
    >
      <div className="pointer-events-auto flex max-w-[min(100%,28rem)] flex-wrap items-center justify-end gap-3 rounded-full border border-white/30 bg-background/90 p-1.5 shadow-lg backdrop-blur-md">
        {hint ? (
          <p className="hidden pl-3 text-xs text-muted-foreground sm:block sm:max-w-[12rem]">
            {hint}
          </p>
        ) : null}
        <button
          type="submit"
          form={formId}
          disabled={saving}
          className="rounded-full bg-brand-gradient px-6 py-2.5 text-sm font-semibold text-white shadow-md disabled:opacity-70"
        >
          {saving ? savingLabel : label}
        </button>
      </div>
    </div>
  );
}
