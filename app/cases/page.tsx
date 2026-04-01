import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import PageWrapper from '@/components/Template/PageWrapper';
import productCases from '@/data/productCases';
import { createPageMetadata } from '@/lib/metadata';

export const metadata: Metadata = createPageMetadata({
  title: '产品案例',
  description:
    '精选产品案例分析，展示从需求调研到上线的完整产品工作流程与数据成果。',
  path: '/cases/',
});

export default function CasesPage() {
  const featuredCases = productCases.filter((c) => c.featured);
  const otherCases = productCases.filter((c) => !c.featured);

  return (
    <PageWrapper>
      <section className="cases-page">
        <header className="cases-header">
          <h1 className="page-title">产品案例</h1>
          <p className="page-subtitle">
            从需求洞察到产品落地的完整案例，展示数据驱动的产品方法论
          </p>
        </header>

        {featuredCases.length > 0 && (
          <section className="cases-featured">
            <h2 className="cases-section-title">精选案例</h2>
            <div className="cases-grid cases-grid--featured">
              {featuredCases.map((caseItem) => (
                <CaseCard key={caseItem.id} data={caseItem} featured />
              ))}
            </div>
          </section>
        )}

        {otherCases.length > 0 && (
          <section className="cases-other">
            <h2 className="cases-section-title">更多案例</h2>
            <div className="cases-grid">
              {otherCases.map((caseItem) => (
                <CaseCard key={caseItem.id} data={caseItem} />
              ))}
            </div>
          </section>
        )}
      </section>
    </PageWrapper>
  );
}

interface CaseCardProps {
  data: (typeof productCases)[0];
  featured?: boolean;
}

function CaseCard({ data, featured }: CaseCardProps) {
  const { id, title, subtitle, role, duration, company, image, metrics, links } = data;

  // 提取关键指标展示
  const keyMetric = metrics.indicators[0];

  // 如果有外部链接，使用 <a> 标签
  const cardContent = (
    <>
      <div className="case-card-image">
        <Image
          src={image}
          alt={title}
          width={600}
          height={340}
          sizes="(max-width: 600px) 100vw, 50vw"
        />
        <div className="case-card-overlay" />
      </div>

      <div className="case-card-content">
        <header className="case-card-header">
          <h3 className="case-card-title">{title}</h3>
          {subtitle && <p className="case-card-subtitle">{subtitle}</p>}
        </header>

        <div className="case-card-meta">
          <span className="case-card-role">{role}</span>
          {company && <span className="case-card-company">@{company}</span>}
          <span className="case-card-duration">{duration}</span>
        </div>

        {keyMetric && (
          <div className="case-card-metric">
            <span className="case-card-metric-label">{keyMetric.label}</span>
            <span className="case-card-metric-value">{keyMetric.value}</span>
            <span
              className={`case-card-metric-change ${keyMetric.positive ? 'positive' : 'negative'}`}
            >
              {keyMetric.change}
            </span>
          </div>
        )}
      </div>
    </>
  );

  return (
    <article className={`case-card ${featured ? 'case-card--featured' : ''}`}>
      {links?.caseStudy ? (
        <a
          href={links.caseStudy}
          target="_blank"
          rel="noopener noreferrer"
          className="case-card-link"
        >
          {cardContent}
        </a>
      ) : (
        <Link href={`/cases/${id}`} className="case-card-link">
          {cardContent}
        </Link>
      )}
    </article>
  );
}
