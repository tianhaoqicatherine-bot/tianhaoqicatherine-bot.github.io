export interface UserResearch {
  id: string;
  title: string;
  project: string;
  date: string;
  methods: string[];
  participants: number;
  duration: string;
  objectives: string[];
  keyFindings: {
    insight: string;
    evidence: string;
    priority: '高' | '中' | '低';
  }[];
  personas: {
    name: string;
    avatar?: string;
    demographics: string;
    goals: string[];
    painPoints: string[];
    behaviors: string[];
    quote?: string;
  }[];
  recommendations: string[];
  impact: string;
}

const userResearches: UserResearch[] = [
  {
    id: 'ecommerce-user-research',
    title: '电商平台用户购物行为研究',
    project: '电商平台首页改版',
    date: '2023-06',
    methods: ['用户访谈', '可用性测试', '眼动追踪', '问卷调研'],
    participants: 50,
    duration: '4周',
    objectives: [
      '了解用户在首页的浏览和决策行为',
      '发现现有首页设计的问题和痛点',
      '验证新设计方案的可行性',
      '收集用户对个性化推荐的反馈',
    ],
    keyFindings: [
      {
        insight: '用户平均在首页停留仅8秒，无法有效获取信息',
        evidence:
          '热力图显示73%的用户未滚动页面即离开，眼动追踪显示注意力分散在过多元素上',
        priority: '高',
      },
      {
        insight: '73%的用户表示"找不到想要的商品"',
        evidence:
          '用户访谈中频繁提及分类混乱、搜索不精准的问题；可用性测试任务完成率仅45%',
        priority: '高',
      },
      {
        insight: '不同用户群体有截然不同的购物动机和行为模式',
        evidence:
          '通过聚类分析识别出3类典型用户：价格敏感型、品质追求型、冲动消费型',
        priority: '中',
      },
      {
        insight: '移动端用户更偏好图片浏览而非文字阅读',
        evidence:
          '移动端眼动数据显示用户注意力集中在图片区域，文字区停留时间极短',
        priority: '中',
      },
    ],
    personas: [
      {
        name: '小王 - 价格敏感型',
        demographics: '25岁，白领，月收入8k',
        goals: ['找到性价比最高的商品', '获取优惠信息', '快速比价'],
        painPoints: ['优惠信息分散', '比价困难', '担心买贵'],
        behaviors: [
          '经常浏览促销专区',
          '会对比多个平台价格',
          '关注购物车降价提醒',
        ],
        quote: '我就想在最便宜的时候买到想要的东西，但找优惠太费劲了。',
      },
      {
        name: '李女士 - 品质追求型',
        demographics: '32岁，中层管理，月收入20k',
        goals: ['购买高品质商品', '了解品牌故事', '获得良好售后'],
        painPoints: ['假货担忧', '品质难以判断', '退换货麻烦'],
        behaviors: [
          '仔细查看商品详情和评价',
          '偏好知名品牌',
          '愿意为好服务付费',
        ],
        quote: '价格不是首要考虑，我更在意品质和售后保障。',
      },
      {
        name: '小张 - 冲动消费型',
        demographics: '22岁，大学生，月生活费2k',
        goals: ['发现新奇有趣的商品', '跟随潮流', '快速下单'],
        painPoints: ['选择困难', '容易超预算', '退货率高'],
        behaviors: ['被推荐算法影响大', '喜欢在社交媒体分享', '夜间购物频率高'],
        quote: '看到喜欢的就想买，经常买到不实用的东西。',
      },
    ],
    recommendations: [
      '重构首页信息架构，突出个性化推荐，减少信息密度',
      '针对不同用户群体设计差异化的首页布局',
      '优化搜索和筛选功能，提升找货效率',
      '移动端采用大图卡片式布局，减少文字信息',
      '增加价格监控和降价提醒功能',
      '建立品质保障标签体系，提升品质型用户信任',
    ],
    impact:
      '研究成果直接指导了首页改版方案，改版后转化率提升35%，用户满意度从3.2提升至4.5。',
  },
  {
    id: 'saas-activation-research',
    title: 'SaaS产品新用户激活研究',
    project: 'SaaS产品新用户引导优化',
    date: '2023-02',
    methods: ['漏斗分析', '用户分群', '流失用户回访', '客服工单分析'],
    participants: 30,
    duration: '3周',
    objectives: [
      '识别用户激活路径中的关键流失节点',
      '了解用户流失的原因和痛点',
      '发现影响用户激活的关键行为',
      '为新用户引导设计提供依据',
    ],
    keyFindings: [
      {
        insight: '68%的新用户在注册当天未创建首个项目即流失',
        evidence:
          '漏斗分析显示注册到创建项目的转化率仅32%，流失主要发生在注册后1小时内',
        priority: '高',
      },
      {
        insight: '完成3个核心操作的用户，留存率高达80%',
        evidence:
          '通过相关性分析发现，完成"创建项目-邀请成员-创建任务"三步的用户7日留存率达80%',
        priority: '高',
      },
      {
        insight: '用户最困惑的是"如何快速看到产品价值"',
        evidence: '20个流失用户访谈中，16人表示"不知道这个软件能帮我做什么"',
        priority: '高',
      },
    ],
    personas: [
      {
        name: '团队负责人',
        demographics: '30岁，10人团队主管',
        goals: ['提升团队协作效率', '掌握项目进度', '降低管理成本'],
        painPoints: ['现有工具分散', '信息同步不及时', '难以追踪任务进度'],
        behaviors: ['关注数据报表', '重视权限管理', '需要快速上手'],
      },
      {
        name: '个人用户',
        demographics: '26岁，自由职业者',
        goals: ['管理个人项目', '提升工作效率', '记录工作进展'],
        painPoints: ['功能过于复杂', '免费版限制多', '缺少个人场景模板'],
        behaviors: ['偏好简洁界面', '依赖移动端', '对价格敏感'],
      },
    ],
    recommendations: [
      '设计渐进式引导，根据用户角色定制 onboarding 路径',
      '在注册后1小时内通过邮件/推送引导用户创建首个项目',
      '提供行业模板，降低用户从零开始的门槛',
      '关键节点设置人工客服入口，及时解决用户困惑',
      '建立激活激励机制，奖励完成核心行为的用户',
    ],
    impact:
      '基于研究成果设计的引导体系使7日激活率从15%提升至45%，付费转化率提升3倍。',
  },
];

export default userResearches;
