'use client'

import * as React from 'react'
import { useEffect, useMemo, useState } from 'react'
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

// ▼ 共通レイヤ
import {
  fetchComments,
  makePairs,
  pairsToCells,
  type CommentDoc,
  type GridCell as BaseCell, // comment / reply / spacer の union 基底
} from '@/components/comments/comment-utils'
import { CommentTile } from '@/components/comments/comment-card'
import { DetailDialog, type SelectedEntry } from '@/components/comments/detail-dialog'

// 送信用フォーム（既存）
import { CommentForm } from '../components/comments/comment-form'

// CTA だけはこのファイル内に保持（UIが専用のため）
type CtaCell = { kind: 'cta'; key: string; variant: 'pen' | 'slogan' }
type GridCell = BaseCell | CtaCell

// BaseCell からコメントだけを抜き出すための型
type CommentCell = Extract<BaseCell, { kind: 'comment' }>

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

  const cols = 6

  // ---- BaseCell から「コメントだけ」を取り出す ----
  const commentCells: CommentCell[] = useMemo(() => {
    const pairs = makePairs(items)
    const base = pairsToCells(pairs)

    // kind === 'comment' だけ残す（reply / spacer はここで除外）
    return base.filter((cell): cell is CommentCell => !!cell && cell.kind === 'comment')
  }, [items])

  // ---- コメント列の中に CTA を 3行目 5・6 マス目に挿入 ----
  const cells: GridCell[] = useMemo(() => {
    const out: GridCell[] = [...commentCells]

    // 3段目の 5・6 マス（1始まり）に CTA を挿入
    const thirdRowStart = 2 * cols // 0始まりで3段目先頭
    const idx5 = thirdRowStart + 4 // 3段目5マス目 → index=16

    // コメントが少ないときは、splice の start が length を超えると末尾に追加されるだけなのでOK
    out.splice(
      idx5,
      0,
      { kind: 'cta', key: 'cta-pen', variant: 'pen' },
      { kind: 'cta', key: 'cta-slogan', variant: 'slogan' },
    )

    return out
  }, [commentCells])

  return (
    <div className="w-full h-full bg-ws-secondary relative font-zen overflow-y-auto border-ws-background border-r">
      {error && (
        <div className="p-2 text-xs text-red-600">読み込み中にエラーが発生しました：{error}</div>
      )}

      {/* グリッド */}
      <div className="grid grid-cols-6">
        {cells.map((cell, i) => {
          const row = Math.floor(i / cols)
          const col = i % cols
          const isPrimary = (row % 2 === 0 && col % 2 === 0) || (row % 2 === 1 && col % 2 === 1)
          const baseBg = isPrimary ? 'bg-white' : 'bg-ws-secondary'

          // CTA
          if ('kind' in cell && cell.kind === 'cta') {
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
                  } catch {
                    // 失敗してもグリッドはそのまま
                  }
                }}
              />
            )
          }

          // comment（reply / spacer はそもそも配列に入れていない）
          if ('kind' in cell && cell.kind === 'comment') {
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

          // 念のため
          return null
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
          <Button className="bg-ws-primary rounded-none text-wrap flex flex-col text-sm w-full h-full text-black hover:bg-white">
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
