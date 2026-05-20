interface Props {
  title: string;
  subtitle?: string;
  eyebrow?: string;
}

export function PageHero({ title, subtitle, eyebrow }: Props) {
  return (
    <section className="relative bg-[color:var(--surface-dark)] pt-32 md:pt-40 pb-16 md:pb-24 overflow-hidden">
      <div className="absolute inset-0 opacity-[0.07] bg-[linear-gradient(to_right,white_1px,transparent_1px),linear-gradient(to_bottom,white_1px,transparent_1px)] bg-[size:60px_60px]" />
      <div className="absolute top-0 right-0 w-1/2 h-full bg-[radial-gradient(ellipse_at_top_right,rgba(204,0,0,0.18),transparent_60%)]" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {eyebrow && (
          <div className="flex items-center gap-3 mb-4">
            <span className="h-px w-10 bg-primary" />
            <span className="text-xs uppercase tracking-[0.3em] text-primary font-semibold">{eyebrow}</span>
          </div>
        )}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight max-w-4xl">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-6 text-lg md:text-xl text-white/70 max-w-2xl">{subtitle}</p>
        )}
      </div>
    </section>
  );
}
