// lib/policy.ts

export interface PolicyItem {
  title: string
  description: string
}

export interface PolicyGroup {
  title: string
  items: PolicyItem[]
}

export interface PolicyTheme {
  id: 'education' | 'governance' | 'growth'
  title: string
  description: string
  groups: PolicyGroup[]
}

export const POLICY_THEMES: PolicyTheme[] = [
  {
    id: 'education',
    title: '教育とこども',
    description: '多様な学びと子育てを、地域全体で支える。',
    groups: [
      {
        title: '学びの機会の拡充',
        items: [
          {
            title: '不登校支援の強化',
            description: 'フリースクール等との連携で多様な学びの選択肢を恒常化。',
          },
          {
            title: '放課後学習・居場所づくり',
            description: '図書館・公民館等を学習拠点として再設計。',
          },
          {
            title: '学校と地域の協働',
            description: '地域講師・企業連携の探究学習プログラムを拡大。',
          },
        ],
      },
      {
        title: '現場と家庭のサポート',
        items: [
          { title: '教員業務の負担軽減', description: '事務支援員・ICT導入で事務作業を削減。' },
          {
            title: '家庭支援ネットワーク',
            description: '相談・一時預かり・情報提供を一体化した窓口整備。',
          },
          {
            title: '教育DXの推進',
            description: '電子教材・校務クラウド・学習データ活用の標準化。',
          },
        ],
      },
      {
        title: '子育てと次世代育成',
        items: [
          { title: '保育の質と量の確保', description: '待機解消と保育人材確保のための処遇改善。' },
          {
            title: '多文化・インクルーシブ教育',
            description: '日本語学習と支援員配置で学びの障壁を解消。',
          },
          {
            title: '若者のチャレンジ支援',
            description: '地域インターン・起業体験・STEAM教育の拡充。',
          },
        ],
      },
    ],
  },
  {
    id: 'governance',
    title: '市政と組織',
    description: '財源を生み、速く動く。透明で参加できる市役所へ。',
    groups: [
      {
        title: '財源確保と財政の向上',
        items: [
          {
            title: 'ふるさと納税の戦略最適化',
            description: '返礼品設計・PR・データ分析で寄附件数と単価を最大化。',
          },
          {
            title: '企業版ふるさと納税の活用',
            description: '市の重点事業に企業投資を呼び込み、官民連携を促進。',
          },
          {
            title: '資産活用と歳入多角化',
            description: '遊休資産の利活用・ネーミングライツ・広告収入の拡張。',
          },
        ],
      },
      {
        title: '抜本的な組織改革',
        items: [
          {
            title: '意思決定の高速化',
            description: '権限委譲・決裁の段差解消・小さな実装の連続を制度化。',
          },
          {
            title: 'ジョブ型・評価改革',
            description: '成果・役割に応じた配置と越境チームで俊敏な組織へ。',
          },
          { title: '庁内横断DX', description: '共通KPI・データ連携基盤・業務プロセスの標準化。' },
        ],
      },
      {
        title: '参加と透明性',
        items: [
          {
            title: 'オープンデータと見える化',
            description: '予算・事業・効果をダッシュボードで公開。',
          },
          {
            title: '市民参加・協働の拡大',
            description: '審議会の公開・パブコメDX・市民提案枠の常設化。',
          },
          {
            title: 'AI・チャット窓口',
            description: '24時間問い合わせと申請ガイドで利便性を向上。',
          },
        ],
      },
    ],
  },
  {
    id: 'growth',
    title: '次世代成長戦略',
    description: '人・産業・環境がめぐる、持続可能な成長へ。',
    groups: [
      {
        title: '産業・観光のアップデート',
        items: [
          {
            title: 'スタートアップ・中小支援',
            description: '創業助成・アクセラ・官民実証で新事業を後押し。',
          },
          {
            title: '観光DX・長期滞在',
            description: 'データ連携・二地域居住・ワーケーション誘致。',
          },
          {
            title: 'サテライトオフィス誘致',
            description: '空き施設を多拠点ワークと人材交流の拠点へ。',
          },
        ],
      },
      {
        title: '人材・教育×産業連携',
        items: [
          {
            title: '地域インターンと就職マッチ',
            description: '高校・大学・企業の三位一体で地元定着を促進。',
          },
          {
            title: 'IT/データ人材育成',
            description: '実務型講座・資格取得支援・副業受け入れの拡大。',
          },
          {
            title: '国際人材・留学生戦略',
            description: '住居・就労支援で多様な人材の活躍を実現。',
          },
        ],
      },
      {
        title: '環境・モビリティ・基盤',
        items: [
          { title: '再エネ×地域循環', description: '太陽光・小水力・バイオマスの地産地消モデル。' },
          { title: 'MaaSと公共交通', description: 'デマンド交通・データ連携で移動の最適化。' },
          {
            title: 'データ基盤の整備',
            description: '都市OS/ID連携で行政・民間サービスの連動を実現。',
          },
        ],
      },
    ],
  },
]
