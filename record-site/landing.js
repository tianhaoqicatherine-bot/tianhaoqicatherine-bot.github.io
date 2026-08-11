const menu = document.querySelector('.mobile-menu');
const nav = document.querySelector('.nav-links');
const themeToggle = document.querySelector('#landingThemeToggle');
const languageToggle = document.querySelector('#landingLanguageToggle');
const dayNightTransition = document.querySelector('#dayNightTransition');
let dayNightTimer;
let extensionDownloadEnabled = true;

menu?.addEventListener('click', () => {
  nav?.classList.toggle('open');
  const open = nav?.classList.contains('open') || false;
  const english = document.documentElement.lang === 'en';
  menu.setAttribute('aria-expanded', String(open));
  menu.setAttribute('aria-label', english
    ? (open ? 'Close menu' : 'Open menu')
    : (open ? '关闭菜单' : '打开菜单'));
});

nav?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    menu?.setAttribute('aria-expanded', 'false');
    menu?.setAttribute('aria-label', document.documentElement.lang === 'en' ? 'Open menu' : '打开菜单');
  });
});

function applyLandingTheme(theme, animate = false) {
  const light = theme === 'light';
  document.body.classList.toggle('light-landing', light);
  if (themeToggle) {
    const english = document.documentElement.lang === 'en';
    themeToggle.classList.toggle('is-light', light);
    themeToggle.setAttribute('aria-label', english
      ? (light ? 'Switch to dark mode' : 'Switch to light mode')
      : (light ? '切换到深色模式' : '切换到亮色模式'));
    themeToggle.querySelector('.theme-icon').textContent = light ? '☾' : '☼';
    themeToggle.querySelector('.theme-label').textContent = light ? 'DARK' : 'LIGHT';
  }
  localStorage.setItem('flow_recorder_landing_theme', light ? 'light' : 'dark');
  if (animate && themeToggle) {
    themeToggle.classList.remove('theme-flip');
    void themeToggle.offsetWidth;
    themeToggle.classList.add('theme-flip');
    window.setTimeout(() => themeToggle.classList.remove('theme-flip'), 800);
  }
}

applyLandingTheme(localStorage.getItem('flow_recorder_landing_theme') || 'dark');

function playDayNightTransition(theme) {
  if (!dayNightTransition || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    applyLandingTheme(theme, true);
    return;
  }
  clearTimeout(dayNightTimer);
  dayNightTransition.className = `day-night-transition ${theme === 'light' ? 'to-light' : 'to-dark'}`;
  void dayNightTransition.offsetWidth;
  dayNightTransition.classList.add('is-running');
  if (themeToggle) themeToggle.disabled = true;
  window.setTimeout(() => applyLandingTheme(theme, true), 390);
  dayNightTimer = window.setTimeout(() => {
    dayNightTransition.className = 'day-night-transition';
    if (themeToggle) themeToggle.disabled = false;
  }, 1150);
}

themeToggle?.addEventListener('click', () => playDayNightTransition(document.body.classList.contains('light-landing') ? 'dark' : 'light'));

const landingCopy = {
  zh: {
    'nav:nth-child(1)': '能力', 'nav:nth-child(2)': '怎么用', 'nav:nth-child(3)': '适用场景', 'nav:nth-child(4)': '安装指南',
    '.nav-workspace': '打开工作台 <b>↗</b>', '.hero-copy .eyebrow': 'PRODUCT FLOW SYSTEM FOR TEAMS',
    '.hero-copy h1': '把一次操作，<br /><em>变成可复用的流程。</em>',
    '.hero-lead': '记录网页、捕捉关键画面、自动生成产品文案，让复杂的使用路径变成任何人都能跟随的清晰指引。',
    '.hero-actions .button-maintenance': '插件维护中，暂不开放下载 <span>⌁</span>',
    '.hero-meta': '<span class="status-dot"></span> 在线协作 · 流程资产持续复用 <span class="meta-divider"></span> 支持 Markdown / 视频导出',
    '.mock-sidebar small': '我的流程', '.mock-sidebar .mock-item:nth-of-type(1)': '▣ 新建数据看板', '.mock-sidebar .mock-item:nth-of-type(2)': '☆ 客户开户流程', '.mock-sidebar .mock-item:nth-of-type(3)': '◇ 流程广场', '.mock-editor-head span': '新建数据看板', '.mock-editor-head b': '只读分享', '.mock-step:nth-of-type(2) small': '打开页面', '.mock-step:nth-of-type(2) strong': '进入数据工作台，找到「指标分析」', '.mock-step:nth-of-type(3) small': '点击操作', '.mock-step:nth-of-type(3) strong': '选择需要展示的业务指标', '.mock-step:nth-of-type(4) small': '完成设置', '.mock-step:nth-of-type(4) strong': '点击保存，生成新的报表', '.float-capture b': '记录中', '.float-capture small': '捕捉到第 02 步', '.float-share b': '一键分享', '.float-share small': '只读流程已生成',
    '.proof-strip > span': '为产品团队打造', '.proof-items': '<span>产品演示</span><i></i><span>客服培训</span><i></i><span>内部 SOP</span><i></i><span>功能验收</span><i></i><span>知识沉淀</span>',
    '#capabilities .section-heading h2': '让流程从“被记录”<br /><span>走向“被复用”。</span>', '#capabilities .section-heading > p': '从真实操作中提炼结构化信息，连接记录、编辑、引导、分享和讲解视频。',
    '.feature-card:nth-child(1) h3': '像平常一样操作', '.feature-card:nth-child(1) p': '浏览器插件记录页面跳转、点击、输入、快捷键和光标位置，浮窗自动避开截图。',
    '.feature-card:nth-child(2) h3': '把技术动作说成人话', '.feature-card:nth-child(2) p': '调整步骤、补充文案、选择元素或手动框选。每个步骤都能被产品经理重新定义。',
    '.feature-card:nth-child(3) h3': '让流程真正流动起来', '.feature-card:nth-child(3) p': '生成固定版本的只读分享链接，支持引导回放、Markdown 导出和有效期管理。',
    '.feature-card:nth-child(4) h3': '一条流程，多种表达', '.feature-card:nth-child(4) p': '把截图、动态光标、字幕和语音合成为讲解视频，快速做出有节奏的产品演示。',
    '#how-it-works .section-heading h2': '三步，建立你的<br /><span>产品流程资产。</span>',
    '.timeline article:nth-child(1) h3': '记录一次', '.timeline article:nth-child(1) p': '打开你要演示的页面，像平时一样完成一遍操作。',
    '.timeline article:nth-child(2) h3': '编辑成稿', '.timeline article:nth-child(2) p': '修改步骤文案，补齐定位方式，选择要不要保留截图。',
    '.timeline article:nth-child(3) h3': '分享出去', '.timeline article:nth-child(3) p': '回放、导出、生成视频，或者分享一个只读版本给团队和客户。',
    '#use-cases .use-copy h2': '产品经理的<br /><span>第二双手。</span>', '#use-cases .use-copy p': '不用写代码，也不用反复截图。把一次真实操作，沉淀成可沟通、可交付、可复用的产品资产。', '#use-cases .text-link': '进入团队工作台 <span>→</span>',
    '#install .section-heading h2': '插件正在维护，<br /><span>下载暂时关闭。</span>', '#install .install-download': '维护中 <span>⌁</span>',
    '#install .install-card:nth-child(1) h3': '等待维护完成', '#install .install-card:nth-child(1) p': '当前版本正在修护和验证，插件安装包暂不对外提供。', '#install .install-card:nth-child(1) small': '恢复下载后会在这里重新开放',
    '#install .install-card:nth-child(2) h3': '打开扩展管理', '#install .install-card:nth-child(2) p': '在 Chrome 地址栏输入 <code>chrome://extensions</code>，打开右上角的「开发者模式」。', '#install .install-card:nth-child(2) small': 'Chrome / Edge 均可使用',
    '#install .install-card:nth-child(3) h3': '加载已解压扩展', '#install .install-card:nth-child(3) p': '点击「加载已解压的扩展程序」，选择刚刚解压后的 <code>extension</code> 文件夹。', '#install .install-card:nth-child(3) small': '安装后刷新目标网页即可开始录制',
    '.install-note p': '<b>第一次使用？</b> 安装完成后，点击浏览器工具栏里的 Flow Recorder 图标，输入流程名称，点击「开始录制」。', '.install-note a': '打开工作台 →',
    '.final-cta h2': '别只告诉别人怎么做。<br /><em>让他们跟着做一遍。</em>', '.final-cta .button-maintenance': '插件维护中 <span>⌁</span>', '.final-cta .button-ghost': '已安装？打开工作台 <span>→</span>', '.site-footer > span:nth-child(2)': '让每一次操作都可复用。', '.site-footer > span:nth-child(3)': '在线工作区 · 2026'
  },
  en: {
    'nav:nth-child(1)': 'Capabilities', 'nav:nth-child(2)': 'How it works', 'nav:nth-child(3)': 'Use cases', 'nav:nth-child(4)': 'Install',
    '.nav-workspace': 'Open workspace <b>↗</b>', '.hero-copy .eyebrow': 'PRODUCT FLOW SYSTEM FOR TEAMS',
    '.hero-copy h1': 'Turn one action<br /><em>into a reusable flow.</em>',
    '.hero-lead': 'Capture web actions, key frames, and product copy automatically—so complex paths become clear instructions anyone can follow.',
    '.hero-actions .button-maintenance': 'Extension under maintenance <span>⌁</span>',
    '.hero-meta': '<span class="status-dot"></span> Team collaboration · Reusable flow assets <span class="meta-divider"></span> Markdown / video export',
    '.mock-sidebar small': 'MY FLOWS', '.mock-sidebar .mock-item:nth-of-type(1)': '▣ New dashboard', '.mock-sidebar .mock-item:nth-of-type(2)': '☆ Customer onboarding', '.mock-sidebar .mock-item:nth-of-type(3)': '◇ Flow marketplace', '.mock-editor-head span': 'New dashboard', '.mock-editor-head b': 'Read-only share', '.mock-step:nth-of-type(2) small': 'Open page', '.mock-step:nth-of-type(2) strong': 'Enter the data workspace and find “Metric analysis”', '.mock-step:nth-of-type(3) small': 'Click action', '.mock-step:nth-of-type(3) strong': 'Choose the business metrics to display', '.mock-step:nth-of-type(4) small': 'Finish setup', '.mock-step:nth-of-type(4) strong': 'Save and view the new report', '.float-capture b': 'Recording', '.float-capture small': 'Captured step 02', '.float-share b': 'One-click share', '.float-share small': 'Read-only flow ready',
    '.proof-strip > span': 'Built for product teams', '.proof-items': '<span>Product demos</span><i></i><span>Customer training</span><i></i><span>Internal SOPs</span><i></i><span>Feature QA</span><i></i><span>Knowledge sharing</span>',
    '#capabilities .section-heading h2': 'Move flows from “recorded”<br /><span>to “reusable”.</span>', '#capabilities .section-heading > p': 'Turn real actions into structured assets across recording, editing, guidance, sharing, and tutorial videos.',
    '.feature-card:nth-child(1) h3': 'Operate as usual', '.feature-card:nth-child(1) p': 'The browser extension captures navigation, clicks, input, shortcuts, and cursor position while keeping the overlay out of screenshots.',
    '.feature-card:nth-child(2) h3': 'Turn technical actions into plain language', '.feature-card:nth-child(2) p': 'Adjust steps, add copy, select elements, or draw a region manually. Product managers can redefine every step.',
    '.feature-card:nth-child(3) h3': 'Keep flows moving', '.feature-card:nth-child(3) p': 'Create fixed read-only share links with guided playback, Markdown export, and expiration management.',
    '.feature-card:nth-child(4) h3': 'One flow, many formats', '.feature-card:nth-child(4) p': 'Combine screenshots, animated cursors, captions, and voiceover into polished product tutorials.',
    '#how-it-works .section-heading h2': 'Three steps to build<br /><span>your flow library.</span>',
    '.timeline article:nth-child(1) h3': 'Record once', '.timeline article:nth-child(1) p': 'Open the page you want to demonstrate and complete the task as usual.',
    '.timeline article:nth-child(2) h3': 'Edit the draft', '.timeline article:nth-child(2) p': 'Rewrite step copy, complete targeting details, and choose whether to keep screenshots.',
    '.timeline article:nth-child(3) h3': 'Share it', '.timeline article:nth-child(3) p': 'Replay, export, generate a video, or share a read-only version with your team and customers.',
    '#use-cases .use-copy h2': 'A product manager’s<br /><span>second pair of hands.</span>', '#use-cases .use-copy p': 'No code and no endless screenshots. Turn one real interaction into a product asset that is easy to communicate, deliver, and reuse.', '#use-cases .text-link': 'Open team workspace <span>→</span>',
    '#install .section-heading h2': 'Extension maintenance<br /><span>downloads are paused.</span>', '#install .install-download': 'Maintenance <span>⌁</span>',
    '#install .install-card:nth-child(1) h3': 'Wait for maintenance', '#install .install-card:nth-child(1) p': 'The current build is being repaired and verified, so the package is temporarily unavailable.', '#install .install-card:nth-child(1) small': 'Downloads will reopen here when ready',
    '#install .install-card:nth-child(2) h3': 'Open extension settings', '#install .install-card:nth-child(2) p': 'Enter <code>chrome://extensions</code> in Chrome, then turn on “Developer mode”.', '#install .install-card:nth-child(2) small': 'Works with Chrome and Edge',
    '#install .install-card:nth-child(3) h3': 'Load the unpacked extension', '#install .install-card:nth-child(3) p': 'Click “Load unpacked” and choose the <code>extension</code> folder you just unzipped.', '#install .install-card:nth-child(3) small': 'Refresh the target page after installation',
    '.install-note p': '<b>First time here?</b> After installing, click the Flow Recorder icon in your browser toolbar, enter a flow name, and click “Start recording”.', '.install-note a': 'Open workspace →',
    '.final-cta h2': 'Don’t just tell people how.<br /><em>Let them follow along.</em>', '.final-cta .button-maintenance': 'Extension under maintenance <span>⌁</span>', '.final-cta .button-ghost': 'Already installed? Open workspace <span>→</span>', '.site-footer > span:nth-child(2)': 'Make every flow reusable.', '.site-footer > span:nth-child(3)': 'Online workspace · 2026'
  }
};

function renderExtensionDownloadControls() {
  const english = document.documentElement.lang === 'en';
  const labels = extensionDownloadEnabled
    ? {
        hero: english ? 'Download & see how to install <span class="download-dot">↓</span>' : '下载插件并查看安装方法 <span class="download-dot">↓</span>',
        install: english ? 'Download Chrome extension <span>↓</span>' : '下载 Chrome 插件 <span>↓</span>',
        final: english ? 'Download & see how to install <span class="download-dot">↓</span>' : '下载插件并查看安装方法 <span class="download-dot">↓</span>'
      }
    : {
        hero: english ? 'Extension under maintenance <span>⌁</span>' : '插件维护中，暂不开放下载 <span>⌁</span>',
        install: english ? 'Maintenance <span>⌁</span>' : '维护中 <span>⌁</span>',
        final: english ? 'Extension under maintenance <span>⌁</span>' : '插件维护中 <span>⌁</span>'
      };
  document.querySelectorAll('.extension-download-control').forEach((control) => {
    const role = control.dataset.downloadRole;
    control.innerHTML = labels[role] || labels.hero;
    control.classList.toggle('button-maintenance', !extensionDownloadEnabled);
    control.classList.toggle('button-primary', extensionDownloadEnabled);
    control.setAttribute('aria-disabled', String(!extensionDownloadEnabled));
    if (extensionDownloadEnabled) control.href = role === 'install' ? '/api/extension/download' : '#install';
    else control.removeAttribute('href');
  });
  const eyebrow = document.querySelector('#install .eyebrow');
  const heading = document.querySelector('#install .section-heading h2');
  const firstCard = document.querySelector('#install .install-card:nth-child(1)');
  if (eyebrow) eyebrow.innerHTML = `<i></i> ${extensionDownloadEnabled ? 'GET STARTED IN 3 MINUTES' : 'EXTENSION MAINTENANCE'}`;
  if (heading) heading.innerHTML = extensionDownloadEnabled
    ? (english ? 'Download first,<br /><span>then install.</span>' : '下载之后，<br /><span>这样安装。</span>')
    : (english ? 'Extension maintenance<br /><span>downloads are paused.</span>' : '插件正在维护，<br /><span>下载暂时关闭。</span>');
  if (firstCard) {
    firstCard.querySelector('.install-symbol').textContent = extensionDownloadEnabled ? '↓' : '⌁';
    firstCard.querySelector('h3').textContent = extensionDownloadEnabled
      ? (english ? 'Download the package' : '下载插件包')
      : (english ? 'Wait for maintenance' : '等待维护完成');
    firstCard.querySelector('p').textContent = extensionDownloadEnabled
      ? (english ? 'Click download to get a ZIP file, then unzip it into a permanent folder on your computer.' : '点击下载按钮，得到一个 ZIP 压缩包。先将它解压到电脑上的固定文件夹。')
      : (english ? 'The current build is being repaired and verified, so the package is temporarily unavailable.' : '当前版本正在修护和验证，插件安装包暂不对外提供。');
    firstCard.querySelector('small').textContent = extensionDownloadEnabled
      ? (english ? 'Tip: do not install directly from the ZIP file' : '建议：不要直接在压缩包内安装')
      : (english ? 'Downloads will reopen here when ready' : '恢复下载后会在这里重新开放');
  }
}

function applyLandingLanguage(language) {
  const copy = landingCopy[language] || landingCopy.zh;
  const githubLink = document.querySelector('.hero-github-link');
  const navLinks = document.querySelectorAll('.nav-links > a:not(.nav-workspace)');
  ['nav:nth-child(1)', 'nav:nth-child(2)', 'nav:nth-child(3)', 'nav:nth-child(4)'].forEach((selector, index) => {
    const value = copy[selector];
    if (value && navLinks[index]) navLinks[index].textContent = value;
  });
  Object.entries(copy).forEach(([selector, value]) => {
    if (selector.startsWith('nav:nth-child')) return;
    document.querySelectorAll(selector).forEach((node) => { node.innerHTML = value; });
  });
  document.documentElement.lang = language === 'en' ? 'en' : 'zh-CN';
  if (githubLink) {
    githubLink.innerHTML = language === 'en' ? 'View on GitHub <span>↗</span>' : '查看 GitHub 仓库 <span>↗</span>';
    githubLink.setAttribute('aria-label', language === 'en' ? 'View the Flow Recorder GitHub repository' : '查看 Flow Recorder GitHub 仓库');
  }
  if (languageToggle) {
    languageToggle.textContent = language === 'en' ? '中' : 'EN';
    languageToggle.setAttribute('aria-label', language === 'en' ? '切换到中文' : 'Switch to English');
  }
  if (menu) {
    const open = nav?.classList.contains('open') || false;
    menu.textContent = language === 'en' ? 'Menu' : '菜单';
    menu.setAttribute('aria-label', language === 'en'
      ? (open ? 'Close menu' : 'Open menu')
      : (open ? '关闭菜单' : '打开菜单'));
  }
  renderExtensionDownloadControls();
  applyLandingTheme(document.body.classList.contains('light-landing') ? 'light' : 'dark');
  localStorage.setItem('flow_recorder_landing_language', language);
}

applyLandingLanguage(localStorage.getItem('flow_recorder_landing_language') || 'zh');
fetch('/api/extension/status', { cache: 'no-store' })
  .then((response) => response.ok ? response.json() : null)
  .then((result) => {
    extensionDownloadEnabled = result?.downloadEnabled === true;
    renderExtensionDownloadControls();
  })
  .catch(() => renderExtensionDownloadControls());
languageToggle?.addEventListener('click', () => applyLandingLanguage(document.documentElement.lang === 'en' ? 'zh' : 'en'));

const cards = document.querySelectorAll('.feature-card, .timeline article, .collage-card');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (!reduceMotion && 'IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = entry.target.dataset.originalTransform || 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  cards.forEach((card, index) => {
    card.dataset.originalTransform = card.style.transform || '';
    card.style.opacity = '0';
    card.style.transform = 'translateY(18px)';
    card.style.transition = 'opacity .55s ease ' + (index * 45) + 'ms, transform .55s ease ' + (index * 45) + 'ms';
    observer.observe(card);
  });
}

