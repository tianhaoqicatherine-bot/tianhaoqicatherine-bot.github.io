import { getRequestConfig } from 'next-intl/server';

export default getRequestConfig(async () => {
  // Provide a static locale for static export
  // The actual locale switching will be handled client-side
  const locale = 'zh';

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
