import type { Service } from '@/data/services';

type Props = { icon: Service['cardIcon']; className?: string };

export function ServiceIcon({ icon, className = 'h-6 w-6' }: Props) {
  const common = {
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 2,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    className,
    'aria-hidden': true
  };
  switch (icon) {
    case 'couch':
      return (
        <svg {...common}>
          <path d="M20 9V7a2 2 0 00-2-2H6a2 2 0 00-2 2v2" />
          <path d="M2 11v5a2 2 0 002 2h16a2 2 0 002-2v-5a2 2 0 00-4 0v2H6v-2a2 2 0 00-4 0z" />
          <line x1="6" y1="18" x2="6" y2="20" />
          <line x1="18" y1="18" x2="18" y2="20" />
        </svg>
      );
    case 'building':
      return (
        <svg {...common}>
          <rect x="4" y="2" width="16" height="20" rx="2" />
          <line x1="9" y1="6" x2="9" y2="7" />
          <line x1="15" y1="6" x2="15" y2="7" />
          <line x1="9" y1="11" x2="9" y2="12" />
          <line x1="15" y1="11" x2="15" y2="12" />
          <path d="M10 22v-4h4v4" />
        </svg>
      );
    case 'home':
      return (
        <svg {...common}>
          <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
          <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
      );
    case 'boxes':
      return (
        <svg {...common}>
          <path d="M12.9 4.54l7 3.5V16l-7 3.5L5.9 16V8.04l7-3.5z" />
          <path d="M12.9 12l7-4.06" />
          <path d="M12.9 12v7.5" />
          <path d="M12.9 12l-7-4.06" />
        </svg>
      );
    case 'waves':
      return (
        <svg {...common}>
          <path d="M2 6c2 0 2 2 4 2s2-2 4-2 2 2 4 2 2-2 4-2 2 2 4 2" />
          <path d="M2 12c2 0 2 2 4 2s2-2 4-2 2 2 4 2 2-2 4-2 2 2 4 2" />
          <path d="M2 18c2 0 2 2 4 2s2-2 4-2 2 2 4 2 2-2 4-2 2 2 4 2" />
        </svg>
      );
    case 'refrigerator':
      return (
        <svg {...common}>
          <rect x="5" y="2" width="14" height="20" rx="2" />
          <line x1="5" y1="10" x2="19" y2="10" />
          <line x1="8" y1="6" x2="8" y2="8" />
          <line x1="8" y1="14" x2="8" y2="17" />
        </svg>
      );
    case 'bed':
      return (
        <svg {...common}>
          <path d="M2 10v8" />
          <path d="M22 10v8" />
          <path d="M2 14h20" />
          <path d="M4 14v-4a2 2 0 012-2h10a2 2 0 012 2v4" />
          <circle cx="7" cy="11" r="1" />
        </svg>
      );
    case 'hardhat':
      return (
        <svg {...common}>
          <path d="M2 18h20" />
          <path d="M4 18v-4a8 8 0 0116 0v4" />
          <path d="M9 10V7a3 3 0 016 0v3" />
        </svg>
      );
    case 'tire':
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="10" />
          <circle cx="12" cy="12" r="4" />
          <line x1="12" y1="2" x2="12" y2="8" />
          <line x1="12" y1="16" x2="12" y2="22" />
          <line x1="2" y1="12" x2="8" y2="12" />
          <line x1="16" y1="12" x2="22" y2="12" />
        </svg>
      );
    case 'briefcase':
      return (
        <svg {...common}>
          <rect x="2" y="7" width="20" height="14" rx="2" />
          <path d="M8 7V5a2 2 0 012-2h4a2 2 0 012 2v2" />
          <line x1="2" y1="13" x2="22" y2="13" />
        </svg>
      );
    case 'leaf':
      return (
        <svg {...common}>
          <path d="M11 20A7 7 0 019.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z" />
          <path d="M2 21c0-3 1.85-5.36 5.08-6" />
        </svg>
      );
    case 'truck':
      return (
        <svg {...common}>
          <rect x="1" y="3" width="15" height="13" />
          <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
          <circle cx="5.5" cy="18.5" r="2.5" />
          <circle cx="18.5" cy="18.5" r="2.5" />
        </svg>
      );
    case 'tools':
      return (
        <svg {...common}>
          <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z" />
        </svg>
      );
    case 'office':
      return (
        <svg {...common}>
          <rect x="3" y="3" width="18" height="18" rx="1" />
          <path d="M9 7h.01" />
          <path d="M14 7h.01" />
          <path d="M9 11h.01" />
          <path d="M14 11h.01" />
          <path d="M9 15h.01" />
          <path d="M14 15h.01" />
        </svg>
      );
    case 'shop':
      return (
        <svg {...common}>
          <path d="M2 7h20l-2 13H4z" />
          <path d="M16 7a4 4 0 00-8 0" />
        </svg>
      );
    case 'lock':
      return (
        <svg {...common}>
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
          <path d="M7 11V7a5 5 0 0110 0v4" />
        </svg>
      );
    case 'garage':
      return (
        <svg {...common}>
          <path d="M3 21V7l9-4 9 4v14" />
          <path d="M5 21V11h14v10" />
          <line x1="5" y1="14" x2="19" y2="14" />
          <line x1="5" y1="17.5" x2="19" y2="17.5" />
        </svg>
      );
    case 'pool':
      return (
        <svg {...common}>
          <path d="M2 20a4 4 0 014-4h12a4 4 0 014 4" />
          <path d="M2 16c2 0 2-2 4-2s2 2 4 2 2-2 4-2 2 2 4 2 2-2 4-2" />
          <path d="M8 12V4l4 2 4-2v8" />
        </svg>
      );
  }
}
