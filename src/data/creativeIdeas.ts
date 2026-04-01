export type IdeaStatus = 'in_progress' | 'stuck' | 'concept';

export interface CreativeIdea {
  id: string;
  code: string; // 创意代号
  title: string;
  status: IdeaStatus;
  inspiration: string; // 灵感来源
  summary: string; // 核心思路
  challenges?: string; // 遇到的难点
  tags: string[];
  createdAt: string;
}

const creativeIdeas: CreativeIdea[] = [
  {
    id: 'game-mechanics-to-product',
    code: 'IDEA-001',
    title: '游戏机制产品化：从《饥荒》的生存系统到用户留存设计',
    status: 'in_progress',
    inspiration:
      "灵感来源于游戏《饥荒》(Don't Starve)的生存系统。游戏中玩家需要管理饥饿、理智、生命三维属性，这种多维度资源管理机制给了我启发。",
    summary:
      '尝试将游戏中的"生存压力"转化为产品的"使用驱动力"。通过设置类似游戏的多维度指标（如活跃度、贡献值、社交连接度），让用户在使用产品时产生持续的目标感和成就感。',
    challenges:
      '难点在于平衡"压力"和"乐趣"的边界——太轻松则用户无感，太严苛则用户流失。需要找到适合非游戏场景的激励机制。',
    tags: ['游戏化', '用户留存', '产品设计'],
    createdAt: '2024-12',
  },
  {
    id: 'cyberpunk-ui-components',
    code: 'IDEA-002',
    title: '赛博朋克风格的B端组件库',
    status: 'concept',
    inspiration:
      '受《赛博朋克2077》的UI设计启发，特别是其数据可视化和信息层级的设计。B端产品长期被"枯燥"的形象束缚，可以尝试引入更有未来感的设计语言。',
    summary:
      '设计一套具有赛博朋克美学风格的B端组件库，保留功能性同时增加视觉冲击力。核心元素：霓虹色高亮、玻璃拟态面板、动态数据流效果、故障艺术(Glitch Art)微交互。',
    tags: ['UI设计', '组件库', 'B端产品'],
    createdAt: '2024-11',
  },
  {
    id: 'co-op-cooking-workflow',
    code: 'IDEA-003',
    title: '从《胡闹厨房2》学习协作流程设计',
    status: 'stuck',
    inspiration:
      '《胡闹厨房2》(Overcooked 2)是一款考验协作的 cooking game。游戏中玩家需要分工、配合、应对突发状况，这与真实工作中的协作场景高度相似。',
    summary:
      '提取游戏中的协作机制（任务分配、时间管理、沟通反馈、危机处理）应用到项目管理工具设计中。目标是让团队协作像游戏一样"紧张但有趣"。',
    challenges:
      '当前卡在如何量化"协作乐趣"这个指标。游戏有明确的胜负反馈，但工作场景的反馈周期更长、标准更模糊。需要设计更精细的数据埋点和评估体系。',
    tags: ['协作工具', '游戏化', '项目管理'],
    createdAt: '2024-10',
  },
  {
    id: 'debt-cycle-dashboard',
    code: 'IDEA-004',
    title: '债务危机周期可视化仪表盘',
    status: 'in_progress',
    inspiration:
      '读完瑞·达利欧的《债务危机》后，想做一个帮助理解经济周期的可视化工具。书中大量的历史数据和周期规律很适合用交互式图表呈现。',
    summary:
      '构建一个展示历史上主要债务危机周期的交互式仪表盘。用户可以选择不同的危机案例（2008年金融危机、大萧条等），查看债务/GDP比率变化、利率走势、政策应对措施等维度的数据可视化。',
    tags: ['数据可视化', '金融科技', '教育产品'],
    createdAt: '2024-09',
  },
  {
    id: 'standup-comedy-product',
    code: 'IDEA-005',
    title: '单口喜剧作为一种内容产品的受众交互思考',
    status: 'concept',
    inspiration:
      '观看线下脱口秀演出时，注意到演员与观众的实时互动如何影响演出质量。观众不是被动接受者，而是内容的共同创造者。',
    summary:
      '探索"互动式内容产品"的可能性。单口喜剧的"callback"（callback梗）机制——演员在演出后半段呼应前半段的梗——本质上是一种内容间的超链接。是否可以借鉴这种机制设计内容产品的推荐算法？',
    tags: ['内容产品', '推荐算法', '用户研究'],
    createdAt: '2024-08',
  },
  {
    id: 'food-map-webapp',
    code: 'IDEA-006',
    title: '大学城美食地图 Web App',
    status: 'in_progress',
    inspiration:
      '浙江大学紫金港校区周边有大量美食，但信息分散在美团、小红书、抖音等多个平台，缺乏一个整合的、学生视角的美食指南。',
    summary:
      '开发一个针对大学生的美食地图应用，核心功能包括：按距离/评分/性价比筛选、学生专属优惠聚合、真实评价（过滤商家刷单）、拼单约饭社交功能。技术栈：Next.js + Supabase + 高德地图 API。',
    challenges:
      '数据冷启动问题——如何在没有用户的情况下积累第一批真实评价。考虑从校园KOL切入，先建立种子用户群。',
    tags: ['Web App', '本地生活', '校园创业'],
    createdAt: '2024-07',
  },
];

export default creativeIdeas;

export const statusLabels: Record<IdeaStatus, string> = {
  in_progress: '进行中',
  stuck: '卡住/搁置',
  concept: '概念阶段',
};

export const statusColors: Record<IdeaStatus, string> = {
  in_progress: 'var(--color-accent)',
  stuck: '#e47272',
  concept: '#888888',
};
