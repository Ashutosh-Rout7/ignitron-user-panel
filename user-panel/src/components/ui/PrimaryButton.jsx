// PrimaryButton.jsx

import { cn } from "@/lib/utils";

export function PrimaryButton({ className, ...rest }) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-full bg-gradient-brand px-5 py-3 text-sm font-semibold text-primary-foreground shadow-glow transition hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...rest}
    />
  );
}

export function GhostButton({ className, ...rest }) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-5 py-3 text-sm font-medium text-foreground transition hover:bg-white/10",
        className
      )}
      {...rest}
    />
  );
}