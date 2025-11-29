// src/components/comments/detail-dialog.tsx
'use client'

import * as React from 'react'
import Image from 'next/image'
import { LuHeart } from 'react-icons/lu'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { ageLabel, districtLabel, genderLabel } from './comment-utils'
import type { CommentDoc } from './comment-utils'

export type SelectedEntry =
  | { type: 'comment'; doc: CommentDoc }
  | { type: 'reply'; doc: CommentDoc }
  | null

export function DetailDialog({
  selected,
  onOpenChange,
}: {
  selected: SelectedEntry
  onOpenChange: (open: boolean) => void
}) {
  const open = !!selected
  const doc = selected?.doc

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg text-black">
        {doc && <DetailContent doc={doc} selectedType={selected?.type} />}
      </DialogContent>
    </Dialog>
  )
}

function DetailContent({
  doc,
  selectedType,
}: {
  doc: CommentDoc
  selectedType?: 'comment' | 'reply'
}) {
  const avatarNum = doc.profileNumber && doc.profileNumber > 0 ? doc.profileNumber : 1
  const [hearts, setHearts] = React.useState(doc.hearts || 0)
  const [isHearted, setIsHearted] = React.useState(false)

  const handleHeart = async () => {
    // Optimistic update
    setHearts((prev) => prev + 1)
    setIsHearted(true)

    try {
      const res = await fetch(`/api/comments/${doc.id}/heart`, { method: 'POST' })
      if (!res.ok) {
        setHearts((prev) => Math.max(0, prev - 1))
      } else {
        const data = await res.json()
        if (typeof data.hearts === 'number') {
          setHearts(data.hearts)
        }
      }
    } catch (err) {
      console.error(err)
      setHearts((prev) => Math.max(0, prev - 1))
    }
  }

  return (
    <>
      <DialogHeader>
        <div className="flex items-center justify-start">
          <DialogTitle className="flex items-center gap-2">
            <Image
              src={`/avatars/${avatarNum}.png`}
              alt="avatar"
              width={28}
              height={28}
              className="rounded-full border"
            />
            <span className="text-base font-semibold">{doc.accountId || '匿名'}</span>
          </DialogTitle>

          {/* Heart Button */}
          <button
            type="button"
            onClick={handleHeart}
            className="flex items-center gap-1 text-gray-400 hover:text-red-500 transition-colors p-1.5 rounded-full hover:bg-red-50"
          >
            <LuHeart className={`w-5 h-5 ${isHearted ? 'fill-red-500 text-red-500' : ''}`} />
            <span className="text-sm font-medium tabular-nums">{hearts}</span>
          </button>
        </div>
        <DialogDescription className="text-left">
          {genderLabel(doc.gender)}・{ageLabel(doc.age)}・{districtLabel(doc.district)}
        </DialogDescription>
      </DialogHeader>

      {selectedType === 'comment' ? (
        <div className="space-y-4">
          <section>
            <h3 className="text-sm font-semibold text-black/70 mb-1">コメント</h3>
            <p className="text-sm leading-relaxed whitespace-pre-wrap">{doc.comment}</p>
          </section>
          {doc.reply && (
            <section className="rounded-md border border-ws-primary/30 bg-ws-primary/5 p-3">
              <h4 className="text-xs font-semibold text-ws-primary mb-1">柳からの返信</h4>
              <p className="text-sm leading-relaxed whitespace-pre-wrap">{doc.reply}</p>
            </section>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          {doc.reply && (
            <section className="rounded-md border border-ws-primary/30 bg-ws-primary/5 p-3">
              <h4 className="text-xs font-semibold text-ws-primary mb-1">柳からの返信</h4>
              <p className="text-sm leading-relaxed whitespace-pre-wrap">{doc.reply}</p>
            </section>
          )}
          <section>
            <h3 className="text-sm font-semibold text-black/70 mb-1">元のコメント</h3>
            <p className="text-sm leading-relaxed whitespace-pre-wrap">{doc.comment}</p>
          </section>
        </div>
      )}
    </>
  )
}
