import Image from 'next/image';
import { cn } from '@/lib/utils';

export default function BrandMark({
  className,
  inverted = false,
  compact = false,
}: {
  className?: string;
  inverted?: boolean;
  compact?: boolean;
}) {
  return (
    <div className={cn('flex items-center gap-2.5', className)}>
      <Image
        src={inverted ? '/images/logo-mark.jpg' : '/images/logo-icon.jpg'}
        alt="Houston Handy Pros"
        width={compact ? 32 : 40}
        height={compact ? 32 : 40}
        className={cn('rounded-xl object-cover', compact ? 'h-8 w-8' : 'h-10 w-10')}
        priority
      />
      <span className="leading-none">
        <span
          className={cn(
            'block font-semibold tracking-tight',
            compact ? 'text-[15px]' : 'text-[1.05rem]',
            inverted ? 'text-white' : 'text-ink'
          )}
        >
          Houston Handy Pros
        </span>
        {!compact && (
          <span
            className={cn(
              'mt-1 block text-[10px] font-medium uppercase tracking-[0.16em]',
              inverted ? 'text-white/50' : 'text-muted'
            )}
          >
            Houston, TX
          </span>
        )}
      </span>
    </div>
  );
}
