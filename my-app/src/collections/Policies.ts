// src/collections/Policies.ts
import type { CollectionConfig } from 'payload'

export const Policies: CollectionConfig = {
  slug: 'policies',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['themeId', 'title'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'themeId',
      label: 'テーマID',
      type: 'select',
      required: true,
      options: [
        { label: '教育とこども', value: 'education' },
        { label: '市政と組織運営', value: 'governance' },
        { label: '次世代成長戦略・まちづくり', value: 'growth' },
      ],
      defaultValue: 'education',
    },
    {
      name: 'title',
      label: 'テーマタイトル',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      label: '説明',
      type: 'textarea',
      required: true,
    },
    {
      name: 'groups',
      label: 'グループ',
      type: 'array',
      minRows: 1,
      labels: {
        singular: 'グループ',
        plural: 'グループ',
      },
      fields: [
        {
          name: 'title',
          label: 'グループタイトル',
          type: 'text',
          required: true,
        },
        {
          name: 'items',
          label: '政策項目',
          type: 'array',
          minRows: 1,
          fields: [
            {
              name: 'title',
              label: '政策タイトル',
              type: 'text',
              required: true,
            },
            {
              name: 'description',
              label: '説明',
              type: 'textarea',
              required: true,
            },
          ],
        },
      ],
    },
  ],
}
