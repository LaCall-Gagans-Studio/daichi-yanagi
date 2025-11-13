// src/collections/News.ts
import type { CollectionConfig } from 'payload'

export const News: CollectionConfig = {
  slug: 'news',
  labels: {
    singular: 'お知らせ',
    plural: 'お知らせ',
  },
  admin: {
    useAsTitle: 'title',
    group: '更新情報', // サイドバーでのグルーピング名
    description: '活動記録等',
    defaultColumns: ['title', 'date', 'url', 'updatedAt'],
  },
  access: {
    read: () => true, // 公開してよいなら
  },
  fields: [
    {
      name: 'title',
      label: 'タイトル',
      type: 'text',
      required: true,
    },
    {
      name: 'date',
      label: '公開日',
      type: 'date',
      required: true,
    },
    {
      name: 'img',
      label: 'サムネイル画像',
      type: 'upload',
      relationTo: 'media', // 既存の media コレクション想定
      required: false,
    },
    {
      name: 'url',
      label: 'リンクURL',
      type: 'text',
      required: true,
    },
  ],
  defaultSort: '-date',
}
