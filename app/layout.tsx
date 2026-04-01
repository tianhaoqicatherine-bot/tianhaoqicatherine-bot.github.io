import type { Metadata } from 'next';
import Script from 'next/script';

import GoogleAnalytics from '@/components/Template/GoogleAnalytics';
import Navigation from '@/components/Template/Navigation';
import ScrollToTop from '@/components/Template/ScrollToTop';
import { AUTHOR_NAME, SITE_URL, TWITTER_HANDLE } from '@/lib/utils';
import './tailwind.css';

const siteDescription =
  '浙江大学AI产品经理，专注于AI产品设计与用户增长。拥有字节跳动等一线互联网公司产品实习经验。';

export const metadata: Metadata = {
  title: {
    default: AUTHOR_NAME,
    template: `%s | ${AUTHOR_NAME}`,
  },
  description: siteDescription,
  keywords: [
    'AI产品经理',
    '浙江大学',
    '产品设计',
    '用户增长',
    '字节跳动',
    '产品经理',
    '实习生',
  ],
  authors: [{ name: AUTHOR_NAME }],
  creator: AUTHOR_NAME,
  metadataBase: new URL(SITE_URL),
  openGraph: {
    type: 'website',
    locale: 'zh_CN',
    url: SITE_URL,
    siteName: AUTHOR_NAME,
    title: AUTHOR_NAME,
    description: siteDescription,
    images: [
      {
        url: '/images/me.jpg',
        width: 1200,
        height: 630,
        alt: AUTHOR_NAME,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: TWITTER_HANDLE,
    creator: TWITTER_HANDLE,
    title: AUTHOR_NAME,
    description: siteDescription,
    images: ['/images/me.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <head>
        {/* CSP-safe theme initialization - prevents flash on load */}
        <Script id="theme-init" strategy="beforeInteractive">
          {`(function(){
            try {
              var theme = window.localStorage.getItem('theme');
              var effectiveTheme = 'light';
              if (theme === 'dark' || theme === 'light') {
                effectiveTheme = theme;
              } else if (!theme || theme === 'system') {
                effectiveTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
              }
              document.documentElement.setAttribute('data-theme', effectiveTheme);
            } catch(e) {}
          })();`}
        </Script>
      </head>
      <body>
        <ScrollToTop />
        <div className="site-wrapper">
          <Navigation />
          {children}
        </div>
        <GoogleAnalytics />
      </body>
    </html>
  );
}
