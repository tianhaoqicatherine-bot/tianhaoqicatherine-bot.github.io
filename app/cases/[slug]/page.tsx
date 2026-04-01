import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import PageWrapper from '@/components/Template/PageWrapper';
import productCases from '@/data/productCases';
import { createPageMetadata } from '@/lib/metadata';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return productCases.map((caseItem) => ({
    slug: caseItem.id,
  }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const caseItem = productCases.find((c) => c.id === slug);

  if (!caseItem) {
    return {};
  }

  return createPageMetadata({
    title: `${caseItem.title} - 产品案例`,
    description: caseItem.subtitle,
    path: `/cases/${slug}/`,
  });
}

export default async function CaseDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const caseItem = productCases.find((c) => c.id === slug);

  if (!caseItem) {
    notFound();
  }

  const {
    title,
    subtitle,
    role,
    duration,
    company,
    image,
    background,
    research,
    solution,
    metrics,
    results,
    links,
  } = caseItem;

  return (
    <PageWrapper>
      <article className="case-detail">
        {/* 头部区域 */}
        <header className="case-detail-header">
          <div className="case-detail-breadcrumb">
            <Link href="/cases">产品案例</Link> / <span>{title}</span>
          </div>
          <h1 className="case-detail-title">{title}</h1>
          <p className="case-detail-subtitle">{subtitle}</p>

          <div className="case-detail-meta">
            <div className="case-detail-meta-item">
              <span className="case-detail-meta-label">角色</span>
              <span className="case-detail-meta-value">{role}</span>
            </div>
            {company && (
              <div className="case-detail-meta-item">
                <span className="case-detail-meta-label">公司</span>
                <span className="case-detail-meta-value">{company}</span>
              </div>
            )}
            <div className="case-detail-meta-item">
              <span className="case-detail-meta-label">时间</span>
              <span className="case-detail-meta-value">{duration}</span>
            </div>
          </div>

          {links && (links.prototype || links.prd || links.caseStudy) && (
            <div className="case-detail-links">
              {links.prototype && (
                <a
                  href={links.prototype}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="case-detail-link"
                >
                  Figma原型
                </a>
              )}
              {links.prd && (
                <a
                  href={links.prd}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="case-detail-link"
                >
                  PRD文档
                </a>
              )}
              {links.caseStudy && (
                <a
                  href={links.caseStudy}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="case-detail-link"
                >
                  详细报告
                </a>
              )}
            </div>
          )}
        </header>

        {/* 封面图 */}
        <div className="case-detail-image">
          <Image
            src={image}
            alt={title}
            width={1200}
            height={675}
            sizes="100vw"
            priority
          />
        </div>

        {/* 核心指标 */}
        <section className="case-detail-section case-detail-metrics">
          <h2 className="case-detail-section-title">核心指标</h2>
          <div className="case-metrics-grid">
            {metrics.indicators.map((indicator, index) => (
              <div key={index} className="case-metric-card">
                <span className="case-metric-label">{indicator.label}</span>
                <span className="case-metric-value">{indicator.value}</span>
                <span
                  className={`case-metric-change ${indicator.positive ? 'positive' : 'negative'}`}
                >
                  {indicator.change}
                </span>
              </div>
            ))}
          </div>
          <p className="case-metrics-summary">{metrics.summary}</p>
        </section>

        {/* 背景与问题 */}
        <section className="case-detail-section">
          <h2 className="case-detail-section-title">01. 背景与问题</h2>
          <div className="case-section-content">
            <div className="case-subsection">
              <h3>业务背景</h3>
              <p>{background.context}</p>
            </div>
            <div className="case-subsection">
              <h3>核心问题</h3>
              <p>{background.problem}</p>
            </div>
            <div className="case-subsection">
              <h3>目标</h3>
              <p>{background.goal}</p>
            </div>
          </div>
        </section>

        {/* 调研 */}
        <section className="case-detail-section">
          <h2 className="case-detail-section-title">02. 用户调研</h2>
          <div className="case-section-content">
            <div className="case-subsection">
              <h3>研究方法</h3>
              <ul className="case-list">
                {research.methods.map((method, index) => (
                  <li key={index}>{method}</li>
                ))}
              </ul>
            </div>
            <div className="case-subsection">
              <h3>核心洞察</h3>
              <ul className="case-list case-list--insights">
                {research.insights.map((insight, index) => (
                  <li key={index}>{insight}</li>
                ))}
              </ul>
            </div>
            {research.userPersonas && (
              <div className="case-subsection">
                <h3>目标用户</h3>
                <div className="case-personas">
                  {research.userPersonas.map((persona, index) => (
                    <span key={index} className="case-persona-tag">
                      {persona}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* 解决方案 */}
        <section className="case-detail-section">
          <h2 className="case-detail-section-title">03. 解决方案</h2>
          <div className="case-section-content">
            <div className="case-subsection">
              <h3>产品策略</h3>
              <p>{solution.strategy}</p>
            </div>
            <div className="case-subsection">
              <h3>核心功能</h3>
              <ul className="case-list">
                {solution.keyFeatures.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>
            <div className="case-subsection">
              <h3>设计决策</h3>
              <ul className="case-list">
                {solution.designDecisions.map((decision, index) => (
                  <li key={index}>{decision}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* 成果 */}
        <section className="case-detail-section">
          <h2 className="case-detail-section-title">04. 项目成果</h2>
          <div className="case-section-content">
            <div className="case-subsection">
              <h3>业务成果</h3>
              <ul className="case-list case-list--outcomes">
                {results.outcomes.map((outcome, index) => (
                  <li key={index}>{outcome}</li>
                ))}
              </ul>
            </div>
            <div className="case-subsection">
              <h3>经验总结</h3>
              <ul className="case-list case-list--learnings">
                {results.learnings.map((learning, index) => (
                  <li key={index}>{learning}</li>
                ))}
              </ul>
            </div>
            {results.nextSteps && (
              <div className="case-subsection">
                <h3>后续规划</h3>
                <p>{results.nextSteps}</p>
              </div>
            )}
          </div>
        </section>

        {/* 返回按钮 */}
        <footer className="case-detail-footer">
          <Link href="/cases" className="case-detail-back">
            ← 返回案例列表
          </Link>
        </footer>
      </article>
    </PageWrapper>
  );
}
