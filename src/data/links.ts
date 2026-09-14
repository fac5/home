/** Links 页面里的友链数据。加一行就多一个友链，不需要改页面代码。 */

export type FriendLink = {
  title: string;
  href: string;
  description?: string;
};

export const friendLinks: FriendLink[] = [
  // TODO: 在这里添加友链，例如
  // { title: '某人的博客', href: 'https://example.com', description: '一句话介绍。' },
];

/** 友链区在列表为空时显示的说明 */
export const friendLinksNote = '友链还在慢慢攒。想交换友链的话，可以在博客留言告诉我。';