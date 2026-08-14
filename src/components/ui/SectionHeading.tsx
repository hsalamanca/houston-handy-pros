import { cn } from '@/lib/utils';

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = 'center',
  inverted = false,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
  inverted?: boolean;
}) {
  return (
    <div className={cn(align === 'center' ? 'mx-auto max-w-2xl text-center' : 'max-w-xl', 'mb-12 md:mb-14')}>
      {eyebrow && (
        <p
          className={cn(
            'mb-3 text-xs font-semibold uppercase tracking-[0.22em]',
            inverted ? 'text-gold' : 'text-copper'
          )}
        >
          {eyebrow}
        </p>
      )}
      <h2
        className={cn(
          'font-display text-3xl font-medium tracking-tight sm:text-4xl md:text-[2.6rem] md:leading-[1.15]',
          inverted ? 'text-cream' : 'text-ink'
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p className={cn('mt-4 text-base leading-relaxed md:text-lg', inverted ? 'text-cream/70' : 'text-muted')}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
