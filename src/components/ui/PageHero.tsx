import { cn } from '@/lib/utils';

export default function PageHero({
  eyebrow,
  title,
  subtitle,
  children,
  compact = false,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  subtitle?: string;
  children?: React.ReactNode;
  compact?: boolean;
}) {
  return (
    <section className={cn('relative overflow-hidden bg-ink text-cream', compact ? 'py-16 md:py-20' : 'py-20 md:py-28')}>
      <div className="pointer-events-none absolute inset-0 opacity-[0.07]">
        <div className="absolute -right-24 top-0 h-80 w-80 rounded-full bg-copper blur-3xl" />
        <div className="absolute -left-16 bottom-0 h-64 w-64 rounded-full bg-gold blur-3xl" />
      </div>
      <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6">
        {eyebrow && (
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.24em] text-gold">{eyebrow}</p>
        )}
        <h1 className="font-display text-4xl font-medium tracking-tight sm:text-5xl md:text-6xl">{title}</h1>
        {subtitle && <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-cream/70 md:text-lg">{subtitle}</p>}
        {children && <div className="mt-8">{children}</div>}
      </div>
    </section>
  );
}
