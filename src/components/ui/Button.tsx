import Link from 'next/link';
import { cn } from '@/lib/utils';

type Variant = 'primary' | 'secondary' | 'ghost' | 'outline';

const styles: Record<Variant, string> = {
  primary:
    'bg-copper text-white hover:bg-copper-dark copper-glow',
  secondary:
    'bg-ink text-white hover:bg-navy',
  ghost:
    'bg-white/10 text-white backdrop-blur-md hover:bg-white/20',
  outline:
    'border border-line bg-transparent text-ink hover:bg-cream',
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
    'inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium tracking-tight transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-40',
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
