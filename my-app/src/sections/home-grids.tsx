// components/sections/home-grids.tsx
'use client'

import React from 'react'
import { comments } from '@/lib/comments'

export default function HomeGrids() {
  const cols = 6 // 1行の列数（固定）
  const pairPerRow = cols / 2 // 3コメント/行（各コメントが2マス）

  // comments を行ごとに 3件ずつに分割
  const rows: (typeof comments)[] = []
  for (let i = 0; i < comments.length; i += pairPerRow) {
    rows.push(comments.slice(i, i + pairPerRow))
  }

  // 行→セル（2マス/コメント）に展開
  const cells: Array<{ kind: 'comment' | 'reply'; text: string; key: string } | null> = []

  rows.forEach((rowItems, rowIndex) => {
    const evenRow1based = (rowIndex + 1) % 2 === 0 // 偶数段（1始まり）

    rowItems.forEach((item) => {
      const commentCell = {
        kind: 'comment' as const,
        text: item.comment,
        key: `${item.id}-comment`,
      }
      const replyCell = item.reply
        ? { kind: 'reply' as const, text: item.reply, key: `${item.id}-reply` }
        : null

      // 偶数段は reply → comment、奇数段は comment → reply
      if (evenRow1based) {
        if (replyCell) cells.push(replyCell)
        cells.push(commentCell)
      } else {
        cells.push(commentCell)
        if (replyCell) cells.push(replyCell)
      }
    })
  })

  return (
    <div className="w-full h-full bg-ws-secondary relative font-zen">
      <div className="grid grid-cols-6">
        {cells.map((cell, i) => {
          if (!cell) {
            // reply が無い場合などの穴埋め（必要ならプレースホルダ）
            return <div key={`empty-${i}`} className="aspect-square bg-ws-secondary" />
          }

          // 市松模様（チェッカーボード）背景
          const row = Math.floor(i / cols)
          const col = i % cols
          const isPrimary = (row % 2 === 0 && col % 2 === 0) || (row % 2 === 1 && col % 2 === 1)

          const baseBg = isPrimary ? 'bg-white' : 'bg-ws-secondary'

          return (
            <div key={cell.key} className={`aspect-square ${baseBg}  p-2 sm:p-3 md:p-4`}>
              <div className="w-full h-full flex items-center justify-center text-left">
                <p className={`text-xs  text-black leading-snug line-clamp-5`}>{cell.text}</p>
              </div>
            </div>
          )
        })}
      </div>

      {/* 中央メッセージ（そのまま残す場合） */}
      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center text-white text-3xl sm:text-4xl font-bold mix-blend-difference">
        Grid <br />
        Comment <br />
        System <br />
        Coming Soon
      </div>
    </div>
  )
}
