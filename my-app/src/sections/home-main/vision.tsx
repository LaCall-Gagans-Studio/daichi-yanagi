'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'

// icons
import { LuArrowRight, LuHandHeart } from 'react-icons/lu'

export default function Vision() {
  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-b to-ws-primary/70 z-10 via-white from-white py-16 px-6 md:px-12">
      {/* 背景イメージ */}
      <div className="absolute inset-0 -z-10 opacity-25">
        <Image
          src="/vision_bg.webp"
          alt="鳥取の風景"
          fill
          className="object-cover object-center opacity-30"
          priority
        />
      </div>

      <div className="flex flex-col items-center justify-between">
        <h2 className="text-xl text-center text-black flex items-center gap-2">
          <LuHandHeart />
          OUR VISION
        </h2>
        <p className="text-sm font-bold text-center text-ws-primary">目指すべき未来</p>
      </div>

      {/* メインビジョンテキスト */}
      <div className="text-center space-y-6 mt-5">
        {/* イメージ要素（下部にシンボリックな図など） */}
        <div className="mt-4 flex justify-center w-full">
          <img
            src="/vision_figure.webp"
            alt="共に生きる社会のイラスト"
            className="object-contain mr-3 h-full"
          />
        </div>
        <h2 className="text-2xl md:text-4xl font-bold text-ws-primary tracking-wide leading-tight">
          <span className="inline-flex items-center justify-center gap-2">
            <span>
              誰もが関われる
              <br />
              まちづくりを。
            </span>
          </span>
        </h2>

        <p className="text-base text-black leading-relaxed max-w-3xl mt-2 mx-auto">
          まちづくりの中心に、
          <br />
          もう一度「人」を取り戻したい。
          <br />
          私のビジョンは、
          <br />
          すべての人が居場所と出番を感じながら
          <br />
          暮らせる鳥取を<span className="font-semibold">一緒に</span>つくること。
          <br />
          教育、福祉、まちづくりをつなげ、
          <br />
          分断ではなく「共に生きるまち」
          <br />
          を創ります。
        </p>

        <div className="flex justify-center">
          <Button
            asChild
            className="bg-ws-primary text-white hover:opacity-90 transition-all shadow-md rounded-full px-6 py-2"
          >
            <Link
              href="#policy"
              onClick={(e) => {
                e.preventDefault()
                document.querySelector('#policy')?.scrollIntoView({ behavior: 'smooth' })
              }}
            >
              政策を読む <LuArrowRight className="ml-1" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
