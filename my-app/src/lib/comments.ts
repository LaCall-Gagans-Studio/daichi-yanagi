// lib/comments.ts
export interface CommentItem {
  id: string
  accountId: string
  comment: string
  reply?: string
}

export const comments: CommentItem[] = [
  {
    id: 'c001',
    accountId: 'user_01',
    comment: '教育の支援をもっと手厚くしてほしいです。',
    reply: 'ご意見ありがとうございます。学校と地域の連携を拡張します。',
  },
  {
    id: 'c002',
    accountId: 'user_02',
    comment: '中心市街地の空き店舗活用は？',
    reply: '実験的ポップアップ出店の枠組みを整えます。',
  },
  {
    id: 'c003',
    accountId: 'user_03',
    comment: '子どもの居場所がもっとあると良い。',
    reply: '放課後の拠点づくりを進めます。',
  },
  {
    id: 'c004',
    accountId: 'user_04',
    comment: 'バスの本数を増やして！',
    reply: '需要に応じたダイヤ最適化を提案します。',
  },
  {
    id: 'c005',
    accountId: 'user_05',
    comment: '市役所の手続き、オンライン化を。',
    reply: '抜本的なDXで可視化と時短を進めます。',
  },
  {
    id: 'c006',
    accountId: 'user_06',
    comment: '福祉と就労の橋渡しを強化してほしい。',
    reply: '伴走型の支援スキームを導入します。',
  },
  {
    id: 'c007',
    accountId: 'user_07',
    comment: '公園の照明が暗いです。',
    reply: '優先度評価のうえ順次更新します。',
  },
  {
    id: 'c008',
    accountId: 'user_08',
    comment: '文化イベントを増やして！',
    reply: '民間と連携し回遊性の高い企画を。',
  },
  {
    id: 'c009',
    accountId: 'user_09',
    comment: '道路の段差が危ない所がある。',
    reply: '通報箇所から順次補修します。',
  },
  {
    id: 'c010',
    accountId: 'user_10',
    comment: '図書館の開館時間を延ばして。',
    reply: '人員と費用を見ながら拡張検討します。',
  },
  {
    id: 'c011',
    accountId: 'user_11',
    comment: '防災訓練の頻度を上げてほしい。',
    reply: '地域主体での年2回実施を後押しします。',
  },
  {
    id: 'c012',
    accountId: 'user_12',
    comment: '自転車レーンが欲しいです。',
    reply: '幹線から段階的に導入を進めます。',
  },
]
