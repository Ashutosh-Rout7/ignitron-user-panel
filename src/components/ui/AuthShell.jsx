import { Logo } from "@/components/layout/Logo";

export function AuthShell({
  title,
  subtitle,
  children,
  footer,
}) {
  return (
    <div className="grid min-h-[calc(100vh-4rem)] place-items-center px-4 py-12">
      <div className="relative w-full max-w-md overflow-hidden rounded-3xl glass-strong p-8 shadow-glow">
        <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-gradient-brand opacity-30 blur-3xl" />

        <div className="relative">
          <Logo />

          <h1 className="mt-6 text-2xl font-semibold tracking-tight">
            {title}
          </h1>

          <p className="mt-1 text-sm text-muted-foreground">
            {subtitle}
          </p>

          <div className="mt-6">
            {children}
          </div>

          {footer && (
            <div className="mt-6 text-center text-sm text-muted-foreground">
              {footer}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}