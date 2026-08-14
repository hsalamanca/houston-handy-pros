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
    <div className={cn(align === 'center' ? 'mx-auto max-w-2xl text-center' : 'max-w-xl', 'mb-12 md:mb-16')}>
      {eyebrow && (
        <p className={cn('mb-3 text-[13px] font-medium tracking-wide', inverted ? 'text-white/50' : 'text-muted')}>
          {eyebrow}
        </p>
      )}
      <h2
        className={cn(
          'text-3xl font-semibold tracking-tight sm:text-4xl md:text-[2.75rem] md:leading-[1.12]',
          inverted ? 'text-white' : 'text-ink'
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p className={cn('mt-4 text-[17px] leading-relaxed', inverted ? 'text-white/60' : 'text-muted')}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
