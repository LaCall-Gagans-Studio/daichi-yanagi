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

// icons
import { LuChevronLeft, LuSquarePen } from 'react-icons/lu'

// sections
import { CommentForm } from './home-grids/comment-form'

// ---- 型定義（APIの返却スキーマに合わせて）----
type Gender = 'unspecified' | 'male' | 'female' | 'nonbinary' | 'other'

type CommentDoc = {
  id: string
  accountId: string
  comment: string
  reply?: string | null
  profileNumber?: number
  age?: number | null
  gender?: Gender
  occupation?: string | null
  district?: string | null
}

// ---- ここを書き換え：DBから取得 ----
async function fetchComments(limit = 60): Promise<CommentDoc[]> {
  const res = await fetch(`/api/comments?limit=${limit}`, { cache: 'no-store' })
  if (!res.ok) throw new Error('Failed to fetch comments')
  const data = await res.json()
  // 期待: [{ id, comment, reply, ... }]
  return Array.isArray(data) ? data : (data?.docs ?? [])
}

// ---- 表示用ユーティリティ ----
function genderLabel(g?: Gender) {
  switch (g) {
    case 'male':
      return '男性'
    case 'female':
      return '女性'
    case 'nonbinary':
      return 'ノンバイナリ'
    case 'other':
      return 'その他'
    default:
      return '性別非公開'
  }
}
function ageLabel(a?: number | null) {
  return typeof a === 'number' && a >= 0 ? `${a}歳` : '年齢非公開'
}
function districtLabel(d?: string | null) {
  return d && d.trim() ? d : '地区非公開'
}

export default function HomeGrids() {
  const [items, setItems] = useState<CommentDoc[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [open, setOpen] = useState(false) // モーダル開閉
  const [selected, setSelected] = useState<{ type: 'comment' | 'reply'; doc: CommentDoc } | null>(
    null,
  )

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

  // ---- レイアウト用データに変換 ----
  const cols = 6
  type GridCell =
    | {
        kind: 'comment'
        key: string
        text: string
        source: CommentDoc // ← 追加
        meta: {
          accountId: string
          profileNumber?: number
          age?: number | null
          gender?: Gender
          district?: string | null
        }
      }
    | { kind: 'reply'; key: string; text: string; source: CommentDoc } // ← 追加
    | { kind: 'cta'; key: string; variant: 'pen' | 'slogan' }
    | { kind: 'spacer'; key: string }

  function toCommentCell(item: CommentDoc): GridCell {
    return {
      kind: 'comment',
      key: `${item.id}-comment`,
      text: item.comment,
      source: item, // ← 追加
      meta: {
        accountId: item.accountId,
        profileNumber: item.profileNumber,
        age: item.age ?? undefined,
        gender: item.gender ?? 'unspecified',
        district: item.district ?? undefined,
      },
    }
  }
  function toReplyCell(item: CommentDoc): GridCell {
    return { kind: 'reply', key: `${item.id}-reply`, text: item.reply!, source: item } // ← 追加
  }

  const cells = useMemo<(GridCell | null)[]>(() => {
    // 1) コメント列を「ペア」に詰める
    const pairs: Array<[GridCell | null, GridCell | null]> = []
    let pendingNoReply: CommentDoc | null = null

    for (const item of items) {
      const hasReply = !!item.reply
      if (hasReply) {
        // 保留の返信なしがあれば吐き出してから、返信ありをペアで追加
        if (pendingNoReply) {
          pairs.push([toCommentCell(pendingNoReply), null])
          pendingNoReply = null
        }
        pairs.push([toCommentCell(item), toReplyCell(item)])
      } else {
        // 返信なし：バッファが空なら保留、埋まっていれば2件で1ペア化
        if (!pendingNoReply) {
          pendingNoReply = item
        } else {
          pairs.push([toCommentCell(pendingNoReply), toCommentCell(item)])
          pendingNoReply = null
        }
      }
    }
    // 終端で保留が残っていれば [comment, spacer]
    if (pendingNoReply) {
      pairs.push([toCommentCell(pendingNoReply), null])
      pendingNoReply = null
    }

    // 2) ペアをフラット化（常に [左, 右] 順で push）
    const out: Array<GridCell | null> = []
    for (let i = 0; i < pairs.length; i++) {
      const [left, right] = pairs[i]

      const L = left ?? { kind: 'spacer', key: `sp-${i}-L` as const }
      const R = right ?? { kind: 'spacer', key: `sp-${i}-R` as const }

      // ここで rowIndex の偶奇判定を削除し、常に [L, R]
      out.push(L, R)
    }

    // 3) 3段目の 5・6 マスを CTA に差し替え（そのまま維持）
    const thirdRowStart = 2 * cols
    const idx5 = thirdRowStart + 4
    const idx6 = thirdRowStart + 5
    while (out.length < 40) out.push(null)
    out.splice(
      idx5,
      0,
      { kind: 'cta', key: 'cta-5', variant: 'pen' },
      { kind: 'cta', key: 'cta-6', variant: 'slogan' },
    )

    return out
  }, [items])

  return (
    <div className="w-full h-full bg-ws-secondary relative font-zen overflow-y-scroll">
      {/* ローディング / エラー */}
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
          const row = Math.floor(i / cols)
          const col = i % cols
          const isPrimary = (row % 2 === 0 && col % 2 === 0) || (row % 2 === 1 && col % 2 === 1)
          const baseBg = isPrimary ? 'bg-white' : 'bg-ws-secondary'

          // 空スロット（null）
          if (!cell) {
            return <div key={`empty-${i}`} className={`aspect-square ${baseBg}`} />
          }

          // CTA（3段目の5・6）
          if (cell.kind === 'cta') {
            return (
              <CtaTile
                key={cell.key}
                variant={cell.variant}
                baseBg={baseBg}
                open={open}
                setOpen={setOpen}
                afterSubmit={async () => {
                  try {
                    const docs = await fetchComments(60)
                    setItems(docs)
                  } catch {}
                }}
              />
            )
          }

          if (cell.kind === 'spacer') {
            return <div key={cell.key} className={`aspect-square ${baseBg}`} />
          }

          // コメント / 返信セル
          // CHANGED: コメントセル（外枠に onClick）
          if (cell.kind === 'comment') {
            const meta = cell.meta
            const avatarNum = meta.profileNumber && meta.profileNumber > 0 ? meta.profileNumber : 1
            return (
              <button
                key={cell.key}
                type="button"
                onClick={() => setSelected({ type: 'comment', doc: cell.source })} // ← 追加
                className={`aspect-square ${baseBg} text-left hover:border-black hover:border-2 hover:border-double  focus:outline-none focus:ring-2 focus:ring-ws-primary/40`}
              >
                <div className="w-full h-full p-3">
                  {/* ミニプロフィール行 */}
                  <div className="flex items-center">
                    <Image
                      src={`/avatars/${avatarNum}.png`}
                      alt="avatar"
                      width={24}
                      height={24}
                      className="w-6 h-6 object-contain"
                    />
                    <div className="gap-0 space-y-0 ml-2 leading-tight">
                      <p className="text-[11px] font-semibold text-black leading-none line-clamp-1">
                        {meta.accountId || '匿名'}
                      </p>
                      <p className="text-[10px] mt-0.5 text-black line-clamp-1">
                        {genderLabel(meta.gender)}・{ageLabel(meta.age)}・
                        {districtLabel(meta.district)}
                      </p>
                    </div>
                  </div>
                  {/* コメント本文 */}
                  <div className="mt-1 flex-1">
                    <p className="text-xs text-black leading-snug line-clamp-3">{cell.text}</p>
                  </div>
                </div>
              </button>
            )
          }

          // CHANGED: 返信セル（外枠に onClick）
          if (cell.kind === 'reply') {
            return (
              <button
                key={cell.key}
                type="button"
                onClick={() => setSelected({ type: 'reply', doc: cell.source })} // ← 追加
                className={`aspect-square ${baseBg} p-2 text-left hover:border-black hover:border-2 hover:border-double  focus:outline-none focus:ring-2 focus:ring-ws-primary/40`}
              >
                <div className="w-full h-full flex items-center justify-start">
                  <div>
                    <LuChevronLeft />
                  </div>

                  <p className="text-xs ml-1 text-black leading-snug line-clamp-5">{cell.text}</p>
                </div>
              </button>
            )
          }
        })}
      </div>

      {/* NEW: 詳細モーダル（comment / reply どちらのクリックでも開く） */}
      <Dialog open={!!selected} onOpenChange={(o) => !o && setSelected(null)}>
        <DialogContent className="max-w-lg text-black">
          {selected && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <Image
                    src={`/avatars/${selected.doc.profileNumber && selected.doc.profileNumber > 0 ? selected.doc.profileNumber : 1}.png`}
                    alt="avatar"
                    width={28}
                    height={28}
                    className="rounded-full border"
                  />
                  <span className="text-base font-semibold">
                    {selected.doc.accountId || '匿名'}
                  </span>
                </DialogTitle>
                <DialogDescription>
                  {genderLabel(selected.doc.gender)}・{ageLabel(selected.doc.age)}・
                  {districtLabel(selected.doc.district)}
                </DialogDescription>
              </DialogHeader>

              {/* 本文: 選択が comment ならコメント優先、reply なら返信優先で上に */}
              {selected.type === 'comment' ? (
                <div className="space-y-4">
                  <section>
                    <h3 className="text-sm font-semibold text-black/70 mb-1">コメント</h3>
                    <p className="text-sm leading-relaxed whitespace-pre-wrap">
                      {selected.doc.comment}
                    </p>
                  </section>
                  {selected.doc.reply && (
                    <section className="rounded-md border border-ws-primary/30 bg-ws-primary/5 p-3">
                      <h4 className="text-xs font-semibold text-ws-primary mb-1">運営からの返信</h4>
                      <p className="text-sm leading-relaxed whitespace-pre-wrap">
                        {selected.doc.reply}
                      </p>
                    </section>
                  )}
                </div>
              ) : (
                <div className="space-y-4">
                  {selected.doc.reply && (
                    <section className="rounded-md border border-ws-primary/30 bg-ws-primary/5 p-3">
                      <h4 className="text-xs font-semibold text-ws-primary mb-1">運営からの返信</h4>
                      <p className="text-sm leading-relaxed whitespace-pre-wrap">
                        {selected.doc.reply}
                      </p>
                    </section>
                  )}
                  <section>
                    <h3 className="text-sm font-semibold text-black/70 mb-1">元のコメント</h3>
                    <p className="text-sm leading-relaxed whitespace-pre-wrap">
                      {selected.doc.comment}
                    </p>
                  </section>
                </div>
              )}
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

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
