import { existsSync } from 'node:fs';
import { join } from 'node:path';

/**
 * 判断 public 目录下是否真的有这个文件。
 *
 * 用途：首页 Hero 和分享图都希望「你把照片丢进 public/images/ 就会自动生效」，
 * 所以在构建时检查文件是否存在，不存在就用内置占位图，避免出现裂图。
 */
export function assetIfExists(publicPath: string, fallback?: string): string | undefined {
  const relative = publicPath.replace(/^\/+/, '');
  return existsSync(join(process.cwd(), 'public', relative)) ? publicPath : fallback;
}