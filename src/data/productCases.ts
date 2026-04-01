export interface ProductCase {
  id: string;
  title: string;
  subtitle: string;
  role: string;
  duration: string;
  company?: string;
  image: string;
  featured?: boolean;
  // 产品案例五步法
  background: {
    context: string;
    problem: string;
    goal: string;
  };
  research: {
    methods: string[];
    insights: string[];
    userPersonas?: string[];
  };
  solution: {
    strategy: string;
    keyFeatures: string[];
    designDecisions: string[];
  };
  metrics: {
    indicators: {
      label: string;
      value: string;
      change: string;
      positive: boolean;
    }[];
    summary: string;
  };
  results: {
    outcomes: string[];
    learnings: string[];
    nextSteps?: string;
  };
  // 相关链接
  links?: {
    prototype?: string;
    prd?: string;
    caseStudy?: string;
    demo?: string;
  };
}

const productCases: ProductCase[] = [
  {
    id: 'llm-visualization',
    title: '大模型推理可视化',
    subtitle: 'LLM 推理逻辑黑盒可视化系统',
    role: 'coauthor@Alvin Lau',
    duration: '',
    image: '/images/products/llm-viz.jpg',
    featured: true,
    background: {
      context:
        '撕开大模型的黑盒。我们将抽象的深度学习推理路径转化为直观、可交互的视觉流，解决 AI 决策不可解释的难题。',
      problem:
        'LLM 推理过程对开发者和用户都是黑盒，难以理解和调试；AI 决策缺乏透明度，影响结果可信度；开发者需要耗费大量时间排查模型行为。',
      goal: '提升 LLM 生成结果的可信度，降低开发者调试门槛，让 AI 决策过程一目了然。',
    },
    research: {
      methods: ['竞品分析', '开发者访谈', '可用性测试'],
      insights: [
        '开发者最关注的是注意力权重和 token 生成路径',
        '可视化需要支持多层级下钻，从概览到细节',
        '实时交互是关键，静态图表难以满足调试需求',
      ],
    },
    solution: {
      strategy:
        '构建多层级可视化系统，支持从模型架构层到神经元激活层的逐层下钻，提供实时交互和对比分析能力。',
      keyFeatures: [
        '注意力热力图：直观展示模型关注的输入区域',
        'Token 生成路径：追溯每个输出 token 的决策链',
        '神经元激活视图：查看特定神经元的激活模式',
        '多模型对比：支持不同模型的推理过程对比',
      ],
    },
    metrics: {
      indicators: [],
      summary:
        '成功将大模型推理过程可视化，显著提升开发者调试效率和模型可信度。',
    },
    results: {
      outcomes: [
        '实现多层级可视化系统，支持从模型到神经元的逐层下钻',
        '获得技术社区广泛关注，GitHub Stars 500+',
      ],
      learnings: [
        '可视化设计需要兼顾美观性和信息密度',
        '实时交互是提升用户体验的关键',
        '多模型对比功能帮助开发者快速选择最优方案',
      ],
    },
    links: {
      caseStudy: 'https://my.feishu.cn/wiki/GmdDwpqdFiatQHkN8mHcFWUYnYc',
    },
  },
  {
    id: 'puzzle-focus',
    title: '拼图——游戏化时间管理',
    subtitle: '时空拼图：基于上瘾机制的游戏化专注应用',
    role: '蚂蚁产品训练营创意 + 独立开发部署',
    duration: '',
    image: '/images/products/puzzle-focus.jpg',
    featured: true,
    background: {
      context:
        '打破传统番茄钟的枯燥感。利用经典的"收集上瘾"机制，将不可见的专注时光转化为精美的拼图碎片。',
      problem:
        '传统番茄钟缺乏趣味性，用户难以坚持；专注过程缺乏正向反馈，成就感不足；用户粘性低，长期使用率下降明显。',
      goal: '建立自律微习惯的快乐心理暗示，显著提升用户粘性和长期留存。',
    },
    research: {
      methods: ['用户行为分析', '游戏机制研究', 'A/B 测试'],
      insights: [
        '用户喜欢"收集"和"完成"的成就感',
        '视觉反馈比数字反馈更能激发用户动力',
        '社交分享可以显著提升用户留存',
      ],
    },
    solution: {
      strategy:
        '采用"收集上瘾"机制，将专注时间转化为拼图碎片，通过完成拼图给予用户成就感，建立正向反馈循环。',
      keyFeatures: [
        '专注拼图：每次专注完成获得一块拼图碎片',
        '主题套系：多套精美拼图主题，满足不同审美',
        '成就系统：解锁成就徽章，记录专注里程碑',
        '好友比拼：查看好友专注时长，增加社交动力',
      ],
    },
    metrics: {
      indicators: [],
      summary:
        '游戏化设计显著提升用户粘性和专注时长，打破传统番茄钟枯燥印象。',
    },
    results: {
      outcomes: [
        '获得 App Store 编辑推荐',
      ],
      learnings: [
        '游戏化机制需要与产品核心功能深度结合',
        '视觉反馈的设计直接影响用户成就感',
        '社交元素是提升长期留存的有效手段',
      ],
    },
    links: {
      caseStudy: 'https://my.feishu.cn/wiki/AO1ww32KcimGkGkX6hVcfJtkn7b',
    },
  },
  {
    id: 'campus-food-map',
    title: '大学城美食地图',
    subtitle: '高校美食雷达：大学城避雷与推荐地图',
    role: '独立开发部署',
    duration: '',
    image: '/images/products/food-map.jpg',
    featured: true,
    background: {
      context:
        '针对高校学生"吃什么"的终极难题。构建本地化的信息聚合与 UGC 评价体系，不仅是导航，更是提供精准的避雷参考。',
      problem:
        '高校周边餐厅信息分散，口碑难以核实；学生时间有限，试错成本高；缺少针对学生群体的本地化美食社区。',
      goal: '利用 Vibe Coding 能力，仅用一个周末即完成 MVP 的全栈开发与快速上线。',
    },
    research: {
      methods: ['用户调研', '竞品分析', 'MVP 验证'],
      insights: [
        '学生最信任学长学姐的推荐',
        '避雷信息比推荐信息更有价值',
        '地理位置和价格是学生决策的核心因素',
      ],
    },
    solution: {
      strategy:
        '构建基于 UGC 的美食评价体系，整合地图导航与口碑评价，让学生快速找到靠谱餐厅。',
      keyFeatures: [
        '地图可视化：直观展示周边餐厅分布和评分',
        'UGC 评价：学长学姐的真实评价和避雷提醒',
        '智能推荐：基于位置和偏好的个性化推荐',
        '快速导航：一键跳转高德/百度地图导航',
      ],
    },
    metrics: {
      indicators: [],
      summary:
        'Vibe Coding 快速开发，完成 MVP 上线并持续迭代优化。',
    },
    results: {
      outcomes: [
        '利用 Vibe Coding 能力，一个周末完成 MVP 开发',
        '覆盖浙江大学紫金港校区及周边餐厅',
        '持续迭代优化产品功能和用户体验',
      ],
      learnings: [
        'Vibe Coding 显著缩短 MVP 开发周期',
        'UGC 内容是本地类产品的核心竞争力',
        '学生群体对实用工具的接受度高',
      ],
    },
    links: {
      caseStudy: 'https://my.feishu.cn/wiki/DHa3wzDXAiLfoQke7MzcNO1qnFb',
    },
  },
];

export default productCases;
