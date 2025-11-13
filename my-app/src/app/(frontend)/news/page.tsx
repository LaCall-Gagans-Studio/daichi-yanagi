// app/news/page.tsx
import { Suspense } from 'react'
import { getAllNews } from '@/lib/news'
import NewsPageInner from './page.client'

export default async function NewsPage() {
  const allNews = await getAllNews()

  return (
    <Suspense fallback={<p className="px-5 py-16 text-sm text-ws-primary/70">読み込み中…</p>}>
      <NewsPageInner allNews={allNews} />
    </Suspense>
  )
}
