import Image from 'next/image';
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
      <Image
        src={inverted ? '/images/logo-mark.jpg' : '/images/logo-icon.jpg'}
        alt="Houston Handy Pros"
        width={40}
        height={40}
        className="h-10 w-10 rounded-sm object-cover"
        priority
      />
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
