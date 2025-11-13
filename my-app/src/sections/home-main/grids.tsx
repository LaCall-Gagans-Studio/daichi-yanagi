'use client'

import * as React from 'react'
import { useEffect, useMemo, useRef, useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

// 共通層
import {
  fetchComments,
  makePairs,
  pairsToCells,
  type CommentDoc,
  type GridCell,
} from '@/components/comments/comment-utils'
import { CommentTile } from '@/components/comments/comment-card'
import { DetailDialog, type SelectedEntry } from '@/components/comments/detail-dialog'
import { CommentForm } from '../../components/comments/comment-form'

// icons
import { LuNewspaper } from 'react-icons/lu'

// 「コメントだけ」取り出すための型
type CommentCell = Extract<GridCell, { kind: 'comment' }>

// スマホ専用横スライド・グリッド（2列×3行を1ページとして横にスナップ）
export default function Grids() {
  const [items, setItems] = useState<CommentDoc[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [selected, setSelected] = useState<SelectedEntry>(null)
  const [openForm, setOpenForm] = useState(false)

  const scrollerRef = useRef<HTMLDivElement | null>(null)
  const [page, setPage] = useState(0)

  // 初回取得
  useEffect(() => {
    let alive = true
    ;(async () => {
      try {
        const docs = await fetchComments(120)
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

  // コメントのみをセルへ（reply / spacer は除外）
  const cells = useMemo<CommentCell[]>(() => {
    const pairs = makePairs(items)
    const base = pairsToCells(pairs)

    // kind === 'comment' だけ残す
    return base.filter((cell): cell is CommentCell => !!cell && cell.kind === 'comment')
  }, [items])

  // 2列×3行 = 1ページ6セルに分割 （※元コードのまま 4x6 グリッド設定）
  const PAGE_COLS = 4
  const PAGE_ROWS = 6
  const PAGE_SIZE = PAGE_COLS * PAGE_ROWS

  const pages = useMemo(() => {
    const out: Array<CommentCell | null>[] = []
    for (let i = 0; i < cells.length; i += PAGE_SIZE) {
      out.push(cells.slice(i, i + PAGE_SIZE))
    }
    if (out.length === 0) out.push([]) // 空でも1ページ用意

    // 足りないマスは null で埋めて PAGE_SIZE 枚に
    return out.map((p) => {
      const filled: Array<CommentCell | null> = [...p]
      while (filled.length < PAGE_SIZE) {
        filled.push(null)
      }
      return filled
    })
  }, [cells])

  // 水平スクロール → ページインデックス算出
  const onScroll = () => {
    const el = scrollerRef.current
    if (!el) return
    const w = el.clientWidth
    const idx = Math.round(el.scrollLeft / (w || 1))
    setPage(idx)
  }

  const goTo = (idx: number) => {
    const el = scrollerRef.current
    if (!el) return
    const clamped = Math.max(0, Math.min(idx, pages.length - 1))
    el.scrollTo({ left: clamped * el.clientWidth, behavior: 'smooth' })
  }

  return (
    // スマホ優先表示（必要なら lg:hidden などでPC側を隠す）
    <div className="block lg:hidden w-full bg-ws-secondary relative font-zen my-12 py-6">
      <div className="flex flex-col items-center justify-between my-6">
        <h2 className="text-2xl text-center text-black flex items-center gap-2">
          <LuNewspaper />
          Voice
        </h2>
        <p className="text-sm font-medium text-center text-black">みんなの声</p>
      </div>

      {/* 横スクロール・ページャブル領域 */}
      <div
        ref={scrollerRef}
        onScroll={onScroll}
        className="
          w-full
          overflow-x-auto overflow-y-hidden
          snap-x snap-mandatory
          scroll-smooth
          [-webkit-overflow-scrolling:touch]
        "
      >
        <div className="flex w-full">
          {pages.map((cellsInPage, pageIndex) => (
            <section
              key={`page-${pageIndex}`}
              className="
                snap-start shrink-0
                w-full
                px-2
                text-xs
                md:text-base
              "
            >
              {/* 各ページは grid */}
              <div className="grid grid-cols-4">
                {cellsInPage.map((cell, i) => {
                  // 市松模様（ページ単位でもズレないように全体インデックスを計算）
                  const globalIndex = pageIndex * PAGE_SIZE + i
                  const row = Math.floor((globalIndex % (PAGE_COLS * PAGE_ROWS)) / PAGE_COLS)
                  const col = globalIndex % PAGE_COLS
                  const isPrimary =
                    (row % 2 === 0 && col % 2 === 0) || (row % 2 === 1 && col % 2 === 1)
                  const baseBg = isPrimary ? 'bg-white' : 'bg-ws-secondary'

                  // 空マス（spacer代わりのプレーンセル）
                  if (!cell) {
                    return (
                      <div key={`empty-${globalIndex}`} className={`aspect-square ${baseBg}`} />
                    )
                  }

                  // comment だけ描画（reply は cells 作成時に除外済み）
                  return (
                    <CommentTile
                      key={cell.key}
                      text={cell.text}
                      meta={cell.meta}
                      className={baseBg}
                      onClick={() => setSelected({ type: 'comment', doc: cell.source })}
                    />
                  )
                })}
              </div>
            </section>
          ))}
        </div>
      </div>

      {/* ページネーション（ドット + 前後） */}
      <div className="mt-3 flex items-center justify-center gap-2">
        <Button
          variant="outline"
          size="sm"
          className="border-ws-primary/30 text-ws-primary"
          onClick={() => goTo(page - 1)}
          disabled={page <= 0}
        >
          前へ
        </Button>
        <div className="flex items-center gap-1">
          {pages.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-current={i === page ? 'page' : undefined}
              className={[
                'h-2.5 w-2.5 rounded-full transition-colors',
                i === page ? 'bg-ws-primary' : 'bg-white/40',
              ].join(' ')}
            />
          ))}
        </div>
        <Button
          variant="outline"
          size="sm"
          className="border-ws-primary/30 text-ws-primary"
          onClick={() => goTo(page + 1)}
          disabled={page >= pages.length - 1}
        >
          次へ
        </Button>
      </div>

      {/* グリッド外 CTA（下に常設） */}
      <div className="mt-4 flex items-center justify-center">
        <Dialog open={openForm} onOpenChange={setOpenForm}>
          <DialogTrigger asChild>
            <Button className=" bg-ws-background rounded-2xl w-1/2 text-wrap flex flex-col text-sm h-full text-black hover:bg-white">
              あなたの声が、
              <br />
              まちをつくる。
              <br />
              <span className="p-1 border-black border-2 text-xs inline-flex items-center">
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
              onSubmitted={() => {
                setOpenForm(false)
                ;(async () => {
                  try {
                    const docs = await fetchComments(120)
                    setItems(docs)
                  } catch {
                    // 失敗しても現状維持
                  }
                })()
              }}
            />
          </DialogContent>
        </Dialog>
      </div>

      {/* 詳細モーダル（共通） */}
      <DetailDialog selected={selected} onOpenChange={(o) => !o && setSelected(null)} />
    </div>
  )
}
