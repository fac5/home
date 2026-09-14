import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// 站点配置：改动这里之后记得同步 src/config/site.ts 里的 site.url
export default defineConfig({
  // 正式域名。canonical、sitemap、Open Graph 都依赖它，必须写完整。
  site: 'https://fivk.cn',

  // 纯静态输出：构建产物是 HTML 文件，最终部署到 Cloudflare，不需要 Node.js 常驻服务。
  output: 'static',

  integrations: [mdx(), sitemap()],

  // Tailwind CSS v4 通过 Vite 插件接入（样式入口：src/styles/global.css）
  vite: {
    plugins: [tailwindcss()],
  },

  markdown: {
    // 代码块同时输出亮色与暗色主题，切换主题时用 CSS 变量切换（见 global.css）
    shikiConfig: {
      themes: {
        light: 'github-light',
        dark: 'github-dark',
      },
      wrap: true,
    },
  },
});