type Props = {
  modifier?: string;
  children: React.ReactNode;
};

export function ServicePageShell({ modifier, children }: Props) {
  const mod = modifier ? `service-premium-page--${modifier}` : "";
  return <div className={`service-premium-page hotels-page ${mod}`.trim()}>{children}</div>;
}
