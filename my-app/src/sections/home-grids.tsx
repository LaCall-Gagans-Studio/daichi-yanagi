'use client'

import * as React from 'react'
import { useEffect, useMemo, useState } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from '@/components/ui/dialog'
import { LuChevronLeft, LuSquarePen } from 'react-icons/lu'

// ▼ 共通レイヤ（さっき作ったやつ）
import {
  fetchComments,
  makePairs,
  pairsToCells,
  type CommentDoc,
  type GridCell as BaseCell, // comment / reply / spacer の union 基底
} from '@/components/comments/comment-utils'
import { CommentTile, ReplyTile, SpacerTile } from '@/components/comments/comment-card'
import { DetailDialog, type SelectedEntry } from '@/components/comments/detail-dialog'

// 送信用フォーム（既存）
import { CommentForm } from '../components/comments/comment-form'

// CTA だけはこのファイル内に保持（UIが専用のため）
type CtaCell = { kind: 'cta'; key: string; variant: 'pen' | 'slogan' }
type GridCell = BaseCell | CtaCell

export default function HomeGrids() {
  const [items, setItems] = useState<CommentDoc[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // 詳細モーダル（共通）
  const [selected, setSelected] = useState<SelectedEntry>(null)
  // CTA 用モーダル
  const [openForm, setOpenForm] = useState(false)

  useEffect(() => {
    let alive = true
    ;(async () => {
      try {
        const docs = await fetchComments(60)
        if (!alive) return
        setItems(docs)
      } catch (e: any) {
        if (alive) setError(e?.message ?? 'Error')
      } finally {
        if (alive) setLoading(false)
      }
    })()
    return () => {
      alive = false
    }
  }, [])

  // ---- レイアウト（共通ユーティリティ利用）----
  const cols = 6
  const cells: GridCell[] = useMemo(() => {
    // 1) pairs を作って 2マス単位のセル列に展開（常に [左, 右]）
    const pairs = makePairs(items)
    const base = pairsToCells(pairs) // comment / reply / spacer（CTAなし）

    // null を spacer に変換して GridCell[] に正規化
    const normalized: GridCell[] = base.map((c, i) => c ?? { kind: 'spacer', key: `sp-norm-${i}` })

    // 2) 3段目の 5・6 マス（1始まり）に CTA を「挿入」する
    const thirdRowStart = 2 * cols // 0始まりで3段目先頭
    const idx5 = thirdRowStart + 4 // 3段目5マス目 → index=16
    // const idx6 = thirdRowStart + 5;  // ← spliceで一緒に入れるので個別代入は不要

    // base から null を spacer に正規化済みとして: normalized を用意してある前提
    const out: GridCell[] = [...normalized]

    // 3段目の5マス目（idx5）まで長さが足りない場合は spacer で埋める
    while (out.length < idx5) {
      out.push({ kind: 'spacer', key: `sp-fill-${out.length}` })
    }

    // ここで 2 要素をまとめて挿入（以降は右へ押し出される）
    out.splice(
      idx5,
      0,
      { kind: 'cta', key: 'cta-5', variant: 'pen' },
      { kind: 'cta', key: 'cta-6', variant: 'slogan' },
    )

    return out
  }, [items])

  return (
    <div className="w-full h-full bg-ws-secondary relative font-zen overflow-y-auto border-ws-background border-r">
      {/* ステータス */}
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center text-white/80">
          読み込み中…
        </div>
      )}
      {error && (
        <div className="absolute inset-0 flex items-center justify-center text-red-100">
          エラー: {error}
        </div>
      )}

      {/* グリッド */}
      <div className="grid grid-cols-6">
        {cells.map((cell, i) => {
          // チェッカーボード背景の算出はそのまま
          const row = Math.floor(i / cols)
          const col = i % cols
          const isPrimary = (row % 2 === 0 && col % 2 === 0) || (row % 2 === 1 && col % 2 === 1)
          const baseBg = isPrimary ? 'bg-white' : 'bg-ws-secondary'

          // spacer / 空
          if (!cell || cell.kind === 'spacer') {
            return <SpacerTile key={cell ? cell.key : `empty-${i}`} className={baseBg} />
          }

          // CTA
          if (cell.kind === 'cta') {
            return (
              <CtaTile
                key={cell.key}
                variant={cell.variant}
                baseBg={baseBg}
                open={openForm}
                setOpen={setOpenForm}
                afterSubmit={async () => {
                  try {
                    const docs = await fetchComments(60)
                    setItems(docs)
                  } catch {}
                }}
              />
            )
          }

          // comment / reply（共通カード）
          if (cell.kind === 'comment') {
            return (
              <CommentTile
                key={cell.key}
                text={cell.text}
                meta={cell.meta}
                className={baseBg}
                onClick={() => setSelected({ type: 'comment', doc: cell.source })}
              />
            )
          }

          // reply
          return (
            <ReplyTile
              key={cell.key}
              text={cell.text}
              className={baseBg}
              onClick={() => setSelected({ type: 'reply', doc: cell.source })}
            />
          )
        })}
      </div>

      {/* 詳細（共通） */}
      <DetailDialog selected={selected} onOpenChange={(o) => !o && setSelected(null)} />
    </div>
  )
}

/* ───────── CTA（この画面専用UI）───────── */
function CtaTile({
  variant,
  baseBg,
  open,
  setOpen,
  afterSubmit,
}: {
  variant: 'pen' | 'slogan'
  baseBg: string
  open: boolean
  setOpen: (v: boolean) => void
  afterSubmit: () => Promise<void>
}) {
  if (variant === 'pen') {
    return (
      <div className={`aspect-square ${baseBg}`}>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button
              className={`${baseBg} rounded-none text-wrap flex flex-col w-full h-full text-black hover:bg-ws-primary`}
            >
              <LuSquarePen className="text-7xl size-9" />
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md text-black">
            <DialogHeader>
              <DialogTitle>あなたの声を聞かせてください</DialogTitle>
              <DialogDescription>
                ニックネームとコメントを入力してください。公開まで少しお時間をいただく場合があります。
              </DialogDescription>
            </DialogHeader>
            <CommentForm
              onSubmitted={async () => {
                setOpen(false)
                await afterSubmit()
              }}
            />
          </DialogContent>
        </Dialog>
      </div>
    )
  }

  // variant === 'slogan'
  return (
    <div className={`aspect-square ${baseBg}`}>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button className=" bg-ws-primary rounded-none text-wrap flex flex-col text-sm w-full h-full text-black hover:bg-white">
            あなたの声が、
            <br />
            まちをつくる。
            <br />
            <span className="p-1 border-black border-2 text-xs inline-flex items-center">
              <LuChevronLeft />
              コメントする
            </span>
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-md text-black">
          <DialogHeader>
            <DialogTitle>あなたの声を聞かせてください</DialogTitle>
            <DialogDescription>
              ニックネームとコメントを入力してください。公開まで少しお時間をいただく場合があります。
            </DialogDescription>
          </DialogHeader>
          <CommentForm
            onSubmitted={async () => {
              setOpen(false)
              await afterSubmit()
            }}
          />
        </DialogContent>
      </Dialog>
    </div>
  )
}
