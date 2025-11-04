'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

// shadcn/ui
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'

// icons
import {
  LuMegaphone,
  LuArrowRight,
  LuMapPin,
  LuCalendarDays,
  LuAward,
  LuUsers,
  LuTarget,
  LuBookOpen,
  LuShield,
} from 'react-icons/lu'

// lib
import {
  CANDIDATE_PROFILE,
  CANDIDATE_THEMES,
  CANDIDATE_HIGHLIGHTS,
  CANDIDATE_TIMELINE,
} from '@/lib/candidate'

// react-icons へアイコンキーをマップ
const highlightIconMap = {
  award: LuAward,
  users: LuUsers,
  shield: LuShield,
  target: LuTarget,
  book: LuBookOpen,
} as const

export default function Candidate() {
  return (
    <section
      id="candidate"
      aria-labelledby="profile-heading"
      className="relative mt-6 pt-12 bg-ws-secondary/10"
    >
      {/* 見出し行 */}
      <div className="flex flex-col items-center justify-between pt-8">
        <h2 className="text-xl text-center text-black flex items-center gap-2">
          <LuMegaphone />
          CHALLENGER
        </h2>
        <p className="text-sm font-bold text-center text-ws-primary">ヤナギダイチについて</p>
      </div>

      <Card className="mx-4 pb-4 shadow-none bg-inherit/10 border-none ">
        <CardContent className="p-4 border-none">
          {/* 1. ヘッダー（写真・肩書・要約） */}
          <div className="flex gap-3">
            <img
              src="/hero_bg_2.webp"
              alt="柳大地のポートレート"
              className="object-cover object-right relative w-20 h-56 shrink-0 overflow-hidden rounded-xl ring-1 ring-ws-primary/15"
            />
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-sm font-semibold">{CANDIDATE_PROFILE.nameJa}</span>
                <span className="text-xs text-ws-primary/70 inline-flex items-center gap-1 font-bold">
                  <LuMapPin /> {CANDIDATE_PROFILE.city}
                </span>
                <span className="text-xs text-ws-primary/70 inline-flex items-center gap-1 font-bold">
                  <LuCalendarDays /> {CANDIDATE_PROFILE.born}
                </span>
              </div>
              <p className="mt-1 text-sm text-black">{CANDIDATE_PROFILE.summary}</p>

              {/* 重点テーマ（チップ） */}
              <div className="mt-2 flex flex-wrap gap-1.5">
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
            </div>
          </div>

          <Separator className="my-4 bg-ws-primary/10" />

          {/* 2. 実績・取り組み */}
          <div className="space-y-2">
            <h3 className="text-sm font-semibold">実績・取り組み</h3>
            <ul className="space-y-1.5">
              {CANDIDATE_HIGHLIGHTS.map(({ icon, text }, i) => {
                const Icon = highlightIconMap[icon] ?? LuTarget
                return (
                  <li key={i} className="text-sm text-ws-primary/90 flex items-start gap-2">
                    <Icon className="mt-[2px] shrink-0" />
                    <span>{text}</span>
                  </li>
                )
              })}
            </ul>
          </div>

          <Separator className="my-4 bg-ws-primary/10" />

          {/* 3. 略歴タイムライン（3点） */}
          <div className="space-y-2">
            <h3 className="text-sm font-semibold">略歴</h3>
            <ol className="relative ml-3">
              {CANDIDATE_TIMELINE.map((row, i) => (
                <li key={i} className="mb-3 pl-4">
                  <div className="absolute left-0 top-1.5 w-[6px] h-[6px] rounded-full bg-ws-primary" />
                  <div className="text-xs text-ws-primary/70">{row.year}</div>
                  <div className="text-sm font-medium">{row.title}</div>
                  <div className="text-sm text-ws-primary/90">{row.desc}</div>
                </li>
              ))}
            </ol>
          </div>

          <Separator className="my-4 bg-ws-primary/10" />

          {/* 4. CTA（政策/プロフィール詳細） */}
          <div className="flex flex-wrap gap-2">
            <Button
              asChild
              variant="outline"
              className="border-ws-primary/30 text-ws-primary hover:bg-ws-primary/10"
            >
              <Link href="/about">
                もっと詳しく <LuArrowRight className="ml-1" />
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </section>
  )
}
