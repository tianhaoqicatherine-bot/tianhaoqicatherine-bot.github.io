export interface Skill {
  title: string;
  competency: number;
  category: string[];
}

export interface Category {
  name: string;
  color: string;
  /** Pre-computed text color for contrast - 'dark' for light backgrounds, 'light' for dark */
  textColor: 'dark' | 'light';
}

const skills: Skill[] = [
  // 产品设计
  {
    title: 'Axure RP',
    competency: 5,
    category: ['产品设计'],
  },
  {
    title: 'Figma',
    competency: 4,
    category: ['产品设计'],
  },
  {
    title: 'Sketch',
    competency: 4,
    category: ['产品设计'],
  },
  {
    title: '墨刀',
    competency: 5,
    category: ['产品设计'],
  },
  {
    title: 'PRD撰写',
    competency: 5,
    category: ['产品设计'],
  },
  // 数据分析
  {
    title: 'SQL',
    competency: 4,
    category: ['数据分析'],
  },
  {
    title: 'Python',
    competency: 3,
    category: ['数据分析'],
  },
  {
    title: 'Excel',
    competency: 5,
    category: ['数据分析'],
  },
  // Chatbot
  {
    title: 'Gemini',
    competency: 5,
    category: ['Chatbot'],
  },
  {
    title: 'Qwen',
    competency: 4,
    category: ['Chatbot'],
  },
  {
    title: 'GLM',
    competency: 4,
    category: ['Chatbot'],
  },
  // Agent
  {
    title: 'Dify',
    competency: 5,
    category: ['Agent'],
  },
  {
    title: 'Coze',
    competency: 4,
    category: ['Agent'],
  },
  {
    title: 'OpenClaw',
    competency: 4,
    category: ['Agent'],
  },
  // AI-Coding
  {
    title: 'Claude Code',
    competency: 5,
    category: ['AI-Coding'],
  },
  {
    title: 'Trae',
    competency: 4,
    category: ['AI-Coding'],
  },
  // AIGC
  {
    title: 'ComfyUI',
    competency: 4,
    category: ['AIGC'],
  },
  {
    title: '可灵',
    competency: 4,
    category: ['AIGC'],
  },
  {
    title: 'Seedance',
    competency: 3,
    category: ['AIGC'],
  },
  {
    title: 'Nano Banana',
    competency: 3,
    category: ['AIGC'],
  },
].map((skill) => ({ ...skill, category: skill.category.sort() }));

/**
 * Category colors with pre-computed text contrast.
 * Uses CSS custom properties defined in tailwind.css for runtime styling,
 * with textColor pre-computed from the hex values for accessibility.
 */
const CATEGORY_COLORS: { color: string; textColor: 'dark' | 'light' }[] = [
  { color: 'var(--color-skill-1)', textColor: 'light' },
  { color: 'var(--color-skill-2)', textColor: 'dark' },
  { color: 'var(--color-skill-3)', textColor: 'light' },
  { color: 'var(--color-skill-4)', textColor: 'light' },
  { color: 'var(--color-skill-5)', textColor: 'dark' },
  { color: 'var(--color-skill-6)', textColor: 'dark' },
];

const FALLBACK_COLORS: { color: string; textColor: 'dark' | 'light' }[] = [
  { color: '#3896e2', textColor: 'dark' },
  { color: '#c3423f', textColor: 'light' },
  { color: '#d75858', textColor: 'light' },
  { color: '#747fff', textColor: 'light' },
  { color: '#64cb7b', textColor: 'dark' },
];

function buildCategories(skillsList: Skill[]): Category[] {
  const uniqueCategories = Array.from(
    new Set(skillsList.flatMap(({ category }) => category)),
  ).sort();

  const allColors = [...CATEGORY_COLORS, ...FALLBACK_COLORS];

  if (
    process.env.NODE_ENV === 'development' &&
    uniqueCategories.length > allColors.length
  ) {
    console.warn(
      `[skills.ts] Warning: ${uniqueCategories.length} categories but only ${allColors.length} colors defined`,
    );
  }

  return uniqueCategories.map((category, index) => {
    const colorConfig = allColors[index] ?? {
      color: '#888888',
      textColor: 'light' as const,
    };
    return {
      name: category,
      color: colorConfig.color,
      textColor: colorConfig.textColor,
    };
  });
}

const categories: Category[] = buildCategories(skills);

export { categories, skills };
