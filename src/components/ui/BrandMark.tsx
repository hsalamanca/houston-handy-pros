import { cn } from '@/lib/utils';

export default function BrandMark({
  className,
  inverted = false,
}: {
  className?: string;
  inverted?: boolean;
}) {
  return (
    <div className={cn('flex items-center gap-3', className)}>
      <span
        className={cn(
          'flex h-10 w-10 items-center justify-center rounded-sm',
          inverted ? 'bg-copper text-ink' : 'bg-ink text-cream'
        )}
        aria-hidden
      >
        <svg viewBox="0 0 32 32" className="h-6 w-6" fill="none">
          <path
            d="M6 15.2 16 7l10 8.2V26a1 1 0 0 1-1 1h-6.2v-7.2h-5.6V27H7a1 1 0 0 1-1-1V15.2Z"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
          <path d="M12.2 14.4h7.6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      </span>
      <span className="leading-none">
        <span
          className={cn(
            'block font-display text-[1.05rem] font-semibold tracking-tight',
            inverted ? 'text-cream' : 'text-ink'
          )}
        >
          Houston Handy Pros
        </span>
        <span
          className={cn(
            'mt-1 block text-[10px] font-semibold uppercase tracking-[0.18em]',
            inverted ? 'text-gold' : 'text-copper'
          )}
        >
          Est. 2015 · Houston, TX
        </span>
      </span>
    </div>
  );
}
