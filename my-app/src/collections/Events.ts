// src/collections/Events.ts
import type { CollectionConfig } from 'payload'

export const Events: CollectionConfig = {
  slug: 'events',
  labels: {
    singular: 'イベント',
    plural: 'イベント',
  },
  admin: {
    useAsTitle: 'title',
    group: '更新情報', // サイドバーでのグルーピング名
    description: '直近のイベント予定',
    defaultColumns: ['title', 'type', 'start', 'placeName'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'type',
      label: '種類',
      type: 'select',
      required: true,
      options: [
        { label: '街頭演説', value: '街頭演説' },
        { label: 'タウンMTG', value: 'タウンMTG' },
        { label: 'ライブ', value: 'ライブ' },
        { label: 'その他', value: 'その他' },
      ],
      defaultValue: '街頭演説',
    },
    {
      name: 'title',
      label: 'タイトル',
      type: 'text',
      required: true,
    },
    {
      name: 'placeName',
      label: '会場名 / 配信プラットフォーム',
      type: 'text',
      required: true,
    },
    {
      name: 'placeAddress',
      label: '住所（任意）',
      type: 'text',
    },
    {
      name: 'start',
      label: '開始日時',
      type: 'date',
      required: true,
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
    },
    {
      name: 'end',
      label: '終了日時（任意）',
      type: 'date',
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
    },
  ],
}
