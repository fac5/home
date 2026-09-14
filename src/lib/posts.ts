/**
 * 首页「Latest Posts」的数据来源。
 *
 * 构建时（pnpm build / pnpm dev）会去读博客的 RSS，拿不到就返回空数组，
 * 页面会显示一个友好的降级状态，而不是让构建失败。
 * RSS 地址在 src/config/site.ts 里的 site.blogRss，也可以用环境变量
 * PUBLIC_BLOG_RSS 临时覆盖。
 */
import { site } from '@/config/site';

export type Post = {
  title: string;
  href: string;
  date: Date;
  summary: string;
};

const FEED_URL = (import.meta.env.PUBLIC_BLOG_RSS as string | undefined) || site.blogRss;
const FETCH_TIMEOUT_MS = 8000;
const SUMMARY_LENGTH = 76;

/** 同一次进程内只请求一次（dev 下第二次刷新会明显更快） */
let cache: Post[] | null = null;

function decodeEntities(input: string): string {
  const named: Record<string, string> = {
    amp: '&',
    lt: '<',
    gt: '>',
    quot: '"',
    apos: "'",
    nbsp: ' ',
    hellip: '…',
    mdash: '—',
    ndash: '–',
  };
  return input
    .replace(/&#x([0-9a-f]+);/gi, (_m, hex: string) => String.fromCodePoint(parseInt(hex, 16)))
    .replace(/&#(\d+);/g, (_m, dec: string) => String.fromCodePoint(Number(dec)))
    .replace(/&([a-z]+);/gi, (m, name: string) => named[name.toLowerCase()] ?? m);
}

/** 取 RSS 里某个标签的文本内容（不引入 XML 解析依赖，够用即可） */
function pickTag(chunk: string, tag: string): string {
  const match = chunk.match(new RegExp(`<${tag}(?:\\s[^>]*)?>([\\s\\S]*?)</${tag}>`, 'i'));
  if (!match) return '';
  return decodeEntities(match[1].replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1')).trim();
}

/**
 * 把 RSS 描述清理成一行纯文本。
 * 描述里既有真的 HTML，也有被转义过的 HTML（例如 &lt;div&gt;），
 * 所以先解码、再去标签，顺便去掉 Typecho 短代码和裸链接。
 */
function toPlainText(html: string): string {
  return decodeEntities(html)
    .replace(/<[^>]*>?/g, ' ')
    .replace(/\[[a-z]+[^\]]*\]/gi, ' ')
    .replace(/https?:\/\/\S+/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function truncate(text: string, max: number): string {
  if (text.length <= max) return text;
  return `${text.slice(0, max).trimEnd()}…`;
}

/** 解析 RSS 2.0 文本，按发布时间倒序返回 */
export function parseRssFeed(xml: string): Post[] {
  const items = xml.match(/<item(?:\s[^>]*)?>[\s\S]*?<\/item>/gi) ?? [];
  const posts = items
    .map((raw) => {
      const date = new Date(pickTag(raw, 'pubDate'));
      return {
        title: pickTag(raw, 'title'),
        href: pickTag(raw, 'link'),
        date,
        summary: truncate(toPlainText(pickTag(raw, 'description')), SUMMARY_LENGTH),
      };
    })
    .filter((post) => post.title && post.href && !Number.isNaN(post.date.getTime()));

  return posts.sort((a, b) => b.date.getTime() - a.date.getTime());
}

/** 拿最近的几篇文章；任何异常都会安静地降级为空数组 */
export async function getLatestPosts(limit = 3): Promise<Post[]> {
  if (cache) return cache.slice(0, limit);

  try {
    const response = await fetch(FEED_URL, {
      headers: { accept: 'application/rss+xml, application/xml, text/xml' },
      signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
    });
    if (!response.ok) throw new Error(`RSS ${response.status}`);
    cache = parseRssFeed(await response.text());
  } catch (error) {
    console.warn(`[posts] 读取博客 RSS 失败，首页将隐藏文章列表：${(error as Error).message}`);
    cache = [];
  }

  return cache.slice(0, limit);
}