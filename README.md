# Fivk Homepage

Fivk 的个人主页，也是我在互联网里的一个统一入口。

它不做简历，也不做博客，只把散在各个子站里的东西串起来：博客、照片、文件，以及正在折腾的项目。

- 线上地址：<https://fivk.cn>
- 子站：Blog <https://blog.fivk.cn> · Gallery <https://photo.fivk.cn> · Files <https://open.fivk.cn>

## 特点

- 纯静态：构建产物就是 HTML，没有后端、没有数据库、没有登录。
- 内容与代码分离：日常只需要改 Markdown，不用碰组件。
- 深浅色主题：默认跟随系统，也可以手动切换并记住选择。
- 响应式：手机端单独调整了 Hero、卡片、导航和字号。
- SEO：canonical、Open Graph、Twitter Card、sitemap、robots.txt、JSON-LD、favicon。
- 性能：系统字体（不加载在线字体）、几乎零运行时 JS、图片走静态资源。

## 技术栈

| 用途 | 选择 |
| --- | --- |
| 框架 | [Astro](https://astro.build) 7（静态输出） |
| 语言 | TypeScript |
| 样式 | Tailwind CSS 4（通过 `@tailwindcss/vite` 接入） |
| 内容 | Markdown / MDX + Astro Content Collections |
| 图标 | [Lucide](https://lucide.dev)（`@lucide/astro`，构建期渲染成 SVG） |
| 部署 | Cloudflare（静态资源 + 自定义域名） |

## 本地运行

需要 Node.js `>= 22.12` 和 pnpm。

```bash
pnpm install   # 安装依赖
pnpm dev       # 本地开发，默认 http://localhost:4321
pnpm build     # 构建到 dist/
pnpm preview   # 本地预览构建产物
pnpm check     # TypeScript / Astro 类型检查
```

> 说明：`pnpm-workspace.yaml` 里放的是 pnpm 的配置（允许 esbuild 执行安装脚本），不是工作区声明，删掉会导致 `pnpm install` 报错。

## 部署到 Cloudflare

项目是纯静态站点，构建产物在 `dist/`，任意静态托管都能跑，这里用 Cloudflare：

1. 在 Cloudflare 控制台新建一个应用，选择 **连接到 Git 仓库**，授权并选中本仓库。
2. 构建配置：
   - Build command：`pnpm build`
   - Build output directory：`dist`
   - 环境变量：`NODE_VERSION` = `22`（Cloudflare 默认 Node 版本可能偏低，按需指定）
3. 保存并部署，之后每次 `git push` 都会自动构建部署。
4. 在项目的 **Domains / Custom domains** 里添加 `fivk.cn`，DNS 在同一个 Cloudflare 账号下会自动配好；HTTPS 由 Cloudflare 自动签发。

Cloudflare 的界面偶尔会调整，如果找不到对应入口，按「Git 集成 + 构建命令 `pnpm build` + 输出目录 `dist`」这三个关键点配置即可。

## 项目结构

```text
.
├── public/
│   ├── images/
│   │   ├── hero-placeholder.svg   # 首页图片的占位图（有 hero.jpg 时不会用到）
│   │   ├── gonganbeian.png        # 公安备案图标
│   │   └── og.jpg                 # 分享卡片图（1200×630）
│   ├── favicon.svg                # 站点图标
│   └── robots.txt
├── src/
│   ├── components/                # Header / Footer / Hero / 各种 Card
│   │   └── icons/                 # Lucide 里没有的图标（目前只有 GitHub）
│   ├── config/
│   │   └── site.ts                # ★ 站点配置：名字、简介、导航、外链、社交链接
│   ├── content/
│   │   ├── projects/              # 项目，一个文件一个项目
│   │   ├── about.md               # About 页面正文
│   │   ├── now.md                 # Now 页面正文
│   │   └── uses.md                # Uses 页面数据
│   ├── data/
│   │   └── links.ts               # 友链列表
│   ├── layouts/
│   │   └── BaseLayout.astro       # 全站布局、SEO meta、主题脚本
│   ├── lib/                       # 工具：RSS、日期、图标、资源判断
│   ├── pages/                     # 路由
│   │   ├── index.astro            # 首页
│   │   ├── about.astro
│   │   ├── projects/              # 列表 + [slug] 详情
│   │   ├── now.astro
│   │   ├── uses.astro
│   │   ├── links.astro
│   │   └── 404.astro
│   ├── styles/global.css          # 颜色变量、排版、动画、Markdown 样式
│   └── content.config.ts          # Content Collections 的字段定义
├── astro.config.mjs
├── pnpm-workspace.yaml
└── tsconfig.json
```

## 内容怎么改

日常维护基本只用改 Markdown 和 `src/config/site.ts`，不需要动组件。

### 换首页图片

把照片放到 `public/images/hero.jpg`，首页会自动使用它；文件不存在时用内置占位图，所以不会出现裂图。建议竖构图（约 4:5），宽度 1600px 左右。

顺便把 `src/config/site.ts` 里的 `heroImageAlt` 改成对这张照片的描述，对无障碍和 SEO 都有好处。

### 关掉首页大图

不想在首页放照片时，把 `src/config/site.ts` 里的 `showHeroImage` 改成 `false`：

```ts
showHeroImage: true,   // true = 左边文字 + 右边图片；false = 纯文字单列
```

关闭后 Hero 会自动变成单列的纯文字排版（手机端和桌面端都重新算过间距，不会留下空位），`heroImage`、`heroImageAlt` 这些配置会被忽略。

### 改站点信息

`src/config/site.ts` 是唯一的站点配置入口：

- `site`：站名、标题、简介、域名、首页文案、RSS 地址
- `nav`：顶部导航
- `internetSites`：首页「My Internet」的卡片
- `heroActions`：首页 Hero 的两个主入口
- `socialLinks`：社交链接（`href` 为 `null` 时不会显示，填上之后会出现在页脚右侧和 /links 页面的 Me 区块）
- `filings`：页脚底部那行小字的备案信息（ICP 备案、公安备案），不需要就把数组改成 `[]`

### 页脚（Footer）

页脚在 `src/components/Footer.astro`，内容全部来自 `src/config/site.ts`，平时不用动组件：

```text
Fivk                    EXPLORE       MY INTERNET          [RSS] [↑]
记录生活，也记录折腾。    About         Blog ↗
                        Projects      Gallery ↗
                        Now           Files ↗
                        Uses
                        Links
──────────────────────────────────────────────────────────────────
© 2026 Fivk                        黔ICP备…        贵公网安备…
```

- 左侧品牌：`site.name` + `site.tagline`
- 中间两列：`nav`（站内导航）、`internetSites` 中 `external: true` 的条目（站外站点）
- 右侧图标：`socialLinks` 里填了 `href` 的条目，RSS 默认跟着 `site.blogRss` 走
- 最底部：`site.startYear` 起算的年份 + `filings` 备案信息，字号和颜色都比正文更轻
- 返回顶部按钮用原生 JS 实现（`src/components/Footer.astro` 底部），页面短到不用滚动时会自动隐藏，没有引入任何依赖
- 手机上会变成「品牌 → 两列导航 → 图标」的堆叠排版，同一份代码，不需要单独维护

### 改备案信息

页脚底部那行小字来自 `src/config/site.ts` 的 `filings`，换备案号只改 `text` 和 `href`：

```ts
export const filings: Filing[] = [
  { text: '黔ICP备2022009864号-1', href: 'https://beian.miit.gov.cn/' },
  {
    text: '贵公网安备 52262702000070号',
    href: 'https://beian.mps.gov.cn/#/query/webSearch?code=52262702000070',
    icon: '/images/gonganbeian.png', // 小警徽图标，放在 public/images/ 下
  },
];
```

公安备案的图标放在 `public/images/gonganbeian.png`（现在仓库里的是从公安部备案系统取的官方图标）。把 `icon` 去掉就只显示文字，不会出现裂图。

### 加 / 改项目

在 `src/content/projects/` 下新建一个 `.md` 文件：

```md
---
title: 项目名
description: 一句话介绍
order: 5            # 排序，数字越小越靠前
featured: true      # 是否显示在首页
status: active      # active / wip / paused
tags: [Docker, Linux]
link: https://example.com   # 可选，项目地址
repo: https://github.com/... # 可选，源码地址
---

正文写 Markdown 就行。
```

### 更新 Now / About / Uses

- `src/content/now.md`：`##` 标题就是页面上的一段（Currently Building、Photography…）。写完把 frontmatter 里的 `draft` 改成 `false`，页面顶部那条「还在整理中」的提示就会消失。
- `src/content/about.md`：`Who is Fivk`、`This website` 两段正文 + `interests` 兴趣标签。
- `src/content/uses.md`：按分组维护 `groups`，每组一个 `items` 列表；`items` 留空时页面上显示「待补充」。

### 加友链

编辑 `src/data/links.ts`，往 `friendLinks` 数组里加一条即可。

### 首页的最新文章

`src/lib/posts.ts` 会在**构建时**读取 `https://blog.fivk.cn/feed/`，按时间取最新几篇显示。读不到时（比如构建机没有网络）首页会显示一个引导去博客的降级状态，构建不会失败。

RSS 地址在 `src/config/site.ts` 的 `site.blogRss`，也可以用环境变量 `PUBLIC_BLOG_RSS` 临时覆盖。要改成抓别的数据源，只需要替换 `getLatestPosts()` 的实现。

### 首页「Latest Posts」之外的子站数据

Gallery、Files 目前只做入口跳转，不复制子站内容。以后需要的话，可以在 `src/lib/` 里加一个数据模块，再在页面里替换掉卡片。

## 风格约定

- 颜色只在 `src/styles/global.css` 的 `:root` / `.dark` 里定义，组件里用 `bg-canvas`、`text-ink-soft`、`border-line` 这类语义化类名，不写死颜色值。
- 字体只用系统字体（含中文系统字体），不加载在线字体，保证国内访问速度。
- 动画只做轻微的淡入、hover 位移和图片缩放，并遵循 `prefers-reduced-motion`。
- 不在站点里出现服务器地址、端口、账号、密码等任何敏感信息。

## 环境变量

默认不需要任何环境变量。可选项见 `.env.example`，需要时复制成 `.env`（已被 `.gitignore` 忽略）。

请不要把任何密钥、Token、服务器地址提交到仓库。

## License

内容（文字、照片）版权归 Fivk 所有；代码部分可自用参考。
