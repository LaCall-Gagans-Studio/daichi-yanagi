import type { CollectionConfig } from 'payload'

export const Comments: CollectionConfig = {
  slug: 'comments',
  labels: {
    singular: 'コメント',
    plural: 'コメント',
  },
  admin: {
    useAsTitle: 'comment',
    group: '更新情報', // サイドバーでのグルーピング名
    description: 'サイトコメント',
  },
  access: {
    read: () => true,
    create: () => true,
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },
  timestamps: true,
  fields: [
    { name: 'accountId', type: 'text', required: true },

    // ★ プロフィール番号（アバター選択）
    {
      name: 'profileNumber',
      type: 'number',
      required: true,
      defaultValue: 1,
      min: 1,
      max: 12, // 用意するアバターの数に合わせて
      admin: {
        description: 'プロフィール画像番号（1〜12）',
      },
    },

    // 任意プロフィール
    {
      name: 'age',
      type: 'number',
      required: false,
      min: 0,
      max: 120,
      admin: { description: '任意。年齢' },
    },
    {
      name: 'gender',
      type: 'select',
      required: false,
      admin: { description: '任意。性別' },
      options: [
        { label: '未回答', value: 'unspecified' },
        { label: '男性', value: 'male' },
        { label: '女性', value: 'female' },
        { label: 'ノンバイナリ', value: 'nonbinary' },
        { label: 'その他', value: 'other' },
      ],
      defaultValue: 'unspecified',
    },
    {
      name: 'occupation',
      type: 'text',
      required: false,
      admin: { description: '任意。職業' },
      maxLength: 100,
    },
    {
      name: 'district',
      type: 'text',
      required: false,
      admin: { description: '任意。居住地区（例：浜坂/美保/福部 など）' },
      maxLength: 100,
    },

    { name: 'comment', type: 'textarea', required: true, maxLength: 400 },

    // 返信は運営のみ更新
    {
      name: 'reply',
      type: 'textarea',
      access: { update: ({ req }) => Boolean(req.user) },
      admin: { description: '運営からの返信' },
    },

    {
      name: 'status',
      type: 'select',
      defaultValue: 'published',
      options: [
        { label: '下書き', value: 'draft' },
        { label: '公開', value: 'published' },
        { label: '非表示', value: 'hidden' },
      ],
      index: true,
    },
  ],
}
