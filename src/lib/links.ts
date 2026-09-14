import { externalLinkTarget } from '@/config/site';

/**
 * 站外链接统一用这个函数加属性：
 *
 * ```astro
 * <a href={item.href} {...externalAttrs(item.external)}>Blog</a>
 * ```
 *
 * 想全站切换「当前页打开 / 新标签页打开」，只改 site.ts 里的 externalLinkTarget，
 * 不要在组件里写死 target="_blank"。
 */
export function externalAttrs(external?: boolean): Record<string, string> {
  if (!external) return {};

  // 无论哪种打开方式都带上 noopener：新标签页更安全，当前页也没有副作用
  return externalLinkTarget === 'blank' ? { target: '_blank', rel: 'noopener' } : { rel: 'noopener' };
}