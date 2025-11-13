// src/collections/Candidates.ts
import type { CollectionConfig } from 'payload'

export const Candidates: CollectionConfig = {
  slug: 'candidates',
  admin: {
    useAsTitle: 'nameJa',
    defaultColumns: ['nameJa', 'city', 'born'],
  },
  access: {
    read: () => true,
  },
  fields: [
    // プロフィール
    {
      name: 'img',
      label: 'プロフィール画像',
      type: 'upload',
      relationTo: 'media',
      required: false,
    },
    {
      name: 'nameJa',
      label: '氏名（日本語）',
      type: 'text',
      required: true,
    },
    {
      name: 'city',
      label: '拠点（市区町村）',
      type: 'text',
      required: true,
    },
    {
      name: 'born',
      label: '生年など（表示用）',
      type: 'text',
      required: true,
    },
    {
      name: 'summary',
      label: 'プロフィール概要',
      type: 'textarea',
      required: true,
    },

    {
      name: 'vision',
      label: 'ビジョン',
      type: 'group',
      fields: [
        {
          name: 'headline',
          label: 'メイン見出し',
          type: 'textarea',
          required: true,
          defaultValue: '誰もが関われる まちづくりを。',
        },
        {
          name: 'body',
          label: '本文',
          type: 'textarea',
          required: true,
          defaultValue:
            'まちづくりの中心に、もう一度「人」を取り戻したい。すべての人が居場所と出番を感じながら暮らせる鳥取を一緒につくること……',
        },
      ],
    },

    // 重点テーマ（チップ）
    {
      name: 'themes',
      label: 'チップ（重点テーマ）',
      type: 'array',
      labels: { singular: 'テーマ', plural: 'テーマ' },
      fields: [
        {
          name: 'value',
          label: '表示テキスト',
          type: 'text',
          required: true,
        },
      ],
    },

    // 実績・取り組み（ハイライト）
    {
      name: 'highlights',
      label: '実績・取り組み（ダイジェスト）',
      type: 'array',
      labels: { singular: 'ハイライト', plural: 'ハイライト' },
      fields: [
        {
          name: 'icon',
          label: 'アイコン種別',
          type: 'select',
          required: true,
          options: [
            { label: 'トロフィー', value: 'award' },
            { label: '人々', value: 'users' },
            { label: 'シールド', value: 'shield' },
            { label: 'ターゲット', value: 'target' },
            { label: '本', value: 'book' },
          ],
          defaultValue: 'target',
        },
        {
          name: 'text',
          label: 'テキスト',
          type: 'textarea',
          required: true,
        },
      ],
    },

    // 略歴タイムライン
    {
      name: 'timeline',
      label: '略歴タイムライン',
      type: 'array',
      labels: { singular: '経歴', plural: '経歴' },
      fields: [
        {
          name: 'year',
          label: '年・年月・日付（表示用）',
          type: 'text',
          required: true,
        },
        {
          name: 'title',
          label: 'タイトル',
          type: 'text',
          required: true,
        },
        {
          name: 'desc',
          label: '補足説明',
          type: 'textarea',
        },
      ],
    },

    // Q&A
    {
      name: 'qa',
      label: 'Q&A',
      type: 'array',
      labels: { singular: 'Q&A', plural: 'Q&A' },
      fields: [
        {
          name: 'q',
          label: '質問',
          type: 'text',
          required: true,
        },
        {
          name: 'a',
          label: '回答',
          type: 'textarea',
          required: true,
        },
      ],
    },
  ],
}
