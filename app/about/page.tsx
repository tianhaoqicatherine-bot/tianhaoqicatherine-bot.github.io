import type { Metadata } from 'next';

import AboutContent from '@/components/About/AboutContent';
import PageWrapper from '@/components/Template/PageWrapper';

export const metadata: Metadata = {
  title: '个人介绍',
  description:
    '浙江大学金融学硕士在读，产品经理实习生。专注于AI产品设计与用户增长。',
};

export default function AboutPage() {
  return (
    <PageWrapper mainClassName="page-main--wide">
      <section className="about-page">
        <AboutContent />
      </section>
    </PageWrapper>
  );
}
