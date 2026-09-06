import { cn } from "@/lib/utils";

export function FormField({
  label,
  hint,
  className,
  rightIcon,
  ...rest
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-muted-foreground">
        {label}
      </span>

      <div className="relative">
        <input
          className={cn(
            "w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 pr-12 text-sm text-foreground outline-none transition placeholder:text-muted-foreground/60 focus:border-transparent focus:ring-2 focus:ring-[color:var(--ignitron-orange)]",
            className
          )}
          {...rest}
        />

        {rightIcon && (
          <div className="absolute inset-y-0 right-3 flex items-center">
            {rightIcon}
          </div>
        )}
      </div>

      {hint && (
        <span className="mt-1 block text-xs text-muted-foreground">
          {hint}
        </span>
      )}
    </label>
  );
}