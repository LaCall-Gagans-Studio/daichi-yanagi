'use client'

import * as React from 'react'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import throttle from 'lodash.throttle'
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
// スマホ専用横スライド・グリッド（2列×3行を1ページとして横にスナップ）
export default function Grids() {
  const [items, setItems] = useState<CommentDoc[]>([])
  const [hasMore, setHasMore] = useState(true)
  const isFetching = useRef(false)
  const [apiPage, setApiPage] = useState(1) // Payload APIのページ番号 (1-based)
  const [totalDocs, setTotalDocs] = useState(0) // 追加: 総アイテム数

  // 初回ロード用
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [selected, setSelected] = useState<SelectedEntry>(null)
  const [openForm, setOpenForm] = useState(false)

  const scrollerRef = useRef<HTMLDivElement | null>(null)
  const [page, setPage] = useState(0) // 現在の表示上のページインデックス (0-based)

  const PAGE_COLS = 2
  const PAGE_ROWS = 3
  const PAGE_SIZE = PAGE_COLS * PAGE_ROWS
  const FETCH_LIMIT = 24 // 4ページ分ずつ取得

  // データ取得関数
  const loadComments = useCallback(async (pageToLoad: number) => {
    if (isFetching.current) return
    isFetching.current = true
    setError(null)

    try {
      const res = await fetchComments(FETCH_LIMIT, pageToLoad)

      setItems((prev) => {
        if (pageToLoad === 1) return res.docs
        // 重複排除（念のため）
        const existing = new Set(prev.map((i) => i.id))
        const incoming = res.docs.filter((d) => !existing.has(d.id))
        return [...prev, ...incoming]
      })

      if (pageToLoad === 1) {
        setTotalDocs(res.totalDocs)
      }

      setHasMore(res.hasNextPage)
      if (res.nextPage) {
        setApiPage(res.nextPage)
      }
    } catch (e: any) {
      setError(e?.message ?? 'Error loading comments')
    } finally {
      isFetching.current = false
      setLoading(false)
    }
  }, [])

  // ... (useEffect effects unchanged)

  // ... (cells and pages memos unchanged)

  // 総ページ数（クライアント表示上の6件/ページ換算）
  const totalPages = Math.ceil(totalDocs / PAGE_SIZE) || 1

  // 水平スクロール → ページインデックス算出 (unchanged)

  // ... (render)

  // 初回取得
  useEffect(() => {
    loadComments(1)
  }, [loadComments])

  // 無限スクロール監視
  useEffect(() => {
    if (!hasMore || isFetching.current || loading) return

    // 現在読み込まれているデータで表示できるページ数
    const loadedVisualPages = Math.ceil(items.length / PAGE_SIZE)

    // 現在のページが、読み込み済み末尾から2ページ以内に近づいたら次を取得
    // pageは0-basedなので、比較調整
    const threshold = loadedVisualPages - 2

    if (page >= threshold) {
      loadComments(apiPage)
    }
  }, [page, items.length, hasMore, apiPage, loading, PAGE_SIZE, loadComments])

  // コメントのみをセルへ（reply / spacer は除外）
  const cells = useMemo<CommentCell[]>(() => {
    const pairs = makePairs(items)
    const base = pairsToCells(pairs)

    // kind === 'comment' だけ残す
    return base.filter((cell): cell is CommentCell => !!cell && cell.kind === 'comment')
  }, [items])

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
  }, [cells, PAGE_SIZE])

  // 水平スクロール → ページインデックス算出
  const onScroll = useMemo(
    () =>
      throttle(() => {
        const el = scrollerRef.current
        if (!el) return
        const w = el.clientWidth
        const idx = Math.round(el.scrollLeft / (w || 1))
        if (idx !== page) {
          setPage(idx)
        }
      }, 200),
    [],
  )

  const goTo = (idx: number) => {
    const el = scrollerRef.current
    if (!el) return
    const clamped = Math.max(0, Math.min(idx, pages.length - 1))
    el.scrollTo({ left: clamped * el.clientWidth, behavior: 'smooth' })
  }

  return (
    // スマホ優先表示
    <div className="block lg:hidden w-full bg-ws-primary relative  my-12 py-6">
      <div className="flex flex-col items-center justify-between my-6">
        <h2 className="text-2xl text-center text-white flex items-center gap-2">
          <LuNewspaper />
          Voice
        </h2>
        <p className="text-sm font-medium text-center text-white">みんなの声</p>
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
              <div className="grid grid-cols-2">
                {cellsInPage.map((cell, i) => {
                  // 市松模様（ページ単位でもズレないように全体インデックスを計算）
                  const globalIndex = pageIndex * PAGE_SIZE + i
                  const row = Math.floor((globalIndex % (PAGE_COLS * PAGE_ROWS)) / PAGE_COLS)
                  const col = globalIndex % PAGE_COLS
                  const isPrimary =
                    (row % 2 === 0 && col % 2 === 0) || (row % 2 === 1 && col % 2 === 1)
                  const baseBg = isPrimary ? 'bg-white' : 'bg-ws-primary text-white'

                  // 現在のページとその前後以外は中身を描画しない (DOM削減)
                  const isVisible = Math.abs(pageIndex - page) <= 1
                  if (!isVisible) {
                    return <div key={`ph-${globalIndex}`} className={`aspect-square ${baseBg}`} />
                  }

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
          {page > 0 && <span className="text-xs text-white/50">...</span>}
          <span className="text-sm font-bold text-white tabular-nums">{page + 1}</span>
          <span className="text-xs text-white/50">/ {totalPages}</span>
          {page < totalPages - 1 && <span className="text-xs text-white/50">...</span>}
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
                // 投稿後は先頭リセット
                loadComments(1)
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
