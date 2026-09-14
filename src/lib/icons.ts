import { BookText, Boxes, Camera, FolderOpen, Globe, Mail, Rss } from '@lucide/astro';
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
