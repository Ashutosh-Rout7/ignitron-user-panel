// PageHero.jsx

export function PageHero({
  eyebrow,
  title,
  description,
  children,
}) {
  return (
    <section className="mx-auto max-w-5xl px-4 py-16 text-center md:py-20">
      {eyebrow && (
        <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
          {eyebrow}
        </span>
      )}

      <h1 className="mt-5 text-balance text-4xl font-semibold tracking-tight md:text-6xl">
        {title}
      </h1>

      {description && (
        <p className="mx-auto mt-5 max-w-2xl text-pretty text-base text-muted-foreground md:text-lg">
          {description}
        </p>
      )}

      {children && (
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          {children}
        </div>
      )}
    </section>
  );
}