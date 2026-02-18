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
import { useMediaQuery } from '@/hooks/use-media-query'

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

  // Infinite Scroll State
  const [page, setPage] = useState(1)
  const [hasNextPage, setHasNextPage] = useState(true)
  const [isFetchingMore, setIsFetchingMore] = useState(false)
  const observerTarget = React.useRef<HTMLDivElement>(null)

  // 詳細モーダル（共通）
  const [selected, setSelected] = useState<SelectedEntry>(null)
  // CTA 用モーダル
  const [openForm, setOpenForm] = useState(false)

  // 1024px (lg) 以上でのみ表示・動作させる
  const isDesktop = useMediaQuery('(min-width: 1024px)')

  // Initial Fetch
  useEffect(() => {
    if (!isDesktop) return

    let alive = true
    ;(async () => {
      try {
        const res = await fetchComments(60, 1)
        if (!alive) return
        setItems(res.docs)
        setHasNextPage(res.hasNextPage)
        setPage(1)
      } catch (e: any) {
        if (alive) setError(e?.message ?? 'Error')
      } finally {
        if (alive) setLoading(false)
      }
    })()
    return () => {
      alive = false
    }
  }, [isDesktop])

  // Load More Function
  const loadMore = React.useCallback(async () => {
    if (isFetchingMore || !hasNextPage) return

    setIsFetchingMore(true)
    try {
      const nextPage = page + 1
      const res = await fetchComments(60, nextPage)

      setItems((prev) => [...prev, ...res.docs])
      setHasNextPage(res.hasNextPage)
      setPage(nextPage)
    } catch (e) {
      // Error handling for load more (silent or toast)
      console.error('Failed to load more comments', e)
    } finally {
      setIsFetchingMore(false)
    }
  }, [page, hasNextPage, isFetchingMore])

  // Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading && hasNextPage) {
          loadMore()
        }
      },
      { threshold: 0.1 },
    )

    const currentTarget = observerTarget.current
    if (currentTarget) {
      observer.observe(currentTarget)
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget)
      }
    }
  }, [observerTarget, loading, hasNextPage, loadMore])

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

  if (!isDesktop) return null

  return (
    <div className="w-full h-full bg-ws-primary relative overflow-y-auto border-ws-background border-r">
      {error && (
        <div className="p-2 text-xs text-red-600">読み込み中にエラーが発生しました：{error}</div>
      )}

      {/* グリッド */}
      <div className="grid grid-cols-6">
        {cells.map((cell, i) => {
          const row = Math.floor(i / cols)
          const col = i % cols
          const isPrimary = (row % 2 === 0 && col % 2 === 0) || (row % 2 === 1 && col % 2 === 1)
          const baseBg = isPrimary ? 'bg-white' : 'bg-ws-primary text-white'

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
                    // Reset to initial state on submit
                    const res = await fetchComments(60, 1)
                    setItems(res.docs)
                    setPage(1)
                    setHasNextPage(res.hasNextPage)
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

      {/* Loading Sentinel */}
      {hasNextPage && (
        <div ref={observerTarget} className="w-full h-20 flex items-center justify-center p-4">
          {isFetchingMore && (
            <div className="h-6 w-6 animate-spin rounded-full border-2 border-white border-t-transparent" />
          )}
        </div>
      )}

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
          <Button className="bg-ws-primary group rounded-none text-wrap flex flex-col text-sm lg:text-xs w-full h-full text-white hover:bg-white hover:text-black">
            <p className="text-[12px] font-extrabold lg:text-[11px] text-center">
              あなたの声が、
              <br />
              まちをつくる。
              <br />
            </p>

            <span className="p-1 lg:p-0 border-white group-hover:border-black border-2 text-xs inline-flex items-center">
              <LuChevronLeft className="lg:hidden" />
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
