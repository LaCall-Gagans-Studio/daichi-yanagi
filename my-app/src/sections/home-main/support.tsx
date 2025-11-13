'use client'

import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import Image from 'next/image'

// icons
import { LuSend } from 'react-icons/lu'

export default function Support() {
  return (
    <section
      id="support"
      className="
        relative w-full p-8 overflow-hidden"
      aria-labelledby="support-heading"
    >
      {/* 背景デザイン（淡い円や模様） */}
      <div
        className="absolute inset-0 -z-10 opacity-10 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-ws-primary/50 via-transparent to-transparent"
        aria-hidden
      />

      {/* 見出し */}
      <div className="flex flex-col items-center justify-between">
        <h2 className="text-xl text-center text-black flex items-center gap-2">
          <LuSend />
          JOIN VOLUNTEER!
        </h2>
        <p className="text-sm font-bold text-center text-ws-primary">ボランティア</p>
      </div>

      {/* イメージエリア（任意の差し替えOK） */}
      <div className="flex justify-center">
        <img src="/support_figure.webp" alt="ボランティアのイメージ" className="object-cover" />
      </div>

      {/* コンテンツ本文 */}
      <div className="flex flex-col items-center justify-between gap-10">
        <div className="flex-1 text-sm text-black leading-relaxed">
          <p>
            街頭活動、ポスター掲示、SNSでの発信、動画編集など、あなたの得意を生かした形で関われます。
          </p>
          <p>一人ひとりの小さなアクションが、まちを変える大きな力になります。</p>
          <p className="mt-3">
            応援の方法は自由です。フォームから登録していただければ、活動内容やイベント情報をお知らせします。
          </p>

          <div className="mt-5">
            <Button
              asChild
              className="
                bg-ws-primary text-white hover:opacity-90 transition-all
                shadow-md rounded-full px-6 py-2 text-sm
              "
            >
              <Link href="/ongoing">ボランティア登録へ</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
