import type { Metadata } from 'next';

import PageWrapper from '@/components/Template/PageWrapper';
import creativeIdeas, {
  statusColors,
  statusLabels,
  type IdeaStatus,
} from '@/data/creativeIdeas';

export const metadata: Metadata = {
  title: '创意工坊',
  description:
    '正在进行中、遇到瓶颈或早期的产品脑洞。展示从游戏、书籍、生活中获得的产品灵感。',
};

export default function WorkshopPage() {
  // Group by status
  const inProgress = creativeIdeas.filter((i) => i.status === 'in_progress');
  const stuck = creativeIdeas.filter((i) => i.status === 'stuck');
  const concept = creativeIdeas.filter((i) => i.status === 'concept');

  return (
    <PageWrapper>
      <section className="workshop-page">
        <header className="workshop-header">
          <h1 className="page-title">创意工坊</h1>
          <p className="page-subtitle">正在进行中、遇到瓶颈或早期的产品脑洞</p>
        </header>

        <div className="workshop-kanban">
          <KanbanColumn
            title={statusLabels.in_progress}
            status="in_progress"
            ideas={inProgress}
          />
          <KanbanColumn
            title={statusLabels.stuck}
            status="stuck"
            ideas={stuck}
          />
          <KanbanColumn
            title={statusLabels.concept}
            status="concept"
            ideas={concept}
          />
        </div>
      </section>
    </PageWrapper>
  );
}

function KanbanColumn({
  title,
  status,
  ideas,
}: {
  title: string;
  status: IdeaStatus;
  ideas: typeof creativeIdeas;
}) {
  return (
    <div className="kanban-column">
      <div className="kanban-column-header">
        <span
          className="kanban-column-indicator"
          style={{ backgroundColor: statusColors[status] }}
        />
        <h2 className="kanban-column-title">{title}</h2>
        <span className="kanban-column-count">{ideas.length}</span>
      </div>

      <div className="kanban-column-content">
        {ideas.length === 0 ? (
          <div className="kanban-empty">暂无创意</div>
        ) : (
          ideas.map((idea) => <IdeaCard key={idea.id} idea={idea} />)
        )}
      </div>
    </div>
  );
}

function IdeaCard({ idea }: { idea: (typeof creativeIdeas)[0] }) {
  return (
    <article className="idea-card">
      <div className="idea-card-header">
        <span
          className="idea-status-badge"
          style={{
            backgroundColor: `${statusColors[idea.status]}20`,
            color: statusColors[idea.status],
          }}
        >
          {statusLabels[idea.status]}
        </span>
        <span className="idea-code">{idea.code}</span>
      </div>

      <h3 className="idea-title">{idea.title}</h3>

      <div className="idea-section">
        <h4 className="idea-section-title">灵感来源</h4>
        <p className="idea-section-content">{idea.inspiration}</p>
      </div>

      <div className="idea-section">
        <h4 className="idea-section-title">核心思路</h4>
        <p className="idea-section-content">{idea.summary}</p>
      </div>

      {idea.challenges && (
        <div className="idea-section idea-section--challenge">
          <h4 className="idea-section-title">遇到的难点</h4>
          <p className="idea-section-content">{idea.challenges}</p>
        </div>
      )}

      <div className="idea-meta">
        <div className="idea-tags">
          {idea.tags.map((tag) => (
            <span key={tag} className="idea-tag">
              {tag}
            </span>
          ))}
        </div>
        <time className="idea-date">创建于 {idea.createdAt}</time>
      </div>
    </article>
  );
}
