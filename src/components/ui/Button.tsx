import Link from 'next/link';
import { cn } from '@/lib/utils';

type Variant = 'primary' | 'secondary' | 'ghost' | 'outline';

const styles: Record<Variant, string> = {
  primary:
    'bg-copper text-ink hover:bg-copper-dark copper-glow',
  secondary:
    'bg-ink text-cream hover:bg-navy',
  ghost:
    'bg-white/10 text-cream border border-white/20 hover:bg-white/20',
  outline:
    'border border-ink/15 bg-transparent text-ink hover:border-ink hover:bg-ink hover:text-cream',
};

export default function Button({
  href,
  children,
  variant = 'primary',
  className,
  type,
  disabled,
  onClick,
}: {
  href?: string;
  children: React.ReactNode;
  variant?: Variant;
  className?: string;
  type?: 'button' | 'submit';
  disabled?: boolean;
  onClick?: () => void;
}) {
  const cls = cn(
    'inline-flex items-center justify-center gap-2 rounded-sm px-6 py-3.5 text-sm font-semibold tracking-wide transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-40',
    styles[variant],
    className
  );

  if (href) {
    if (href.startsWith('tel:') || href.startsWith('mailto:')) {
      return (
        <a href={href} className={cls}>
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={cls}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type ?? 'button'} className={cls} disabled={disabled} onClick={onClick}>
      {children}
    </button>
  );
}
