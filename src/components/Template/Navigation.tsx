'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import ThemeToggle from './ThemeToggle';

// Icons
function HomeIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
}

function ResumeDownloadButton() {
  return (
    <a
      href="/resume.pdf"
      download
      className="nav-resume-btn"
      aria-label="下载简历"
      title="下载简历"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="7 10 12 15 17 10" />
        <line x1="12" y1="15" x2="12" y2="3" />
      </svg>
      <span className="nav-resume-label">简历</span>
    </a>
  );
}

const mainRoutes = [
  { label: '个人介绍', href: '/about/' },
  { label: '产品案例', href: '/cases/' },
];

export default function Navigation() {
  const pathname = usePathname();

  const isActive = (path: string) => {
    if (path === '/') return pathname === '/';
    return pathname?.startsWith(path.replace(/\/$/, ''));
  };

  const isHomePage = pathname === '/';

  // Hide navigation on home page
  if (isHomePage) {
    return null;
  }

  return (
    <header className="site-header">
      <nav className="nav-links">
        {mainRoutes.map((route) => (
          <Link
            key={route.href}
            href={route.href}
            className={`nav-link ${isActive(route.href) ? 'active' : ''}`}
            aria-current={isActive(route.href) ? 'page' : undefined}
          >
            {route.label}
          </Link>
        ))}
      </nav>

      <div className="nav-actions">
        <ResumeDownloadButton />
        <ThemeToggle />
      </div>
    </header>
  );
}
