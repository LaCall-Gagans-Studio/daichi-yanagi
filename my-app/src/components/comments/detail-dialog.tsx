// src/components/comments/detail-dialog.tsx
'use client'

import * as React from 'react'
import Image from 'next/image'
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
  const avatarNum = doc && doc.profileNumber && doc.profileNumber > 0 ? doc.profileNumber : 1

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg text-black">
        {doc && (
          <>
            <DialogHeader>
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
              <DialogDescription>
                {genderLabel(doc.gender)}・{ageLabel(doc.age)}・{districtLabel(doc.district)}
              </DialogDescription>
            </DialogHeader>

            {selected?.type === 'comment' ? (
              <div className="space-y-4">
                <section>
                  <h3 className="text-sm font-semibold text-black/70 mb-1">コメント</h3>
                  <p className="text-sm leading-relaxed whitespace-pre-wrap">{doc.comment}</p>
                </section>
                {doc.reply && (
                  <section className="rounded-md border border-ws-primary/30 bg-ws-primary/5 p-3">
                    <h4 className="text-xs font-semibold text-ws-primary mb-1">運営からの返信</h4>
                    <p className="text-sm leading-relaxed whitespace-pre-wrap">{doc.reply}</p>
                  </section>
                )}
              </div>
            ) : (
              <div className="space-y-4">
                {doc.reply && (
                  <section className="rounded-md border border-ws-primary/30 bg-ws-primary/5 p-3">
                    <h4 className="text-xs font-semibold text-ws-primary mb-1">運営からの返信</h4>
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
        )}
      </DialogContent>
    </Dialog>
  )
}
