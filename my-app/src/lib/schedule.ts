export type EventType = '街頭' | 'ライブ' | '個人演説' | '説明会' | '座談会'

export interface CampaignEvent {
  id: string
  type: EventType
  title: string
  placeName: string
  placeAddress?: string
  start: string // ISO 8601
  end?: string // ISO 8601
}

export const events: CampaignEvent[] = [
  {
    id: 'evt_001',
    type: '街頭',
    title: '今後の活動⽅針について',
    placeName: 'SANDBOX TOTTORI',
    start: '2025-11-08T13:00:00+09:00',
    end: '2025-11-08T17:00:00+09:00',
  },
  {
    id: 'evt_002',
    type: 'ライブ',
    title: 'オンラインLIVEトーク',
    placeName: 'YouTube Live',
    start: '2025-11-09T20:00:00+09:00',
    end: '2025-11-09T21:00:00+09:00',
  },
  {
    id: 'evt_003',
    type: 'ライブ',
    title: 'オンラインLIVEトーク',
    placeName: 'YouTube Live',
    start: '2025-11-09T20:00:00+09:00',
    end: '2025-11-09T21:00:00+09:00',
  },
  {
    id: 'evt_004',
    type: 'ライブ',
    title: 'オンラインLIVEトーク',
    placeName: 'YouTube Live',
    start: '2025-11-09T20:00:00+09:00',
    end: '2025-11-09T21:00:00+09:00',
  },
  // {
  //   id: 'evt_005',
  //   type: '街頭',
  //   title: 'イオンモール日吉津前 街頭活動',
  //   placeName: 'イオンモール日吉津 正面入口',
  //   start: '2025-11-14T15:00:00+09:00',
  //   end: '2025-11-14T15:30:00+09:00',
  // },
  // {
  //   id: 'evt_006',
  //   type: '座談会',
  //   title: '若者ミートアップ in 鳥取',
  //   placeName: 'カフェ・タタラバ',
  //   start: '2025-11-15T18:00:00+09:00',
  //   end: '2025-11-15T19:30:00+09:00',
  // },
  // {
  //   id: 'evt_007',
  //   type: '座談会',
  //   title: '福祉を考える市民座談会',
  //   placeName: '倉吉未来中心',
  //   start: '2025-11-17T14:00:00+09:00',
  //   end: '2025-11-17T15:30:00+09:00',
  // },
  // {
  //   id: 'evt_008',
  //   type: '街頭',
  //   title: '米子駅前 街頭演説',
  //   placeName: '米子駅 南口ロータリー',
  //   start: '2025-11-18T17:00:00+09:00',
  //   end: '2025-11-18T17:30:00+09:00',
  // },
  // {
  //   id: 'evt_009',
  //   type: '説明会',
  //   title: '教育とまちづくり説明会',
  //   placeName: '鳥取県民ふれあい会館',
  //   start: '2025-11-20T19:00:00+09:00',
  //   end: '2025-11-20T20:00:00+09:00',
  // },
  // {
  //   id: 'evt_010',
  //   type: 'ライブ',
  //   title: '政策紹介LIVE配信',
  //   placeName: 'Instagram Live',
  //   start: '2025-11-22T21:00:00+09:00',
  //   end: '2025-11-22T22:00:00+09:00',
  // },
  // {
  //   id: 'evt_011',
  //   type: '個人演説',
  //   title: '河原町個人演説会',
  //   placeName: '河原町公民館',
  //   start: '2025-11-24T18:30:00+09:00',
  //   end: '2025-11-24T19:30:00+09:00',
  // },
  // {
  //   id: 'evt_012',
  //   type: '街頭',
  //   title: '若桜駅前 街頭演説',
  //   placeName: '若桜駅前広場',
  //   start: '2025-11-26T16:00:00+09:00',
  //   end: '2025-11-26T16:30:00+09:00',
  // },
  // {
  //   id: 'evt_013',
  //   type: '座談会',
  //   title: '子育て世代の声を聞く会',
  //   placeName: '青谷町地域センター',
  //   start: '2025-11-27T13:00:00+09:00',
  //   end: '2025-11-27T14:30:00+09:00',
  // },
  // {
  //   id: 'evt_014',
  //   type: '説明会',
  //   title: '市政説明会 in 岩美',
  //   placeName: '岩美町中央公民館',
  //   start: '2025-11-29T18:00:00+09:00',
  //   end: '2025-11-29T19:00:00+09:00',
  // },
  // {
  //   id: 'evt_015',
  //   type: '街頭',
  //   title: '境港駅前 街頭演説',
  //   placeName: '境港駅 駅前広場',
  //   start: '2025-12-01T16:00:00+09:00',
  //   end: '2025-12-01T16:30:00+09:00',
  // },
  // {
  //   id: 'evt_016',
  //   type: '座談会',
  //   title: '環境と未来を語る会',
  //   placeName: '智頭町 森のホール',
  //   start: '2025-12-03T14:00:00+09:00',
  //   end: '2025-12-03T15:30:00+09:00',
  // },
  // {
  //   id: 'evt_017',
  //   type: 'ライブ',
  //   title: '柳大地のオンライン対話会',
  //   placeName: 'YouTube Live',
  //   start: '2025-12-05T20:00:00+09:00',
  //   end: '2025-12-05T21:00:00+09:00',
  // },
  // {
  //   id: 'evt_018',
  //   type: '説明会',
  //   title: '公共交通とまちづくりフォーラム',
  //   placeName: '鳥取駅ビル カルチャーホール',
  //   start: '2025-12-08T18:00:00+09:00',
  //   end: '2025-12-08T19:30:00+09:00',
  // },
  // {
  //   id: 'evt_019',
  //   type: '街頭',
  //   title: '倉吉駅前 街頭演説',
  //   placeName: '倉吉駅 北口広場',
  //   start: '2025-12-10T16:00:00+09:00',
  //   end: '2025-12-10T16:30:00+09:00',
  // },
  // {
  //   id: 'evt_020',
  //   type: '個人演説',
  //   title: '鳥取市文化ホール個人演説会',
  //   placeName: '鳥取市文化ホール',
  //   start: '2025-12-12T18:30:00+09:00',
  //   end: '2025-12-12T19:30:00+09:00',
  // },
]

export function getUpcomingEvents(now = new Date()): CampaignEvent[] {
  return [...events]
    .filter((e) => new Date(e.end ?? e.start) >= now)
    .sort((a, b) => +new Date(a.start) - +new Date(b.start))
}

export function getNextEvent(now = new Date()): CampaignEvent | null {
  return getUpcomingEvents(now)[0] ?? null
}

export function formatJa(dt: string | Date): string {
  const d = typeof dt === 'string' ? new Date(dt) : dt
  return d.toLocaleString('ja-JP', {
    month: 'numeric',
    day: 'numeric',
    weekday: 'short',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  })
}

// Googleカレンダー登録URL（簡易版）
export function googleCalendarUrl(e: CampaignEvent): string {
  const pad = (n: number) => String(n).padStart(2, '0')
  const toUTC = (s: string) => {
    const d = new Date(s)
    return (
      d.getUTCFullYear().toString() +
      pad(d.getUTCMonth() + 1) +
      pad(d.getUTCDate()) +
      'T' +
      pad(d.getUTCHours()) +
      pad(d.getUTCMinutes()) +
      pad(d.getUTCSeconds()) +
      'Z'
    )
  }
  const start = toUTC(e.start)
  const end = toUTC(e.end ?? e.start)
  const text = encodeURIComponent(e.title)
  const location = encodeURIComponent(e.placeName)
  return `https://www.google.com/calendar/render?action=TEMPLATE&text=${text}&dates=${start}/${end}&location=${location}`
}
