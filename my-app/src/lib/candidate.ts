// src/lib/candidate.ts
// ---- 型定義 ----
export type CandidateTheme = string

export interface CandidateHighlight {
  icon: 'award' | 'users' | 'shield' | 'target' | 'book'
  text: string
}

export interface CandidateTimeline {
  year: string
  title: string
  desc?: string
}

// ▼ 追加: 詳細ページ専用のセクション（見出し＋本文＋箇条書き）
export interface CandidateDetailSection {
  id: string
  title: string
  body?: string
  bullets?: string[]
}

// ▼ 追加: Q&A
export interface CandidateQA {
  q: string
  a: string
}

// ---- 表示テキスト系（プロフィール概要など） ----
export const CANDIDATE_PROFILE = {
  nameJa: '柳 大地',
  city: '鳥取市',
  born: '1989年生まれ',
  summary:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
}

// ---- チップ（重点テーマ） ----
export const CANDIDATE_THEMES: CandidateTheme[] = [
  '#元教員',
  '#教育と子ども',
  '#DX推進',
  '#子育て支援',
  '#35歳',
  '#子ども食堂',
]

// ---- 実績・取り組み（ダイジェスト） ----
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

// Q&A：詳細ページでのみ表示
export const CANDIDATE_QA: CandidateQA[] = [
  {
    q: 'なぜ立候補を決めたのですか？',
    a: '現場で出会った「助けを求める声」に、もっと早く・確実に応えられる仕組みをつくるためです。行政・学校・地域が同じ地図で動けるようにします。',
  },
  {
    q: '最初に取り組む優先課題は？',
    a: '不登校・子育て・生活困難といった複合課題の「入口」を一本化し、伴走支援を強化します。データ連携と相談動線の見直しから始めます。',
  },
  {
    q: '行政DXは何が変わりますか？',
    a: '申請・予約・相談のオンライン化と、職員向け業務フローの可視化で、窓口の待ち時間と入力の二度手間を減らします。まずはモバイル前提で進めます。',
  },
  {
    q: '若い世代・子どもへのメッセージは？',
    a: 'あなたの声がまちを動かします。学校の外にも学びはあります。安心して相談できる仕組みを必ず整えます。',
  },
]
