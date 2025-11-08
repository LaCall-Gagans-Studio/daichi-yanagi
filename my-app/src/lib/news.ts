// libs/news.ts
export interface NewsItem {
  title: string
  date: string
  img: string
  url: string
}

export const newsData: NewsItem[] = [
  {
    title: 'サイトをリニューアルしました🙌',
    date: '2025.11.08',
    img: 'https://images.unsplash.com/photo-1559223607-a43c990c692c?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=1470',
    url: 'https://www.daichi-yanagi.com/',
  },
]

//   {
//     title: '討論会202511を開催しました。',
//     date: '2025.10.30',
//     img: 'https://images.unsplash.com/photo-1559223607-a43c990c692c?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=1470',
//     url: 'https://www.youtube.com/watch?v=XXXXXXXX',
//   },
//   {
//     title: '地域懇談会を開催しました',
//     date: '2025.10.25',
//     img: 'https://images.unsplash.com/photo-1559223607-a43c990c692c?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=1470',
//     url: 'https://www.youtube.com/watch?v=XXXXXXXX',
//   },
//   {
//     title: '市政報告会2025秋 開催決定',
//     date: '2025.10.22',
//     img: 'https://images.unsplash.com/photo-1559223607-a43c990c692c?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=1470',
//     url: 'https://www.youtube.com/watch?v=XXXXXXXX',
//   },
//   {
//     title: '新しいボランティアメンバー募集開始',
//     date: '2025.10.20',
//     img: 'https://images.unsplash.com/photo-1559223607-a43c990c692c?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=1470',
//     url: 'https://www.youtube.com/watch?v=XXXXXXXX',
//   },
//   {
//     title: '子育て支援に関する市民対話会を実施',
//     date: '2025.10.15',
//     img: 'https://images.unsplash.com/photo-1559223607-a43c990c692c?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=1470',
//     url: 'https://www.youtube.com/watch?v=XXXXXXXX',
//   },
//   {
//     title: '市議会だより秋号が発行されました',
//     date: '2025.10.12',
//     img: 'https://images.unsplash.com/photo-1559223607-a43c990c692c?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=1470',
//     url: 'https://www.youtube.com/watch?v=XXXXXXXX',
//   },
//   {
//     title: '教育と地域づくりフォーラムを開催',
//     date: '2025.10.10',
//     img: 'https://images.unsplash.com/photo-1559223607-a43c990c692c?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=1470',
//     url: 'https://www.youtube.com/watch?v=XXXXXXXX',
//   },
//   {
//     title: '地域清掃活動に参加しました',
//     date: '2025.10.08',
//     img: 'https://images.unsplash.com/photo-1559223607-a43c990c692c?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=1470',
//     url: 'https://www.youtube.com/watch?v=XXXXXXXX',
//   },
//   {
//     title: '駅前で政策ビラを配布しました',
//     date: '2025.10.05',
//     img: 'https://images.unsplash.com/photo-1559223607-a43c990c692c?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=1470',
//     url: 'https://www.youtube.com/watch?v=XXXXXXXX',
//   },
//   {
//     title: '新しい提案書を市議会に提出しました',
//     date: '2025.10.02',
//     img: 'https://images.unsplash.com/photo-1559223607-a43c990c692c?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=1470',
//     url: 'https://www.youtube.com/watch?v=XXXXXXXX',
//   },
//   {
//     title: '地域イベントで子どもと交流',
//     date: '2025.09.28',
//     img: 'https://images.unsplash.com/photo-1559223607-a43c990c692c?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=1470',
//     url: 'https://www.youtube.com/watch?v=XXXXXXXX',
//   },
//   {
//     title: '防災訓練に参加しました',
//     date: '2025.09.25',
//     img: 'https://images.unsplash.com/photo-1559223607-a43c990c692c?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=1470',
//     url: 'https://www.youtube.com/watch?v=XXXXXXXX',
//   },
//   {
//     title: '環境美化活動を行いました',
//     date: '2025.09.20',
//     img: 'https://images.unsplash.com/photo-1559223607-a43c990c692c?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=1470',
//     url: 'https://www.youtube.com/watch?v=XXXXXXXX',
//   },
//   {
//     title: '地域活性化プロジェクトが始動',
//     date: '2025.09.18',
//     img: 'https://images.unsplash.com/photo-1559223607-a43c990c692c?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=1470',
//     url: 'https://www.youtube.com/watch?v=XXXXXXXX',
//   },
//   {
//     title: '駅前トークイベントを開催しました',
//     date: '2025.09.15',
//     img: 'https://images.unsplash.com/photo-1559223607-a43c990c692c?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=1470',
//     url: 'https://www.youtube.com/watch?v=XXXXXXXX',
//   },
//   {
//     title: 'オンライン意見交換会を開催',
//     date: '2025.09.10',
//     img: 'https://images.unsplash.com/photo-1559223607-a43c990c692c?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=1470',
//     url: 'https://www.youtube.com/watch?v=XXXXXXXX',
//   },
//   {
//     title: '若者政策チームが始動しました',
//     date: '2025.09.08',
//     img: 'https://images.unsplash.com/photo-1559223607-a43c990c692c?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=1470',
//     url: 'https://www.youtube.com/watch?v=XXXXXXXX',
//   },
//   {
//     title: '地域福祉計画に関する勉強会を実施',
//     date: '2025.09.05',
//     img: 'https://images.unsplash.com/photo-1559223607-a43c990c692c?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=1470',
//     url: 'https://www.youtube.com/watch?v=XXXXXXXX',
//   },
//   {
//     title: '市政レポート2025夏を発行',
//     date: '2025.09.02',
//     img: 'https://images.unsplash.com/photo-1559223607-a43c990c692c?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=1470',
//     url: 'https://www.youtube.com/watch?v=XXXXXXXX',
//   },
//   {
//     title: '地域の声を聞く対話会を実施しました',
//     date: '2025.08.28',
//     img: 'https://images.unsplash.com/photo-1559223607-a43c990c692c?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=1470',
//     url: 'https://www.youtube.com/watch?v=XXXXXXXX',
//   },
//   {
//     title: '新しいホームページを公開しました',
//     date: '2025.08.20',
//     img: 'https://images.unsplash.com/photo-1559223607-a43c990c692c?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=1470',
//     url: 'https://www.youtube.com/watch?v=XXXXXXXX',
//   },
