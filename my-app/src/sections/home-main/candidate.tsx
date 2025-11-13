// src/components/CandidateClient.tsx
'use client'

import React from 'react'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
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

import type { CandidateData, CandidateHighlight } from '@/lib/candidate'

// アイコンマップ
const highlightIconMap: Record<
  CandidateHighlight['icon'],
  React.ComponentType<{ className?: string }>
> = {
  award: LuAward,
  users: LuUsers,
  shield: LuShield,
  target: LuTarget,
  book: LuBookOpen,
}

export function Candidate({ candidate }: { candidate: CandidateData }) {
  const { profile, themes, highlights, timeline } = candidate

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
          {/* 1. ヘッダー */}
          <div className="flex gap-3">
            <img
              src="/hero_bg_4.webp"
              alt={`${profile.nameJa} のポートレート`}
              className="object-cover object-center relative w-20 h-56 shrink-0 overflow-hidden rounded-xl ring-1 ring-ws-primary/15"
            />
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-sm font-semibold">{profile.nameJa}</span>
                <span className="text-xs text-ws-primary/70 inline-flex items-center gap-1 font-bold">
                  <LuMapPin /> {profile.city}
                </span>
                <span className="text-xs text-ws-primary/70 inline-flex items-center gap-1 font-bold">
                  <LuCalendarDays /> {profile.born}
                </span>
              </div>
              <p className="mt-1 text-sm text-black">{profile.summary}</p>

              {/* チップ */}
              <div className="mt-2 flex flex-wrap gap-1.5">
                {themes.map((t) => (
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
            <ul className="space-y-3">
              {highlights.map(({ icon, text }, i) => {
                const Icon = highlightIconMap[icon] ?? LuTarget
                return (
                  <li key={i} className="text-sm text-ws-primary/90 flex items-start gap-2">
                    <Icon className="mt-[2px] shrink-0" />
                    <span className="font-semibold">{text}</span>
                  </li>
                )
              })}
            </ul>
          </div>

          <Separator className="my-4 bg-ws-primary/10" />

          {/* 3. 略歴タイムライン */}
          <div className="space-y-2">
            <h3 className="text-sm font-semibold">略歴</h3>
            <ol className="relative ml-3">
              {timeline.map((row, i) => (
                <li key={i} className="mb-3 pl-4">
                  <div className="absolute left-0 top-1.5 w-[6px] h-[6px] rounded-full bg-ws-primary" />
                  <div className="text-xs text-ws-primary/70 font-bold">{row.year}</div>
                  <div className="text-sm font-medium">{row.title}</div>
                  <div className="text-sm text-ws-primary/90">{row.desc}</div>
                </li>
              ))}
            </ol>
          </div>

          <Separator className="my-4 bg-ws-primary/10" />

          {/* 4. CTA */}
          <div className="flex flex-wrap gap-2">
            <Button
              asChild
              variant="outline"
              className="border-ws-primary/30 text-ws-primary hover:bg-ws-primary/10"
            >
              <Link href="/candidate">
                もっと詳しく <LuArrowRight className="ml-1" />
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </section>
  )
}
