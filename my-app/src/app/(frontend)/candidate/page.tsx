'use client'

import * as React from 'react'
import Image from 'next/image'
import Link from 'next/link'

// shadcn/ui
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'

// icons
import {
  LuMegaphone,
  LuArrowLeft,
  LuArrowRight,
  LuMapPin,
  LuCalendarDays,
  LuAward,
  LuUsers,
  LuTarget,
  LuBookOpen,
  LuShield,
} from 'react-icons/lu'

// data
import {
  CANDIDATE_PROFILE,
  CANDIDATE_THEMES,
  CANDIDATE_HIGHLIGHTS,
  CANDIDATE_TIMELINE,
  CANDIDATE_QA,
  type CandidateHighlight,
} from '@/lib/candidate'

// react-icons へのキー → アイコンのマップ
const iconMap: Record<CandidateHighlight['icon'], React.ComponentType<{ className?: string }>> = {
  award: LuAward,
  users: LuUsers,
  shield: LuShield,
  target: LuTarget,
  book: LuBookOpen,
}

export default function CandidatePages() {
  return (
    <main className="min-h-screen bg-ws-secondary/5">
      {/* ヒーロー / 見出し */}
      <section className="relative bg-gradient-to-b from-white to-ws-secondary/10">
        <div className="mx-auto max-w-5xl px-4 py-6">
          <nav className="mb-3">
            <Button
              asChild
              variant="ghost"
              size="sm"
              className="text-ws-primary px-0 hover:bg-transparent"
            >
              <Link href="/">
                <LuArrowLeft className="mr-1" />
                ホームへ戻る
              </Link>
            </Button>
          </nav>

          <div className="flex items-center gap-2 text-ws-primary">
            <LuMegaphone />
            <p className="text-xs font-bold tracking-wide">CHALLENGER</p>
          </div>
          <h1 className="mt-1 text-2xl font-semibold text-black">{CANDIDATE_PROFILE.nameJa}</h1>
          <p className="mt-1 text-sm text-ws-primary/80 flex items-center gap-3">
            <span className="inline-flex items-center gap-1">
              <LuMapPin />
              {CANDIDATE_PROFILE.city}
            </span>
            <span className="inline-flex items-center gap-1">
              <LuCalendarDays />
              {CANDIDATE_PROFILE.born}
            </span>
          </p>

          <div className="mt-4 grid grid-cols-1 gap-4">
            <div className="order-2 md:order-1">
              <Image
                src="/hero_bg_2.webp"
                alt={`${CANDIDATE_PROFILE.nameJa} のポートレート`}
                width={640}
                height={960}
                className="w-full h-[280px] md:h-[360px] object-cover object-right rounded-xl ring-1 ring-ws-primary/15"
                priority
              />
            </div>
            <Card className="order-1 md:order-2 shadow-none border-ws-primary/10">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">プロフィール</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm leading-relaxed text-black">{CANDIDATE_PROFILE.summary}</p>
                <div className="flex flex-wrap gap-1.5">
                  {CANDIDATE_THEMES.map((t) => (
                    <Badge
                      key={t}
                      variant="outline"
                      className="h-6 px-2 text-[11px] border border-ws-primary text-black"
                    >
                      {t}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* 実績・取り組み（詳細） */}
      <section className="mx-auto max-w-5xl px-4 py-8">
        <h2 className="text-lg font-semibold text-black">実績・取り組み</h2>
        <p className="text-sm text-ws-primary/80">ダイジェストの要素を拡張表示</p>
        <Separator className="my-4 bg-ws-primary/10" />

        <div className="grid grid-cols-2 gap-2">
          {CANDIDATE_HIGHLIGHTS.map(({ icon, text }, i) => {
            const Icon = iconMap[icon] ?? LuTarget
            return (
              <Card key={i} className="shadow-none border-ws-primary/10">
                <CardContent className="p-4 flex gap-3">
                  <div className="mt-[2px] shrink-0">
                    <Icon className="text-ws-primary text-xl" />
                  </div>
                  <p className="text-sm text-black leading-relaxed">{text}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </section>

      {/* 略歴（タイムライン拡張） */}
      <section className="mx-auto max-w-5xl px-4 py-6">
        <h2 className="text-lg font-semibold text-black">略歴</h2>
        <Separator className="my-4 bg-ws-primary/10" />

        <ol className="relative ml-4">
          {/* 縦ライン */}
          <div className="absolute left-[3px] top-0 bottom-0 w-[2px] bg-ws-primary/15" />
          {CANDIDATE_TIMELINE.map((row, i) => (
            <li key={i} className="mb-5 pl-6 relative">
              <div className="absolute left-0 top-[6px] w-[8px] h-[8px] rounded-full bg-ws-primary" />
              <div className="text-xs text-ws-primary/70">{row.year}</div>
              <div className="text-sm font-medium text-black">{row.title}</div>
              {row.desc && <div className="text-sm text-ws-primary/90">{row.desc}</div>}
            </li>
          ))}
        </ol>
      </section>

      {/* Q and A */}
      {/* <section className="px-4 py-6">
        <h2 className="text-lg font-semibold text-black">Q&amp;A</h2>
        <Separator className="my-4 bg-ws-primary/10" />
        <div className="space-y-3">
          {CANDIDATE_QA.map((item, i) => (
            <Card key={i} className="shadow-none border-ws-primary/10">
              <CardContent className="p-4">
                <p className="text-xs font-bold text-ws-primary mb-1">Q.</p>
                <p className="text-sm font-medium text-black">{item.q}</p>
                <p className="mt-2 text-sm  leading-relaxed">A. {item.a}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section> */}

      {/* フッター余白 */}
      <div className="h-8" />
    </main>
  )
}
