// ---- 型定義 ----
export type CandidateTheme = string

export interface CandidateHighlight {
  icon: 'award' | 'users' | 'shield' | 'target' | 'book'
  text: string
}

export interface CandidateTimeline {
  year: string // '2025' / '2024-2025' など自由
  title: string // 見出し
  desc?: string // 説明（任意）
}

// ---- 表示テキスト系（プロフィール概要など） ----
export const CANDIDATE_PROFILE = {
  nameJa: '柳 大地',
  city: '鳥取市',
  born: '1989年生まれ',
  // HEROやプロフィール短文に使うサマリー（loremは後で差し替え）
  summary:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
}

// ---- チップ（重点テーマ） ----
export const CANDIDATE_THEMES: CandidateTheme[] = [
  '#元教員',
  '教育と子ども',
  'DX推進',
  '子育て支援',
  '#34歳',
  '#子ども食堂',
]

// ---- 実績・取り組み（ダイジェスト） ----
// icon は描画側で react-icons にマップします（文字キーで受け渡し）
export const CANDIDATE_HIGHLIGHTS: CandidateHighlight[] = [
  { icon: 'award', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
  { icon: 'users', text: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.' },
  { icon: 'shield', text: 'Duis aute irure dolor in reprehenderit in voluptate velit esse.' },
]

// ---- 略歴タイムライン ----
export const CANDIDATE_TIMELINE: CandidateTimeline[] = [
  {
    year: '2025',
    title: '市議選へ挑戦を表明',
    desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
  {
    year: '2022',
    title: '地域活動を開始',
    desc: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
  {
    year: '2018',
    title: '鳥取へUターン',
    desc: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco.',
  },
]
