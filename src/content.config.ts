import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

/**
 * YAML 会把 2026-09-14 这样的写法解析成日期对象，写成字符串也一样能用。
 * 统一在 schema 里转成 YYYY-MM-DD，页面上显示得更自然。
 */
const dateish = z
  .union([z.string(), z.date()])
  .transform((value) => (value instanceof Date ? value.toISOString().slice(0, 10) : value));

/** 项目：一个文件一个项目，放在 src/content/projects/ 下 */
const projects = defineCollection({
  loader: glob({ base: './src/content/projects', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    /** 排序用，数字越小越靠前 */
    order: z.number().default(99),
    /** 是否显示在首页 */
    featured: z.boolean().default(false),
    tags: z.array(z.string()).default([]),
    /** 项目当前状态，会显示成一个小标签 */
    status: z.enum(['active', 'wip', 'paused']).default('active'),
    /** 项目对外地址（可选） */
    link: z.url().optional(),
    /** 代码仓库地址（可选） */
    repo: z.url().optional(),
    /** 封面图（可选），例如 /images/projects/xxx.jpg */
    cover: z.string().optional(),
  }),
});

/** 单文件页面：内容就是 src/content/<name>.md，改 Markdown 即可，不用碰组件 */
const about = defineCollection({
  loader: glob({ base: './src/content', pattern: 'about.md' }),
  schema: z.object({
    title: z.string().default('About'),
    /** 页面开头的一段话 */
    lead: z.string().optional(),
    /** 兴趣标签 */
    interests: z.array(z.string()).default([]),
    updated: dateish.optional(),
  }),
});

const now = defineCollection({
  loader: glob({ base: './src/content', pattern: 'now.md' }),
  schema: z.object({
    title: z.string().default('Now'),
    /** 这一页最后更新的时间，随便写一个可读的日期字符串即可 */
    updated: dateish,
    /** 还在整理中时保持 true，页面顶部会显示一条说明 */
    draft: z.boolean().default(false),
  }),
});

const uses = defineCollection({
  loader: glob({ base: './src/content', pattern: 'uses.md' }),
  schema: z.object({
    title: z.string().default('Uses'),
    lead: z.string().optional(),
    updated: dateish.optional(),
    /** 分组展示：Computer / Audio / Home Theater / Software / Photography ... */
    groups: z
      .array(
        z.object({
          title: z.string(),
          description: z.string().optional(),
          items: z
            .array(
              z.object({
                name: z.string(),
                note: z.string().optional(),
              }),
            )
            .default([]),
        }),
      )
      .default([]),
  }),
});

export const collections = { projects, about, now, uses };