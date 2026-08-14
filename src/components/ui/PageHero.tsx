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
    <section className={cn('bg-[#f5f5f7] text-ink', compact ? 'py-16 md:py-20' : 'py-20 md:py-28')}>
      <div className="mx-auto max-w-3xl px-5 text-center sm:px-6">
        {eyebrow && (
          <p className="mb-4 text-[13px] font-medium tracking-wide text-muted">{eyebrow}</p>
        )}
        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl">{title}</h1>
        {subtitle && (
          <p className="mx-auto mt-5 max-w-2xl text-[17px] leading-relaxed text-muted md:text-[19px]">
            {subtitle}
          </p>
        )}
        {children && <div className="mt-8">{children}</div>}
      </div>
    </section>
  );
}
