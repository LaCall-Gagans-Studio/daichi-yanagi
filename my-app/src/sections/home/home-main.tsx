'use client'

// components
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Input } from '@/components/ui/input'

// icons
import {
  LuMegaphone,
  LuNewspaper,
  LuCalendarDays,
  LuUsers,
  LuArrowRight,
  LuHandHeart,
  LuSend,
  LuBookOpen,
  LuMapPin,
  LuPlay,
  LuTwitter,
  LuYoutube,
  LuInstagram,
} from 'react-icons/lu'

// sections
import Hero from './main/hero'

// ---- ダミー画像（埋め込みSVG） ----
const PLACEHOLDER_WIDE =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='800' height='450'>
      <defs>
        <linearGradient id='g' x1='0' y1='0' x2='1' y2='1'>
          <stop offset='0%' stop-color='#8B5E3C'/>
          <stop offset='100%' stop-color='#C7B299'/>
        </linearGradient>
      </defs>
      <rect width='100%' height='100%' fill='url(#g)'/>
      <text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle'
        font-family='Segoe UI, system-ui, -apple-system' font-size='28' fill='white' opacity='0.85'>
        Dummy Hero Image
      </text>
    </svg>`,
  )

const PLACEHOLDER_THUMB =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='480' height='320'>
      <rect width='100%' height='100%' fill='#E8DED4'/>
      <circle cx='50%' cy='50%' r='90' fill='#8B5E3C' opacity='0.25'/>
      <text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle'
        font-family='Segoe UI, system-ui, -apple-system' font-size='16' fill='#5b3c25'>
        Thumbnail
      </text>
    </svg>`,
  )

export default function HomeMain() {
  return (
    <div className="w-full h-full bg-ws-background text-ws-primary overflow-y-auto">
      <header className="h-12 w-full bg-ws-primary"></header>
      <main className="">
        {/* --- HERO --- */}
        <Hero />

        {/* --- CONTENTS --- */}
        <div className="my-6 mx-5">
          {/* --- 最新ニュース（HERO直下） --- */}
          <section className="space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <LuNewspaper />
                最新のお知らせ
              </h2>
              <Link
                href="/news"
                className="text-xs inline-flex items-center gap-1 text-ws-primary hover:underline"
              >
                すべて見る <LuArrowRight />
              </Link>
            </div>

            <div className="space-y-3">
              {[
                // ダミーニュース
                { title: 'Lorem ipsum dolor sit amet', date: '2025.11.01', cat: 'Activity' },
                { title: 'Consectetur adipiscing elit', date: '2025.10.30', cat: 'Event' },
                { title: 'Sed do eiusmod tempor', date: '2025.10.28', cat: 'Media' },
              ].map((n, idx) => (
                <Card key={idx} className="border-ws-primary/15 bg-ws-background">
                  <CardContent className="p-3 flex gap-3">
                    <div className="relative w-20 h-14 shrink-0 overflow-hidden rounded-md border border-ws-primary/15">
                      <Image
                        src={PLACEHOLDER_THUMB}
                        alt="thumbnail"
                        width={160}
                        height={112}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <Badge
                          variant="outline"
                          className="h-5 px-2 text-[10px] border-ws-primary/25 text-ws-primary/90"
                        >
                          {n.cat}
                        </Badge>
                        <span className="text-[11px] text-ws-primary/70">{n.date}</span>
                      </div>
                      <h3 className="mt-1 text-[15px] font-medium line-clamp-2">{n.title}</h3>
                      <p className="mt-1 text-xs text-ws-primary/80 line-clamp-2">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                        tempor incididunt.
                      </p>
                      <div className="mt-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-ws-primary hover:bg-ws-primary/10 h-7 px-2"
                        >
                          詳しく <LuArrowRight className="ml-1" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          <Separator className="bg-ws-primary/10" />

          {/* --- プロフィール（写真＋短文） --- */}
          <section
            className="rounded-xl border border-ws-primary/15 bg-ws-primary/5 p-4"
            aria-labelledby="profile-heading"
          >
            <div className="flex gap-3">
              <div className="relative w-20 h-20 shrink-0 overflow-hidden rounded-xl ring-1 ring-ws-primary/15">
                <Image
                  src={PLACEHOLDER_THUMB}
                  alt="portrait"
                  width={160}
                  height={160}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="min-w-0">
                <h2
                  id="profile-heading"
                  className="text-base font-semibold flex items-center gap-2"
                >
                  <LuMegaphone />
                  柳大地について
                </h2>
                <p className="text-sm text-ws-primary/85 mt-1 line-clamp-3">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quis ipsum suspendisse
                  ultrices gravida dictum fusce ut placerat. Amet risus nullam eget felis eget nunc
                  lobortis mattis.
                </p>
                <div className="mt-2">
                  <Link
                    href="/about"
                    className="text-sm inline-flex items-center gap-1 text-ws-primary hover:underline"
                  >
                    もっと見る <LuArrowRight />
                  </Link>
                </div>
              </div>
            </div>
          </section>

          {/* --- 政策タイル（3本柱） --- */}
          <section className="space-y-3">
            <h2 className="text-lg font-semibold">政策・ビジョン</h2>
            <div className="space-y-3">
              <Card className="border-ws-primary/15 hover:bg-ws-primary/5 transition-colors">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base flex items-center gap-2">
                    <LuBookOpen />
                    教育と子ども
                  </CardTitle>
                  <CardDescription className="text-xs text-ws-primary/70">
                    Lorem ipsum dolor sit amet, consectetur.
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-sm text-ws-primary/85">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.
                </CardContent>
              </Card>

              <Card className="border-ws-primary/15 hover:bg-ws-primary/5 transition-colors">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base flex items-center gap-2">
                    <LuUsers />
                    地域とくらし
                  </CardTitle>
                  <CardDescription className="text-xs text-ws-primary/70">
                    Ut enim ad minim veniam, quis nostrud.
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-sm text-ws-primary/85">
                  Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore.
                </CardContent>
              </Card>

              <Card className="border-ws-primary/15 hover:bg-ws-primary/5 transition-colors">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base flex items-center gap-2">
                    <LuCalendarDays />
                    まちの未来（環境・防災・DX）
                  </CardTitle>
                  <CardDescription className="text-xs text-ws-primary/70">
                    Excepteur sint occaecat cupidatat non proident.
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-sm text-ws-primary/85">
                  Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium.
                </CardContent>
              </Card>

              <div className="flex justify-end">
                <Link
                  href="/policy"
                  className="text-sm inline-flex items-center gap-1 text-ws-primary hover:underline"
                >
                  政策を詳しく <LuArrowRight />
                </Link>
              </div>
            </div>
          </section>

          {/* --- 応援CTA（寄付・ボランティア） --- */}
          <section
            className="rounded-xl border border-ws-primary/15 bg-ws-primary/5 p-4"
            aria-labelledby="support-heading"
          >
            <h2 id="support-heading" className="text-base font-semibold mb-2">
              応援・参加する
            </h2>
            <p className="text-sm text-ws-primary/85 mb-3">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua.
            </p>
            <div className="flex flex-wrap gap-2">
              <Button asChild className="bg-ws-primary text-white hover:opacity-90">
                <Link href="/support#donate">
                  <LuHandHeart className="mr-2" />
                  寄付する
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="border-ws-primary/30 text-ws-primary hover:bg-ws-primary/10"
              >
                <Link href="/support#volunteer">
                  <LuSend className="mr-2" />
                  ボランティア登録
                </Link>
              </Button>
            </div>
          </section>

          {/* --- お問い合わせ + SNS（スリム） --- */}
          <section className="space-y-2 pb-6">
            <h2 className="text-base font-semibold">お問い合わせ・SNS</h2>
            <div className="flex gap-2">
              <Button
                asChild
                variant="outline"
                className="border-ws-primary/30 text-ws-primary hover:bg-ws-primary/10"
              >
                <Link href="/contact">お問い合わせ</Link>
              </Button>
              <Button asChild variant="ghost" className="text-ws-primary hover:bg-ws-primary/10">
                <Link href="https://x.com" target="_blank" rel="noreferrer" aria-label="X">
                  <LuTwitter />
                </Link>
              </Button>
              <Button asChild variant="ghost" className="text-ws-primary hover:bg-ws-primary/10">
                <Link
                  href="https://youtube.com"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="YouTube"
                >
                  <LuYoutube />
                </Link>
              </Button>
              <Button asChild variant="ghost" className="text-ws-primary hover:bg-ws-primary/10">
                <Link
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Instagram"
                >
                  <LuInstagram />
                </Link>
              </Button>
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}
