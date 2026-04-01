export interface DesignShowcase {
  id: string;
  title: string;
  project: string;
  type: '原型' | 'UI设计' | 'PRD' | '用户流程' | '组件库';
  thumbnail: string;
  description: string;
  tools: string[];
  link?: string;
  date: string;
  featured?: boolean;
}

const designShowcases: DesignShowcase[] = [
  {
    id: 'ecommerce-redesign-prototype',
    title: '电商平台首页改版原型',
    project: '电商平台首页改版',
    type: '原型',
    thumbnail: '/images/designs/ecommerce-prototype.jpg',
    description:
      '基于用户研究和数据分析，重新设计的电商首页交互原型。包含个性化推荐Feed、场景化入口、快捷筛选等核心功能的完整交互流程。',
    tools: ['Figma', 'Axure RP'],
    link: 'https://figma.com/example',
    date: '2023-08',
    featured: true,
  },
  {
    id: 'saas-onboarding-flow',
    title: 'SaaS产品新用户引导流程',
    project: 'SaaS产品新用户引导优化',
    type: '用户流程',
    thumbnail: '/images/designs/saas-flow.jpg',
    description:
      '从注册到激活的完整用户引导流程设计，包含3种不同用户角色的个性化路径。',
    tools: ['Figma', 'Miro'],
    date: '2023-03',
    featured: true,
  },
  {
    id: 'app-ui-design',
    title: '内容社区APP UI设计',
    project: 'APP用户增长与留存体系',
    type: 'UI设计',
    thumbnail: '/images/designs/app-ui.jpg',
    description:
      '游戏化内容社区APP的UI设计规范，包含徽章系统、任务中心、排行榜等模块的视觉设计。',
    tools: ['Sketch', 'Figma'],
    date: '2022-10',
  },
  {
    id: 'design-system',
    title: 'B端产品设计系统',
    project: '内部工具建设',
    type: '组件库',
    thumbnail: '/images/designs/design-system.jpg',
    description:
      '为SaaS产品搭建的完整设计系统，包含50+基础组件和30+业务组件，支持主题切换和暗黑模式。',
    tools: ['Figma', 'Storybook'],
    date: '2023-06',
  },
  {
    id: 'user-research-prd',
    title: '用户研究PRD模板',
    project: '方法论沉淀',
    type: 'PRD',
    thumbnail: '/images/designs/prd-template.jpg',
    description:
      '标准化的用户研究PRD模板，包含研究目标、方法、样本、洞察和行动建议的完整框架。',
    tools: ['Notion', '语雀'],
    link: '/docs/prd-template.pdf',
    date: '2024-01',
  },
];

export default designShowcases;
