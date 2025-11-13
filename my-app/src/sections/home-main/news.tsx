// components/News.tsx
'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { LuNewspaper, LuArrowRight, LuExternalLink } from 'react-icons/lu'

import type { NewsItem } from '@/lib/news'
import { formatNewsDate } from '@/lib/news'

export default function News({ items }: { items: NewsItem[] }) {
  const latestNews = React.useMemo(
    () =>
      [...items]
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .slice(0, 5),
    [items],
  )

  return (
    <div className="w-full relative my-6 px-5">
      <section className="space-y-3 mt-12">
        <div className="flex flex-col items-center justify-between">
          <h2 className="text-xl text-center text-black flex items-center gap-2">
            <LuNewspaper />
            News
          </h2>
          <p className="text-sm font-bold text-center text-ws-primary">最新のお知らせ</p>
        </div>

        <div className="space-y-3 mt-6">
          {latestNews.map((n) => (
            <Card
              key={n.id}
              className="p-0 border-ws-primary border shadow-none hover:bg-ws-primary group duration-300"
            >
              <CardContent className="p-0">
                <Link href={n.url} className="flex gap-3 relative">
                  {n.img && (
                    <Image
                      src={n.img}
                      alt="thumbnail"
                      width={64}
                      height={64}
                      className="w-8 h-full object-cover object-center rounded-l-2xl"
                      unoptimized
                    />
                  )}

                  <div className="pb-2 space-y-0">
                    <span className="text-[11px] text-ws-primary group-hover:text-white font-semibold">
                      {formatNewsDate(n.date)}
                    </span>
                    <h3 className="text-sm font-medium line-clamp-1">{n.title}</h3>
                  </div>

                  <div className="absolute right-0 top-3">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-ws-primary hover:bg-ws-primary/10 h-7 px-2"
                    >
                      <LuExternalLink className="ml-1" />
                    </Button>
                  </div>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        <Link
          href="/news"
          className="text-xs w-full inline-flex justify-center text-center items-center gap-1 text-ws-primary hover:underline"
        >
          すべて見る <LuArrowRight />
        </Link>
      </section>
    </div>
  )
}
