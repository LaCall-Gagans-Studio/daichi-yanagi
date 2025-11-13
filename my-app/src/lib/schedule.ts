// src/lib/schedule.ts

export type EventType = '街頭演説' | 'タウンMTG' | 'ライブ' | 'その他'

export interface CampaignEvent {
  id: string
  type: EventType
  title: string
  placeName: string
  placeAddress?: string
  start: string // ISO 8601
  end?: string // ISO 8601
}

// API ベースURL
const BASE_URL =
  process.env.NEXT_PUBLIC_CMS_URL || process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

// すべてのイベントを取得
export async function getAllEvents(): Promise<CampaignEvent[]> {
  const url = `${BASE_URL}/api/events?limit=100&sort=start`

  const res = await fetch(url, {
    // RSC キャッシュ
    next: { revalidate: 60 },
  })

  if (!res.ok) {
    console.error('Failed to fetch events', res.status)
    return []
  }

  const json = await res.json()

  return (json.docs ?? []).map(
    (doc: any): CampaignEvent => ({
      id: doc.id,
      type: doc.type,
      title: doc.title,
      placeName: doc.placeName,
      placeAddress: doc.placeAddress ?? undefined,
      start: doc.start,
      end: doc.end ?? undefined,
    }),
  )
}

// ここから下はロジックはほぼそのまま（ただし async 化）

export async function getUpcomingEvents(now = new Date()): Promise<CampaignEvent[]> {
  const events = await getAllEvents()
  return events
    .filter((e) => new Date(e.end ?? e.start) >= now)
    .sort((a, b) => new Date(a.start).getTime() - new Date(b.start).getTime())
}

export async function getNextEvent(now = new Date()): Promise<CampaignEvent | null> {
  const upcoming = await getUpcomingEvents(now)
  return upcoming[0] ?? null
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

// Googleカレンダー登録URL（ここもそのまま）
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
