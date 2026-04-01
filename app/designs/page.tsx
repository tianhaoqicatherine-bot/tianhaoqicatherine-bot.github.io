import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import PageWrapper from '@/components/Template/PageWrapper';
import designShowcases from '@/data/designShowcases';
import { createPageMetadata } from '@/lib/metadata';

export const metadata: Metadata = createPageMetadata({
  title: '设计稿展示',
  description: '产品原型、UI设计、PRD文档等设计作品展示。',
  path: '/designs/',
});

export default function DesignsPage() {
  const featuredDesigns = designShowcases.filter((d) => d.featured);
  const otherDesigns = designShowcases.filter((d) => !d.featured);

  return (
    <PageWrapper>
      <section className="designs-page">
        <header className="designs-header">
          <h1 className="page-title">设计稿展示</h1>
          <p className="page-subtitle">
            产品原型、UI设计、用户流程图等设计作品
          </p>
        </header>

        {featuredDesigns.length > 0 && (
          <section className="designs-featured">
            <h2 className="designs-section-title">精选作品</h2>
            <div className="designs-grid designs-grid--featured">
              {featuredDesigns.map((design) => (
                <DesignCard key={design.id} data={design} />
              ))}
            </div>
          </section>
        )}

        {otherDesigns.length > 0 && (
          <section className="designs-other">
            <h2 className="designs-section-title">更多作品</h2>
            <div className="designs-grid">
              {otherDesigns.map((design) => (
                <DesignCard key={design.id} data={design} />
              ))}
            </div>
          </section>
        )}
      </section>
    </PageWrapper>
  );
}

function DesignCard({ data }: { data: (typeof designShowcases)[0] }) {
  const { title, project, type, thumbnail, description, tools, link } = data;

  const cardContent = (
    <>
      <div className="design-card-image">
        <Image
          src={thumbnail}
          alt={title}
          width={600}
          height={400}
          sizes="(max-width: 600px) 100vw, 50vw"
        />
        <span className="design-card-type">{type}</span>
      </div>

      <div className="design-card-content">
        <div className="design-card-project">{project}</div>
        <h3 className="design-card-title">{title}</h3>
        <p className="design-card-desc">{description}</p>

        <div className="design-card-tools">
          {tools.map((tool) => (
            <span key={tool} className="design-card-tool">
              {tool}
            </span>
          ))}
        </div>
      </div>
    </>
  );

  return (
    <article className="design-card">
      {link ? (
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="design-card-link"
        >
          {cardContent}
        </a>
      ) : (
        <div className="design-card-static">{cardContent}</div>
      )}
    </article>
  );
}
