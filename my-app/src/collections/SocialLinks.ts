import type { CollectionConfig } from 'payload'

export const SocialLinks: CollectionConfig = {
  slug: 'social-links',
  labels: {
    singular: 'SNSリンク',
    plural: 'SNSリンク',
  },
  admin: {
    useAsTitle: 'name',
    group: 'グローバル', // サイドバーでのグルーピング名
    description: 'グローバル',
    defaultColumns: ['name', 'url', 'order', 'active'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'name',
      label: '表示名（例: YouTube, X, Instagram）',
      type: 'text',
      required: true,
    },
    {
      name: 'url',
      label: 'URL',
      type: 'text',
      required: true,
    },
    {
      name: 'iconUrl',
      label: 'アイコン画像URL',
      type: 'text',
      required: true,
    },
    {
      name: 'bgColor',
      label: '背景色（例: #f02730 や black）',
      type: 'text',
      required: true,
      defaultValue: '#000000',
    },
    {
      name: 'borderColor',
      label: 'ボーダー色（未入力なら背景色と同じ）',
      type: 'text',
    },
    {
      name: 'order',
      label: '表示順',
      type: 'number',
      required: true,
      defaultValue: 1,
    },
    {
      name: 'active',
      label: '表示する',
      type: 'checkbox',
      defaultValue: true,
    },
  ],
}
