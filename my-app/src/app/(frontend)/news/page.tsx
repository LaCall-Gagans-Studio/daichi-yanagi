'use client'

import * as React from 'react'
import { Suspense } from 'react'
import Link from 'next/link'
import { useSearchParams, usePathname, useRouter } from 'next/navigation'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  LuNewspaper,
  LuArrowRight,
  LuExternalLink,
  LuChevronLeft,
  LuChevronRight,
} from 'react-icons/lu'

// libs
import { newsData } from '@/lib/news'

const PAGE_SIZE = 10

function NewsPageInner() {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const router = useRouter()

  // --- 日付でソート（新しい順） ---
  const sortedNews = React.useMemo(() => {
    return [...newsData].sort((a, b) => {
      const da = new Date(a.date.replace(/\./g, '-')).getTime()
      const db = new Date(b.date.replace(/\./g, '-')).getTime()
      return db - da
    })
  }, [])

  const pageParam = Number(searchParams.get('page') ?? '1')
  const page = Number.isFinite(pageParam) && pageParam > 0 ? pageParam : 1

  const totalPages = Math.max(1, Math.ceil(sortedNews.length / PAGE_SIZE))
  const clampedPage = Math.min(page, totalPages)
  const start = (clampedPage - 1) * PAGE_SIZE
  const end = start + PAGE_SIZE
  const items = sortedNews.slice(start, end)

  const goto = (p: number) => {
    const params = new URLSearchParams(searchParams.toString())
    if (p <= 1) params.delete('page')
    else params.set('page', String(p))
    router.push(`${pathname}?${params.toString()}`)
  }

  const pageNumbers = (() => {
    const windowSize = 5
    const half = Math.floor(windowSize / 2)
    let from = Math.max(1, clampedPage - half)
    const to = Math.min(totalPages, from + windowSize - 1)
    if (to - from + 1 < windowSize) from = Math.max(1, to - windowSize + 1)
    const arr: number[] = []
    for (let i = from; i <= to; i++) arr.push(i)
    return arr
  })()

  return (
    <div className="w-full relative my-6 px-5">
      <section className="space-y-3 mt-12">
        <div className="flex flex-col items-center justify-between">
          <h1 className="text-xl text-center text-black flex items-center gap-2">
            <LuNewspaper />
            News
          </h1>
          <p className="text-sm font-bold text-center text-ws-primary">最新のお知らせ一覧</p>
        </div>

        <div className="space-y-3 mt-6">
          {items.map((n, idx) => (
            <Card
              key={`${n.title}-${idx}`}
              className="p-0 border-ws-primary border shadow-none hover:bg-ws-primary group duration-300"
            >
              <CardContent className="p-0">
                <Link href={n.url} className="flex gap-3 relative">
                  <img
                    src={n.img}
                    alt="thumbnail"
                    className="w-10 h-16 object-cover object-center rounded-l-2xl opacity-90"
                  />

                  <div className="py-2 pr-12">
                    <span className="text-[11px] text-ws-primary group-hover:text-white font-semibold block">
                      {n.date}
                    </span>
                    <h3 className="text-sm font-medium line-clamp-1">{n.title}</h3>
                  </div>

                  <div className="absolute right-0 top-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-ws-primary hover:bg-ws-primary/10 h-7 px-2"
                      aria-label="外部リンクを開く"
                    >
                      <LuExternalLink className="ml-1" />
                    </Button>
                  </div>
                </Link>
              </CardContent>
            </Card>
          ))}

          {items.length === 0 && (
            <div className="text-center text-sm text-ws-primary/70 py-10">記事がありません。</div>
          )}
        </div>

        {totalPages > 1 && (
          <div className="mt-6 flex items-center justify-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className="border-ws-primary/30 text-ws-primary"
              disabled={clampedPage <= 1}
              onClick={() => goto(clampedPage - 1)}
            >
              <LuChevronLeft className="mr-1" />
              前へ
            </Button>

            <div className="flex items-center gap-1">
              {pageNumbers.map((n) => (
                <PageDot key={n} n={n} active={n === clampedPage} onClick={() => goto(n)} />
              ))}
            </div>

            <Button
              variant="outline"
              size="sm"
              className="border-ws-primary/30 text-ws-primary"
              disabled={clampedPage >= totalPages}
              onClick={() => goto(clampedPage + 1)}
            >
              次へ
              <LuChevronRight className="ml-1" />
            </Button>
          </div>
        )}

        <div className="mt-6 flex justify-center">
          <Link
            href="/"
            className="text-xs inline-flex items-center gap-1 text-ws-primary hover:underline"
          >
            トップへ戻る <LuArrowRight />
          </Link>
        </div>
      </section>
    </div>
  )
}

export default function NewsPage() {
  ;<Suspense fallback={<div className="px-5 py-16 text-sm text-ws-primary/70">読み込み中…</div>}>
    <NewsPageInner />
  </Suspense>
}

function PageDot({ n, active, onClick }: { n: number; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      aria-current={active ? 'page' : undefined}
      className={[
        'h-8 min-w-8 px-2 rounded-md text-sm transition-colors',
        active
          ? 'bg-ws-primary text-white'
          : 'border border-ws-primary/30 text-ws-primary hover:bg-ws-primary/10',
      ].join(' ')}
    >
      {n}
    </button>
  )
}
