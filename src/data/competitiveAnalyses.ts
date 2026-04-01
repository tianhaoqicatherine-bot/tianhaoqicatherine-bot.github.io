export interface CompetitiveAnalysis {
  id: string;
  title: string;
  industry: string;
  date: string;
  summary: string;
  competitors: {
    name: string;
    logo?: string;
    strengths: string[];
    weaknesses: string[];
    marketShare?: string;
    targetUsers: string;
  }[];
  comparison: {
    dimension: string;
    items: { competitor: string; score: number; note?: string }[];
  }[];
  insights: string[];
  recommendations: string[];
}

const competitiveAnalyses: CompetitiveAnalysis[] = [
  {
    id: 'collaboration-tools',
    title: '企业协作工具竞品分析',
    industry: 'SaaS / 企业协作',
    date: '2024-03',
    summary:
      '深入分析钉钉、飞书、企业微信三款主流企业协作工具的产品策略、功能差异和市场定位，为B端产品设计提供参考。',
    competitors: [
      {
        name: '钉钉',
        strengths: [
          '市场占有率高',
          '审批流程完善',
          '硬件生态丰富',
          '中小企业覆盖广',
        ],
        weaknesses: ['用户体验较传统', '创新功能跟进慢', '社交属性弱'],
        marketShare: '45%',
        targetUsers: '中小企业、传统行业',
      },
      {
        name: '飞书',
        strengths: [
          '用户体验优秀',
          '文档协作强大',
          'OKR管理完善',
          '国际化支持好',
        ],
        weaknesses: ['市场渗透率较低', '重协作轻管理', '学习成本较高'],
        marketShare: '15%',
        targetUsers: '互联网、科技、外企',
      },
      {
        name: '企业微信',
        strengths: ['与微信互通', '私域流量运营', '客户管理强', '上手门槛低'],
        weaknesses: ['功能相对简单', '生态依赖微信', '高级功能需付费'],
        marketShare: '35%',
        targetUsers: '零售、服务、销售导向企业',
      },
    ],
    comparison: [
      {
        dimension: '即时通讯',
        items: [
          { competitor: '钉钉', score: 4, note: '功能全面但设计传统' },
          { competitor: '飞书', score: 5, note: '体验流畅，表情丰富' },
          { competitor: '企业微信', score: 4, note: '与微信体验一致' },
        ],
      },
      {
        dimension: '文档协作',
        items: [
          { competitor: '钉钉', score: 3, note: '基础功能具备' },
          { competitor: '飞书', score: 5, note: '业界最强，多维表格创新' },
          { competitor: '企业微信', score: 3, note: '依赖腾讯文档' },
        ],
      },
      {
        dimension: '审批流程',
        items: [
          { competitor: '钉钉', score: 5, note: '流程引擎成熟' },
          { competitor: '飞书', score: 4, note: '与OKR结合好' },
          { competitor: '企业微信', score: 3, note: '功能较基础' },
        ],
      },
      {
        dimension: '用户体验',
        items: [
          { competitor: '钉钉', score: 3, note: '功能堆砌感强' },
          { competitor: '飞书', score: 5, note: '设计一致性最佳' },
          { competitor: '企业微信', score: 4, note: '简洁易用' },
        ],
      },
    ],
    insights: [
      '钉钉依靠先发优势和阿里生态占据最大市场份额，但产品创新乏力',
      '飞书以极致体验切入高端市场，但向下渗透困难',
      '企业微信凭借微信互通成为销售/客服场景首选',
      '三款产品定位差异明显，形成差异化竞争格局',
    ],
    recommendations: [
      'B端产品要在功能完整性和用户体验间找到平衡',
      '生态整合能力是B端产品的核心竞争壁垒',
      '针对不同规模企业需要提供差异化方案',
      '产品定位要清晰，避免与巨头正面竞争',
    ],
  },
];

export default competitiveAnalyses;
