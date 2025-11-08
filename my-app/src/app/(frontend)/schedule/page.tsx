'use client'

import * as React from 'react'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { LuCalendarDays, LuMapPin, LuClock3, LuCalendarPlus, LuChevronLeft } from 'react-icons/lu'
import { CampaignEvent, getUpcomingEvents, formatJa, googleCalendarUrl } from '@/lib/schedule'

// -------------------------------
// カウントダウンフック
// -------------------------------
function useCountdown(target?: string) {
  const [txt, setTxt] = React.useState<string>('')

  React.useEffect(() => {
    if (!target) return
    const end = new Date(target).getTime()
    const tick = () => {
      const left = end - Date.now()
      if (left <= 0) {
        setTxt('まもなく開始')
        return
      }
      const sec = Math.floor(left / 1000)
      const d = Math.floor(sec / 86400)
      const h = Math.floor((sec % 86400) / 3600)
      const m = Math.floor((sec % 3600) / 60)
      setTxt(`${d}日 ${h}時間 ${m}分`)
    }
    tick()
    const t = setInterval(tick, 1000 * 30)
    return () => clearInterval(t)
  }, [target])

  return txt
}

// -------------------------------
// イベントカードコンポーネント
// -------------------------------
function EventCard({ event }: { event: CampaignEvent }) {
  const countdown = useCountdown(event.start)

  return (
    <Card className="border-ws-primary/15 bg-ws-background hover:bg-ws-primary/5 transition-colors">
      <CardContent className="p-4 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Badge className="bg-ws-primary text-white text-xs">{event.type}</Badge>
            <span className="text-[11px] text-ws-primary flex items-center gap-1">
              <LuClock3 /> {countdown || '—'}
            </span>
          </div>
        </div>

        <h3 className="text-base font-semibold">{event.title}</h3>

        <div className="text-xs space-y-2 text-black">
          <div className="flex items-center gap-1">
            <LuCalendarDays className="shrink-0" />
            <span>
              {formatJa(event.start)}
              {event.end ? ` 〜 ${formatJa(event.end)}` : ''}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <LuMapPin className="shrink-0" />
            <span className="truncate">{event.placeName}</span>
          </div>
        </div>

        <div className="flex gap-2 pt-2">
          <Button
            variant="outline"
            size="sm"
            className="border-ws-primary/70 text-ws-primary hover:bg-ws-primary/10 text-xs"
          >
            <Link
              href={googleCalendarUrl(event)}
              target="_blank"
              rel="noreferrer"
              className="flex items-center"
            >
              <LuCalendarPlus className="mr-2" />
              カレンダーに登録
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

// -------------------------------
// ページ本体
// -------------------------------
export default function SchedulePage() {
  // 1️⃣ すべて取得
  const all = getUpcomingEvents()

  // 3️⃣ 日付が近い順にソート
  const sorted = [...all].sort((a, b) => new Date(a.start).getTime() - new Date(b.start).getTime())

  if (sorted.length === 0) {
    return (
      <div className="w-full px-5 py-16 text-center text-sm text-ws-primary/70">
        現在、予定されているスケジュールはありません。
      </div>
    )
  }

  return (
    <div className="w-full relative my-6 px-5">
      <section className="space-y-3 mt-12">
        <div className="flex flex-col items-center justify-between">
          <h1 className="text-xl text-center text-black">SCHEDULE</h1>
          <p className="text-sm font-bold text-center text-ws-primary">今後のスケジュール一覧</p>
        </div>

        {/* イベント一覧 */}
        <div className="mt-6 space-y-4">
          {sorted.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>

        {/* 戻る */}
        <div className="py-6 flex justify-center">
          <Link
            href="/"
            className="text-xs inline-flex items-center gap-1 text-ws-primary hover:underline"
          >
            <LuChevronLeft /> トップへ戻る
          </Link>
        </div>
      </section>
    </div>
  )
}
