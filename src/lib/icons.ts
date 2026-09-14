import { BookText, Boxes, Camera, FolderOpen, Globe } from '@lucide/astro';
import type { SiteLink } from '@/config/site';

/** site.ts 里的 icon 名称 → 对应的图标组件 */
export const siteIcons = {
  blog: BookText,
  photo: Camera,
  projects: Boxes,
  files: FolderOpen,
  globe: Globe,
} satisfies Record<NonNullable<SiteLink['icon']>, unknown>;