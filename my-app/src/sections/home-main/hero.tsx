// src/components/hero.tsx
'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
  LuCalendarDays,
  LuHandHeart,
  LuBookOpen,
  LuMapPin,
  LuChevronRight,
  LuCalendarPlus,
  LuClock3,
} from 'react-icons/lu'
import { SiLine, SiNotion } from 'react-icons/si'
import { type CampaignEvent, formatJa, googleCalendarUrl } from '@/lib/schedule'
import type { CandidateData } from '@/lib/candidate'
import type { SocialLink } from '@/lib/sns-links'
import { HeroNotice } from './hero-notice'

export function Hero({
  events,
  candidate,
  snsLinks,
}: {
  events: CampaignEvent[]
  candidate: CandidateData
  snsLinks: SocialLink[]
}) {
  const allEvents = [...events].sort(
    (a, b) => new Date(a.start).getTime() - new Date(b.start).getTime(),
  )

  const hasEvents = allEvents.length > 0
  const next = hasEvents ? allEvents[0] : undefined
  const list = hasEvents ? allEvents.slice(1, 4) : []
  const countdown = useCountdown(next?.start)

  return (
    <div className="w-full relative">
      {/* HERO MAIN */}
      <section className="p-4 relative z-0 h-[90vh]">
        <Image
          src="/hero_bg_3.webp"
          alt="Hero Background"
          fill
          priority
          className="object-cover object-bottom -z-10"
        />
        {/* タイトル - フェードイン&スライドアップアニメーション */}
        <div className="absolute animate-[fadeInUp_0.8s_ease-out]">
          <div className="bg-ws-background/30 border-black p-3 py-4 border-3 text-black backdrop-blur-sm">
            {/* 
            <h1 className="text-4xl mb-1 font-bold leading-tight tracking-tight">
              みんなで動かす、
              <br />
              鳥取市。
            </h1>
            <p className="text-xs text-nowrap font-bold animate-[fadeIn_1s_ease-out_0.3s_both]">
              〜このまちの主人公は、あなただ〜
            </p>
            */}
            <h1 className="text-2xl mb-2 font-bold leading-tight tracking-tight">
              たくさんのご支援
              <br />
              ありがとうございました
            </h1>
            <p className="text-sm font-bold animate-[fadeIn_1s_ease-out_0.3s_both] leading-relaxed">
              次の挑戦に向けて、
              <br />
              一歩ずつ活動して参ります。
              <br />
              リニューアルまでしばらくお待ちください。
            </p>
          </div>
        </div>

        {/* 候補者カード&ボタン - スライドアップアニメーション */}
        <div className="absolute gap-2 gap-x-3 inset-x-4 grid inset-y-3/4 duration-300">
          <div className="bg-ws-background rounded-2xl col-span-2 p-4 py-6 pt-7 border-2 border-ws-primary shadow-lg animate-[slideInUp_0.8s_ease-out_0.2s_both] hover:shadow-xl hover:scale-[1.02] transition-all duration-300">
            <div className="flex items-center justify-center gap-3">
              <div className="flex flex-col gap-1 justify-end grow-3 text-right animate-[fadeIn_0.8s_ease-out_0.5s_both]">
                <p className="leading-tight font-medium">無所属</p>
              </div>

              <h1 className="text-ws-primary font-bold grow-6 flex items-end gap-2">
                <ruby className="text-6xl leading-none animate-[slideInLeft_0.6s_ease-out_0.4s_both]">
                  柳<rt className="text-[0.6rem] tracking-wider text-ws-primary/90">やなぎ</rt>
                </ruby>
                <ruby className="text-5xl leading-none pb-[2px] animate-[slideInLeft_0.6s_ease-out_0.5s_both]">
                  大地<rt className="text-[0.55rem] tracking-wider text-ws-primary/90">だいち</rt>
                </ruby>
              </h1>
            </div>

            <div className="flex flex-wrap px-4 mt-2 gap-2 gap-y-1 [&>*]:border-ws-primary [&>*]:text-ws-primary [&>*]:bg-white [&>*]:hover:bg-ws-primary [&>*]:hover:text-white cursor-pointer duration-300">
              {candidate.themes.map((t, i) => (
                <Badge
                  key={t}
                  className="animate-[scaleIn_0.4s_ease-out_both] hover:scale-110 transition-transform"
                  style={{ animationDelay: `${0.6 + i * 0.1}s` }}
                >
                  {t}
                </Badge>
              ))}
            </div>
          </div>

          {/*
          <Button
            asChild
            className="bg-ws-primary text-ws-background hover:bg-ws-background text-lg animate-[slideInUp_0.6s_ease-out_0.5s_both] hover:scale-105 active:scale-95 transition-all shadow-md hover:shadow-lg"
          >
            <Link
              href="#policy"
              onClick={(e) => {
                e.preventDefault()
                document.querySelector('#policy')?.scrollIntoView({ behavior: 'smooth' })
              }}
              className="hover:text-ws-primary text-white py-5 border-2 border-ws-primary group"
            >
              <LuBookOpen className="mr-2 group-hover:rotate-12 transition-transform" />
              政策を見る
            </Link>
          </Button>

          <Button
            asChild
            className="bg-ws-background text-ws-background hover:bg-ws-ws-primary text-lg animate-[slideInUp_0.6s_ease-out_0.6s_both] hover:scale-105 active:scale-95 transition-all shadow-md hover:shadow-lg"
          >
            <Link
              href="#support"
              onClick={(e) => {
                e.preventDefault()
                document.querySelector('#support')?.scrollIntoView({ behavior: 'smooth' })
              }}
              className="text-ws-primary hover:text-ws-background py-5 border-2 border-ws-primary hover:bg-ws-primary group"
            >
              <LuHandHeart className="mr-2 group-hover:scale-110 transition-transform" />
              応援する
            </Link>
          </Button>
          */}

          {/* 公式LINE */}
          <Button
            asChild
            className="bg-[#06C755] text-white hover:bg-[#06C755]/90 text-lg animate-[slideInUp_0.6s_ease-out_0.7s_both] hover:scale-105 active:scale-95 transition-all shadow-md hover:shadow-lg"
          >
            <Link
              href={snsLinks.find((s) => s.name === 'LINE' || s.name === '公式LINE')?.url || '#'}
              target="_blank"
              rel="noreferrer"
              className="py-5 border-2 border-[#06C755] group"
            >
              <SiLine className="mr-2 group-hover:scale-110 transition-transform" />
              公式LINE
            </Link>
          </Button>

          {/* 公式Wiki */}
          <Button
            asChild
            className="bg-white text-black hover:bg-white/80 text-lg animate-[slideInUp_0.6s_ease-out_0.8s_both] hover:scale-105 active:scale-95 transition-all shadow-md hover:shadow-lg"
          >
            <Link
              href={
                snsLinks.find(
                  (s) => s.name === 'Wiki' || s.name === 'Notion' || s.name.includes('Wiki'),
                )?.url || '#'
              }
              target="_blank"
              rel="noreferrer"
              className="py-5 border-2 border-black group"
            >
              <SiNotion className="mr-2 group-hover:scale-110 transition-transform" />
              公式Wiki
            </Link>
          </Button>
        </div>
      </section>

      {/* HERO SUB （イベント部分） */}
      <section
        aria-labelledby="nextmeet-heading"
        className="mt-40 md:mt-32 px-4 space-y-3 relative"
      >
        {/* <div className="flex flex-col items-center justify-between">
          <h2 id="nextmeet-heading" className="text-xl text-center text-black">
            NEXT MEET UP!
          </h2>
          <p className="text-sm font-bold text-center text-ws-primary">直近のスケジュール</p>
        </div>

        {hasEvents ? (
          <>
            <Card className="border-ws-primary/15 bg-ws-background py-2">
              <CardContent className="p-3">
                <div className="flex items-center gap-2">
                  <Badge className="bg-ws-primary text-white">{next!.type}</Badge>
                  <span className="text-[11px] text-ws-primary font-bold flex items-center gap-1">
                    <LuClock3 /> {countdown || '—'}
                  </span>
                </div>

                <h3 className="mt-1 text-base font-semibold line-clamp-2">{next!.title}</h3>

                <div className="mt-3 text-xs space-y-3">
                  <div className="flex items-center gap-1 text-black">
                    <LuCalendarDays className="shrink-0" />
                    <span>
                      {formatJa(next!.start)}
                      {next!.end ? ` 〜 ${formatJa(next!.end)}` : ''}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-black">
                    <LuMapPin className="shrink-0" />
                    <span className="truncate">{next!.placeName}</span>
                  </div>
                </div>

                <div className="shrink-0 flex items-end gap-2 mt-3">
                  <Button
                    className="border-ws-primary/80 border text-ws-primary hover:bg-ws-primary/10 bg-ws-background text-xs"
                    asChild
                  >
                    <Link
                      href={googleCalendarUrl(next!)}
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

            <div>
              {list.map((e) => (
                <div
                  key={e.id}
                  className="my-1 p-2 text-sm bg-ws-background border-ws-background/15 rounded-md border shadow-2xs flex items-center justify-between hover:bg-ws-primary group"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-[9px] text-nowrap text-black/70">
                      {formatJa(e.start)}
                    </span>
                    <Badge
                      variant="outline"
                      className="h-5 px-1 text-[8px] line-clamp-1 text-center py-1 w-12 text-nowrap border-ws-primary/25 text-black/90"
                    >
                      {e.type}
                    </Badge>
                    <div className="font-medium line-clamp-1 text-xs group-hover:text-ws-background">
                      {e.title}
                    </div>
                    <div className="text-[10px] text-black/80 line-clamp-1">in {e.placeName}</div>
                  </div>
                </div>
              ))}

              <div className="py-2 flex justify-center mt-4">
                <Link
                  href="/schedule"
                  className="text-xs inline-flex items-center gap-1 text-ws-primary hover:underline"
                >
                  さらに見る <LuChevronRight />
                </Link>
              </div>
            </div>
          </>
        ) : (
          <Card className="border-dashed border-ws-primary/40 bg-ws-background/60 text-center py-6">
            <CardContent>
              <p className="text-sm text-black/80">直近のイベントは現在ありません。</p>
              <p className="text-xs text-black/60 mt-1">スケジュールは随時更新されます。</p>
              <div className="mt-4">
                <Link
                  href="/schedule"
                  className="text-xs inline-flex items-center gap-1 text-ws-primary hover:underline"
                >
                  スケジュール一覧へ <LuChevronRight />
                </Link>
              </div>
            </CardContent>
          </Card>
        )} */}
      </section>
    </div>
  )
}

// カウントダウン用
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
