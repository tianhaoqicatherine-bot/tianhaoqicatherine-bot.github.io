export interface CampusActivity {
  id: string;
  role: string;
  organization: string;
  duration: string;
  description: string;
  achievements: string[];
}

const campusActivities: CampusActivity[] = [
  {
    id: 'fangke-talkshow',
    role: '演员',
    organization: '浙江大学放课脱口秀社团',
    duration: '2022.09 - 至今',
    description: '',
    achievements: [
      '创新实践：将党的理论、经济政策与基层实践融入脱口秀创作，为新昌社会实践、经济学院党课等活动撰写兼具思想性与感染力的宣讲稿，以青年话语体系提升思想政治教育的吸引力与实效性；多次参与校院级文艺汇演及主流媒体校园活动，展现新时代青年积极向上的精神风貌',
    ],
  },
  {
    id: 'zju-tv',
    role: '新闻编辑',
    organization: '浙江大学广播电视台',
    duration: '2021.09 - 2022.06',
    description: '',
    achievements: [
      '新闻采编：对于当周国内外新闻进行筛选和排序，撰写新闻广播稿件',
      '视频拍摄：构思校园纪录片拍摄大纲并参与拍摄工作，相关作品在劳动节被浙江大学后官方号发布',
    ],
  },
  {
    id: 'economics-student-union',
    role: '宣传部部长',
    organization: '浙江大学经济学院学生会',
    duration: '2022.06 - 2023.06',
    description: '',
    achievements: [
      '公众号运营：负责学院学生会公众号运营，总阅读量为208941次，单篇阅读量最高为1427次，同比增长12%',
      '宣传品设计：利用Photoshop、canvas设计新年晚会、毕业晚会的宣传品；利用云台进行宣传片拍摄，后期剪辑',
    ],
  },
  {
    id: 'party-branch-secretary',
    role: '党支部书记',
    organization: '浙江大学经济学院金融一支部',
    duration: '2025.06 - 至今',
    description: '',
    achievements: [
      '组织能力：主持10数次党组织活动，包括党日、党课、党员大会等多种形式',
      '创新能力：以开放麦作为党课形式，用生动语言讲述党员经济学家故事',
    ],
  },
  {
    id: 'part-time-counselor',
    role: '兼职辅导员',
    organization: '浙江大学经济学院',
    duration: '2023.08 - 2024.08',
    description: '',
    achievements: [
      '活动举办：组织策划500+人规模的新年晚会；协助100余人参与的女性领导力课程的开展；组织多次学院小型活动',
      '渠道整合：基于同学接受学院通知渠道杂的反馈，整合学院团学宣传渠道，推进学院学生会公众号栏目功能整合',
    ],
  },
];

export default campusActivities;
