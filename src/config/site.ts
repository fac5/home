/**
 * 站点统一配置。
 *
 * 想改网站名字、简介、导航、外链、首页文案，改这一个文件就够了，
 * 通常不需要动 components / pages 里的任何代码。
 */

export type NavItem = {
  label: string;
  href: string;
};

export type SiteLink = {
  title: string;
  description: string;
  href: string;
  /** 是否跳到站外 */
  external?: boolean;
  /** 卡片图标，见 src/components/SiteCard.astro 里的映射表 */
  icon?: 'blog' | 'photo' | 'projects' | 'files' | 'globe';
  /** 低调展示（用于 OpenList 这类基础设施入口） */
  muted?: boolean;
};

export const site = {
  /** 站点名，也是导航左侧的 Logo 文字 */
  name: 'Fivk',
  /** 正式域名：必须是完整地址，canonical / sitemap / OG 都依赖它 */
  url: 'https://fivk.cn',
  /** 浏览器标题 */
  title: 'Fivk — 记录生活，也记录折腾',
  /** 首页主标题下面的一句话 */
  tagline: '记录生活，也记录折腾。',
  /** SEO 描述：自然的一段话即可，不用堆关键词 */
  description:
    'Fivk 的个人主页。一个喜欢折腾技术、电影、摄影、家庭影音和服务器的人，在这里记录生活，也记录折腾。',
  author: 'Fivk',
  locale: 'zh-CN',
  /** 页脚版权起始年份 */
  startYear: 2026,
  /** 页脚版权行后半句，年份会自动用 startYear 起算；不想要就改成空字符串 '' */
  copyrightNote: 'All rights reserved.',
  /** 分享卡片图：替换 public/images/og.jpg 即可（1200×630 最好） */
  ogImage: '/images/og.jpg',
  /**
   * 是否在首页显示 Hero 图片。
   * true：Hero 是「左边文字 + 右边图片」的两列布局；
   * false：Hero 变成纯文字的单列布局（不会留下空白占位），下面的图片配置也会被忽略。
   */
  showHeroImage: false,
  /**
   * 首页 Hero 图片。
   * 把你自己的照片放到 public/images/hero.jpg，首页会自动使用它；
   * 如果这个文件不存在，则回退到内置的占位图。
   */
  heroImage: '/images/hero.jpg',
  heroImageFallback: '/images/hero-placeholder.svg',
  /** Hero 图片的 alt：换成自己的照片之后，建议改成对照片的描述（对无障碍和 SEO 都好） */
  heroImageAlt: '首页图片',
  /** 首页 Hero 下的标签 */
  heroTags: ['Technology', 'Photography', 'Movies', 'HomeLab'],
  /** 首页 About 小段落的文字，每一条是一段 */
  homeAbout: [
    '我是 Fivk，一个喜欢折腾技术，也喜欢记录生活的人。',
    '这里放着我的一些项目、照片、博客文章，以及最近正在折腾的东西。',
  ],
  /** 博客地址 */
  blogUrl: 'https://blog.fivk.cn',
  /** 博客 RSS：首页 Latest Posts 会在构建时读取它，读不到就优雅降级 */
  blogRss: 'https://blog.fivk.cn/feed/',
} as const;

/** 顶部导航（桌面端显示，移动端收进菜单） */
export const nav: NavItem[] = [
  { label: 'About', href: '/about' },
  { label: 'Projects', href: '/projects' },
  { label: 'Now', href: '/now' },
  { label: 'Uses', href: '/uses' },
  { label: 'Links', href: '/links' },
];

/**
 * 站外链接的打开方式：
 * 'blank' = 新标签页打开（默认），'same' = 当前页面打开。
 * 只管博客、相册、文件站、友情链接、项目源码这类站外地址；
 * 站内页面（/about、/projects 这些）始终在当前页打开。
 */
export const externalLinkTarget: 'blank' | 'same' = 'blank';

/** 首页 My Internet：我在互联网上的几个站点。站外地址只在这里写一次 */
export const internetSites: SiteLink[] = [
  {
    title: 'Blog',
    description: '写点技术，也记录一些生活。',
    href: 'https://blog.fivk.cn',
    external: true,
    icon: 'blog',
  },
  {
    title: 'Gallery',
    description: '用照片记录生活。',
    href: 'https://photo.fivk.cn',
    external: true,
    icon: 'photo',
  },
  {
    title: 'Projects',
    description: '一些真正做过、正在做或者长期折腾的东西。',
    href: '/projects',
    icon: 'projects',
  },
  {
    title: 'Files',
    description: '我的个人文件与资源空间。',
    href: 'https://open.fivk.cn',
    external: true,
    icon: 'files',
    muted: true,
  },
];

/**
 * 顶部导航右侧、首页 Hero 的主入口：取站外站点里没标 muted 的那两个（Blog、Gallery）。
 * 想换入口或改地址，只动上面的 internetSites 就行。
 */
export const primarySites: SiteLink[] = internetSites.filter((item) => item.external && !item.muted);

/**
 * 社交链接。
 * href 为 null 的条目不会显示在页面上——填上地址之后，页脚右侧和 Links 页会自动出现。
 */
export type SocialLink = {
  label: string;
  href: string | null;
  icon: 'github' | 'mail' | 'rss';
};

export const socialLinks: SocialLink[] = [
  // TODO: 换成你自己的 GitHub 主页，例如 https://github.com/yourname
  { label: 'GitHub', href: null, icon: 'github' },
  // TODO: 如果愿意公开邮箱，把它填在这里（例如 mailto:you@example.com）
  { label: 'Email', href: null, icon: 'mail' },
  // 博客的 RSS，默认跟着上面的 blogRss 走；不需要就删掉这一行
  { label: 'RSS', href: site.blogRss, icon: 'rss' },
];
/**
 * 备案信息（显示在页脚底部，字号最轻的那一行）。
 * 不需要就把数组改成 []，页脚会自动隐藏这一行；
 * 换备案号时只改 text 和 href，不要改结构。
 */
export type Filing = {
  text: string;
  href: string;
  /**
   * 可选图标。两种写法：
   * - 内置图标名：'shield' | 'badge' | 'file'（见 src/lib/icons.ts）
   * - 图片路径：例如 '/images/gonganbeian.png'，文件放在 public 目录下
   */
  icon?: string;
};

export const filings: Filing[] = [
  {
    text: '黔ICP备2022009864号-1',
    href: 'https://beian.miit.gov.cn/',
    icon: 'shield',
  },
  {
    text: '贵公网安备 52262702000070号',
    href: 'https://beian.mps.gov.cn/#/query/webSearch?code=52262702000070',
    icon: '/images/gonganbeian.png',
  },
];
