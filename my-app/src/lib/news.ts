// libs/news.ts
export interface NewsItem {
  title: string
  date: string
  img: string
  url: string
}

export const newsData: NewsItem[] = [
  {
    title: 'Youtube動画を公開しました',
    date: '2025.11.01',
    img: 'https://images.unsplash.com/photo-1559223607-a43c990c692c?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=1470',
    url: 'https://www.youtube.com/watch?v=XXXXXXXX',
  },
  {
    title: '討論会202511を開催しました。',
    date: '2025.10.30',
    img: 'https://images.unsplash.com/photo-1584697964388-f03e5c52c3d6?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=1470',
    url: '/news/debate-202511',
  },
  {
    title: '地域懇談会を開催しました',
    date: '2025.10.25',
    img: 'https://images.unsplash.com/photo-1593113598332-cd63fc865e02?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=1470',
    url: '/news/community-meeting',
  },
  {
    title: '市政報告会2025秋 開催決定',
    date: '2025.10.22',
    img: 'https://images.unsplash.com/photo-1606761568499-6d2451b23c9a?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=1470',
    url: '/news/report-autumn',
  },
  {
    title: '新しいボランティアメンバー募集開始',
    date: '2025.10.20',
    img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=1470',
    url: '/news/volunteer',
  },
  {
    title: '子育て支援に関する市民対話会を実施',
    date: '2025.10.15',
    img: 'https://images.unsplash.com/photo-1617957743034-3e8f9a0c24c8?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=1470',
    url: '/news/childcare-dialogue',
  },
  {
    title: '市議会だより秋号が発行されました',
    date: '2025.10.12',
    img: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=1470',
    url: '/news/council-autumn',
  },
  {
    title: '教育と地域づくりフォーラムを開催',
    date: '2025.10.10',
    img: 'https://images.unsplash.com/photo-1581092335409-22e8b05b6c30?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=1470',
    url: '/news/education-forum',
  },
  {
    title: '地域清掃活動に参加しました',
    date: '2025.10.08',
    img: 'https://images.unsplash.com/photo-1606787366850-de6330128bfc?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=1470',
    url: '/news/cleanup',
  },
  {
    title: '駅前で政策ビラを配布しました',
    date: '2025.10.05',
    img: 'https://images.unsplash.com/photo-1515165562835-cfba588b5e3e?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=1470',
    url: '/news/flyer',
  },
  {
    title: '新しい提案書を市議会に提出しました',
    date: '2025.10.02',
    img: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=1470',
    url: '/news/proposal',
  },
  {
    title: '地域イベントで子どもと交流',
    date: '2025.09.28',
    img: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=1470',
    url: '/news/event-children',
  },
  {
    title: '防災訓練に参加しました',
    date: '2025.09.25',
    img: 'https://images.unsplash.com/photo-1587614382346-4ec91827b071?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=1470',
    url: '/news/disaster-training',
  },
  {
    title: '環境美化活動を行いました',
    date: '2025.09.20',
    img: 'https://images.unsplash.com/photo-1581091215367-59ab6cbd26d0?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=1470',
    url: '/news/environment',
  },
  {
    title: '地域活性化プロジェクトが始動',
    date: '2025.09.18',
    img: 'https://images.unsplash.com/photo-1556740749-887f6717d7e4?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=1470',
    url: '/news/regional-project',
  },
  {
    title: '駅前トークイベントを開催しました',
    date: '2025.09.15',
    img: 'https://images.unsplash.com/photo-1587613861644-61cfb7b14b15?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=1470',
    url: '/news/talk-event',
  },
  {
    title: 'オンライン意見交換会を開催',
    date: '2025.09.10',
    img: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=1470',
    url: '/news/online-meeting',
  },
  {
    title: '若者政策チームが始動しました',
    date: '2025.09.08',
    img: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=1470',
    url: '/news/youth-team',
  },
  {
    title: '地域福祉計画に関する勉強会を実施',
    date: '2025.09.05',
    img: 'https://images.unsplash.com/photo-1573497019440-9702c9f6e7ac?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=1470',
    url: '/news/welfare-meeting',
  },
  {
    title: '市政レポート2025夏を発行',
    date: '2025.09.02',
    img: 'https://images.unsplash.com/photo-1494173853739-c21f58b16055?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=1470',
    url: '/news/report-summer',
  },
  {
    title: '地域の声を聞く対話会を実施しました',
    date: '2025.08.28',
    img: 'https://images.unsplash.com/photo-1581092335409-22e8b05b6c30?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=1470',
    url: '/news/dialogue',
  },
  {
    title: '新しいホームページを公開しました',
    date: '2025.08.20',
    img: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=1470',
    url: '/news/site-launch',
  },
]
