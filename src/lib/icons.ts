import { BadgeCheck, BookText, Boxes, Camera, FileCheck, FolderOpen, Globe, Mail, Rss, ShieldCheck } from '@lucide/astro';
import GitHubIcon from '@/components/icons/GitHubIcon.astro';
import type { SiteLink, SocialLink } from '@/config/site';

/** site.ts 里的 icon 名称 → 对应的图标组件 */
export const siteIcons = {
  blog: BookText,
  photo: Camera,
  projects: Boxes,
  files: FolderOpen,
  globe: Globe,
} satisfies Record<NonNullable<SiteLink['icon']>, unknown>;

/** socialLinks 里的 icon 名称 → 对应的图标组件（GitHub 见 icons/GitHubIcon.astro） */
export const socialIcons = {
  github: GitHubIcon,
  mail: Mail,
  rss: Rss,
} satisfies Record<NonNullable<SocialLink['icon']>, unknown>;

/**
 * 备案信息里可以填的内置图标（site.ts 的 filings）。
 * 想换成图片（例如工信部或公安部的官方图标），把 icon 写成 '/images/xxx.png' 就行。
 */
export const filingIcons = {
  shield: ShieldCheck,
  badge: BadgeCheck,
  file: FileCheck,
} satisfies Record<string, unknown>;

/** 按名字取备案图标；名字不认识就返回 undefined（页面上会退回留白占位） */
export function getFilingIcon(name: string) {
  return name in filingIcons ? filingIcons[name as keyof typeof filingIcons] : undefined;
}
