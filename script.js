const homeTranslations = {
  zh: {
    title: '田昊琦 — 个人主页', description: '田昊琦的个人主页', monogram: '田', available: '正在寻找机会',
    name: '田昊琦', nameDot: '。', intro: '关注真实需求与产品体验，喜欢把复杂的问题做简单。',
    skillStrategy: '产品策略', skillInsight: '用户洞察', skillAI: 'AI 产品',
    educationLabel: '教育', educationValue: '浙江大学 · 数字金融硕士在读',
    currentLabel: '当前', currentValue: '京东 · AI 数据产品', contactLabel: '联系',
    details: '查看经历与项目', photoAlt: '田昊琦和棉花糖的生活照', infoAria: '基础信息与联系方式',
    transition: '正在进入详情', homeAria: '田昊琦首页', languageAria: '切换到英文', themeAria: '切换颜色模式'
  },
  en: {
    title: 'Catherine Tian — Portfolio', description: 'Catherine Tian’s personal portfolio', monogram: 'C', available: 'Open to opportunities',
    name: 'Catherine Tian', nameDot: '.', intro: 'I care about real user needs and thoughtful experiences, turning complex problems into simple products.',
    skillStrategy: 'Product Strategy', skillInsight: 'User Insights', skillAI: 'AI Products',
    educationLabel: 'Education', educationValue: 'Zhejiang University · M.Fin. Candidate',
    currentLabel: 'Now', currentValue: 'JD.com · AI Data Product', contactLabel: 'Contact',
    details: 'Experience & Projects', photoAlt: 'Catherine Tian with cotton candy', infoAria: 'Profile and contact information',
    transition: 'Opening details', homeAria: 'Catherine Tian home', languageAria: 'Switch to Chinese', themeAria: 'Switch color theme'
  }
};

homeTranslations.zh.resumeDownload = '下载简历';
homeTranslations.en.resumeDownload = 'Download résumé';

let currentLanguage = localStorage.getItem('site-language') === 'en' ? 'en' : 'zh';
const languageButton = document.querySelector('.language-toggle');
const themeButton = document.querySelector('.theme-toggle');
const themeLabel = document.querySelector('[data-theme-label]');

const applyHomeLanguage = (language) => {
  const copy = homeTranslations[language];
  currentLanguage = language;
  document.documentElement.lang = language === 'zh' ? 'zh-CN' : 'en';
  document.title = copy.title;
  document.querySelector('meta[name="description"]').content = copy.description;
  document.querySelectorAll('[data-i18n]').forEach((element) => {
    const value = copy[element.dataset.i18n];
    if (value) element.textContent = value;
  });
  document.querySelectorAll('[data-i18n-alt]').forEach((element) => element.alt = copy[element.dataset.i18nAlt]);
  document.querySelectorAll('[data-i18n-aria]').forEach((element) => element.setAttribute('aria-label', copy[element.dataset.i18nAria]));
  document.querySelector('.monogram').setAttribute('aria-label', copy.homeAria);
  languageButton.textContent = language === 'zh' ? 'EN' : '中文';
  languageButton.setAttribute('aria-label', copy.languageAria);
  themeButton.setAttribute('aria-label', copy.themeAria);
  updateThemeLabel();
};

const updateThemeLabel = () => {
  const isDark = document.documentElement.dataset.theme === 'dark';
  themeLabel.textContent = currentLanguage === 'zh' ? (isDark ? '亮色' : '暗色') : (isDark ? 'Light' : 'Dark');
};

languageButton.addEventListener('click', () => {
  const next = currentLanguage === 'zh' ? 'en' : 'zh';
  localStorage.setItem('site-language', next);
  applyHomeLanguage(next);
});

themeButton.addEventListener('click', () => {
  const next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
  document.documentElement.dataset.theme = next;
  localStorage.setItem('site-theme', next);
  updateThemeLabel();
});

applyHomeLanguage(currentLanguage);

const cursor = document.querySelector('.blue-cursor');
const photo = document.querySelector('[data-parallax="photo"]');
let targetX = window.innerWidth / 2;
let targetY = window.innerHeight / 2;
let cursorX = targetX;
let cursorY = targetY;

const renderCursor = () => {
  cursorX += (targetX - cursorX) * 0.24;
  cursorY += (targetY - cursorY) * 0.24;
  cursor.style.left = `${cursorX}px`;
  cursor.style.top = `${cursorY}px`;
  window.requestAnimationFrame(renderCursor);
};
renderCursor();

window.addEventListener('pointermove', (event) => {
  const x = event.clientX / window.innerWidth - 0.5;
  const y = event.clientY / window.innerHeight - 0.5;
  targetX = event.clientX;
  targetY = event.clientY;
  cursor.classList.add('visible');
  photo.style.transform = `translate(${x * 13}px, ${y * 9}px)`;
});

document.querySelectorAll('a, button').forEach((element) => {
  element.addEventListener('pointerenter', () => cursor.classList.add('hot'));
  element.addEventListener('pointerleave', () => cursor.classList.remove('hot'));
});

document.documentElement.addEventListener('mouseleave', () => cursor.classList.remove('visible'));
