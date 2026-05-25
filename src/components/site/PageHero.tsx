interface Props {
  title: string;
  subtitle?: string;
  eyebrow?: string;
  backgroundImage?: string;
}

export function PageHero({ title, subtitle, eyebrow, backgroundImage }: Props) {
  return (
    <section className="relative bg-[color:var(--surface-dark)] pt-32 md:pt-40 pb-16 md:pb-24 overflow-hidden">
      {backgroundImage && (
        <>
          <div
            className="absolute inset-0 bg-cover bg-center opacity-30"
            style={{ backgroundImage: `url(${backgroundImage})` }}
            aria-hidden
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[color:var(--surface-dark)] via-[color:var(--surface-dark)]/85 to-[color:var(--surface-dark)]/40" aria-hidden />
        </>
      )}
      {!backgroundImage && (
        <div className="absolute inset-0 opacity-[0.06] bg-[linear-gradient(to_right,white_1px,transparent_1px),linear-gradient(to_bottom,white_1px,transparent_1px)] bg-[size:60px_60px]" />
      )}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.06),transparent_60%)]" />
      <div className="absolute -top-24 right-1/3 w-[40%] h-[60%] bg-[radial-gradient(circle_at_center,rgba(204,0,0,0.08),transparent_70%)] blur-2xl" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {eyebrow && (
          <div className="flex items-center gap-2.5 mb-5">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            <span className="text-[11px] uppercase tracking-[0.22em] text-white/55 font-semibold">{eyebrow}</span>
          </div>
        )}
        <h1 className="text-[2.25rem] leading-[1.08] md:text-6xl lg:text-7xl font-bold text-white tracking-tight max-w-4xl text-balance">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-6 text-lg md:text-xl text-white/70 max-w-2xl">{subtitle}</p>
        )}
      </div>
    </section>
  );
}
