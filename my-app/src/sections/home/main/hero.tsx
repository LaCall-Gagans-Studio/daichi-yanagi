'use client'

// components
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

// icons
import { LuCalendarDays, LuHandHeart, LuBookOpen, LuMapPin, LuPlay } from 'react-icons/lu'

export default function Hero() {
  return (
    <div className="w-full h-screen relative">
      {/* HERO MAIN */}
      <section className="p-4 relative z-0 h-3/4 bg-[url(/hero_bg_1.webp)] bg-cover bg-right">
        {/* HERO MAIN 1 */}
        <div className="absolute ">
          <div className=" bg-ws-background/30 border-black p-3 py-4 border-3 text-black ">
            <h1 className="text-4xl mb-1 font-bold leading-tight tracking-tight">
              未来を、
              <br />
              鳥取から、
              <br />
              つくろう。
            </h1>
            <p className="text-xs text-nowrap font-bold">この町は、もっと面白くなる！</p>
          </div>
        </div>

        <div className="absolute gap-2 inset-x-4 grid bottom-0 duration-300">
          <div className="bg-ws-background rounded-2xl col-span-2 p-4 py-6 ">
            <div className="flex items-center justify-center gap-3">
              <div className="flex flex-col gap-1 justify-center grow-3 text-right">
                <p className="leading-tight font-medium saturate-150">
                  市長選出馬予定
                  <br />
                  無所属
                </p>
              </div>

              <h1 className="text-4xl text-ws-primary saturate-150 font-bold grow-6">
                <span className="text-5xl relative before:content-['やなぎ'] before:text-sm before:absolute before:left-1 before:-top-1">
                  柳
                </span>{' '}
                <span className="relative before:content-['だいち'] before:text-sm before:absolute before:left-3 before:-top-2 before:tracking-widest">
                  大地
                </span>
              </h1>
            </div>
            <div className="flex px-4 mt-4 gap-2 child:bg-ws-primary">
              <Badge className=" text-ws-background">#元教員</Badge>
              <Badge className="bg-ws-primary text-ws-background">#34歳</Badge>
            </div>
          </div>

          <Button
            asChild
            className="bg-ws-primary text-ws-background hover:bg-ws-background text-xl"
          >
            <Link href="/policy" className="hover:text-ws-primary">
              <LuBookOpen className="mr-2 text-3xl" />
              政策を見る
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            className="border-ws-primary/30 text-ws-primary hover:bg-ws-primary text-xl"
          >
            <Link href="/support" className="hover:text-ws-background">
              <LuHandHeart className="mr-2" />
              応援する
            </Link>
          </Button>
        </div>
      </section>
      <section>
        {/* 次に会えるのは タイプ（街頭、ライブ、など）・場所・日付時刻*/}
        {/* ミニ情報列（告示/イベント/所在地） */}
        <div className="mt-4 grid grid-cols-3 gap-2">
          <div className="rounded-lg bg-ws-primary/5 border border-ws-primary/10 p-2">
            <p className="text-[10px] text-ws-primary/70">次の街頭</p>
            <p className="text-xs font-medium flex items-center gap-1">
              <LuCalendarDays /> 11/05 16:00
            </p>
          </div>
          <div className="rounded-lg bg-ws-primary/5 border border-ws-primary/10 p-2">
            <p className="text-[10px] text-ws-primary/70">場所</p>
            <p className="text-xs font-medium flex items-center gap-1">
              <LuMapPin /> 鳥取駅北口
            </p>
          </div>
          <div className="rounded-lg bg-ws-primary/5 border border-ws-primary/10 p-2">
            <p className="text-[10px] text-ws-primary/70">動画</p>
            <p className="text-xs font-medium flex items-center gap-1">
              <LuPlay /> 3分メッセージ
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
