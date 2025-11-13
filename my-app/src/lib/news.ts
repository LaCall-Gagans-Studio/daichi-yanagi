// src/lib/getNews.ts
export interface NewsItem {
  id: string
  title: string
  date: string // ISO string
  img?: string
  url: string
}

// CMS のベースURL（例: https://cms.example.com）
const BASE_URL =
  process.env.NEXT_PUBLIC_CMS_URL || // 本番用にここを設定
  process.env.NEXT_PUBLIC_SITE_URL || // 他で使ってるならこれでもOK
  'http://localhost:3000' // 開発中のデフォルト

export async function getAllNews(): Promise<NewsItem[]> {
  const res = await fetch(`${BASE_URL}/api/news?limit=100&depth=1&sort=-date`, {
    next: { revalidate: 60 }, // 1分キャッシュ
  })

  if (!res.ok) {
    console.error('Failed to fetch news', await res.text())
    return []
  }

  const json = await res.json()

  return (json.docs ?? []).map((doc: any) => ({
    id: doc.id,
    title: doc.title,
    date: doc.date, // ISO
    url: doc.url,
    img: typeof doc.img === 'string' ? doc.img : (doc.img?.url ?? undefined),
  }))
}

// 表示用に "2025.11.08" 形式へ整形するユーティリティ
export function formatNewsDate(dateStr: string): string {
  if (!dateStr) return ''
  const d = new Date(dateStr)
  if (Number.isNaN(d.getTime())) return dateStr
  const yyyy = d.getFullYear()
  const mm = String(d.getMonth() + 1).padStart(2, '0')
  const dd = String(d.getDate()).padStart(2, '0')
  return `${yyyy}.${mm}.${dd}`
}
