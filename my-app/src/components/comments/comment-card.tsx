// src/components/comments/comment-card.tsx
'use client'

import * as React from 'react'
import Image from 'next/image'
import { LuChevronLeft, LuHeart } from 'react-icons/lu'
import { ageLabel, districtLabel, genderLabel } from './comment-utils'

type CommentMeta = {
  id: string
  accountId: string
  profileNumber?: number
  age?: number | null
  gender?: 'unspecified' | 'male' | 'female' | 'nonbinary' | 'other'
  district?: string | null
  hearts?: number
}

export function CommentTile({
  text,
  meta,
  className = '',
  onClick,
}: {
  text: string
  meta: CommentMeta
  className?: string
  onClick?: () => void
}) {
  const avatarNum = meta.profileNumber && meta.profileNumber > 0 ? meta.profileNumber : 1
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        'aspect-square text-left relative hover:border-black hover:border-2 hover:border-double focus:outline-none focus:ring-2 focus:ring-ws-primary/40',
        className,
      ].join(' ')}
    >
      <div className="w-full h-full p-3 lg:px-2 lg:py-2">
        <div className="flex items-center">
          <Image
            src={`/avatars/${avatarNum}.png`}
            alt="avatar"
            width={16}
            height={16}
            className="w-4 h-4 object-contain"
          />
          <div className="gap-0 space-y-0 ml-2 leading-tight">
            <p className="text-[9px] md:text-[11px] font-semibold leading-none line-clamp-1">
              {meta.accountId || '匿名'}
            </p>
            <p className="text-[9px] md:text-[10px] mt-0.5 line-clamp-1">
              {genderLabel(meta.gender)}・{ageLabel(meta.age)}・{districtLabel(meta.district)}
            </p>
          </div>
        </div>
        <div className="mt-1 lg:mt-0.5 flex-1">
          <p
            className={`text-24md:text-[11px] font-medium md:text-xs leading-snug line-clamp-3 lg:line-clamp-2 2xl:line-clamp-3`}
          >
            {text}
          </p>
        </div>

        {/* Heart Display (Read-only) */}
        {
          /* Heart Display (Read-only) */
          /* いいねが1以上の場合のみ表示 & 背景色に応じて色変更 */
          meta.hearts !== undefined && meta.hearts > 0 && (
            <div
              className={`absolute bottom-1 lg:bottom-0 right-1 flex items-center gap-0.5 z-10 ${
                className.includes('bg-ws-primary') ? 'text-white' : 'text-ws-primary'
              }`}
            >
              <LuHeart className={`w-2 h-2 md:w-3 md:h-3 fill-current`} />
              <span className="text-[8px] font-medium tabular-nums">{meta.hearts}</span>
            </div>
          )
        }
      </div>
    </button>
  )
}

export function ReplyTile({
  text,
  className = '',
  onClick,
}: {
  text: string
  className?: string
  onClick?: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        'aspect-square p-2 text-left hover:border-black hover:border-2 hover:border-double focus:outline-none focus:ring-2 focus:ring-ws-primary/40',
        className,
      ].join(' ')}
    >
      <div className="w-full h-full flex items-center justify-start">
        <div>
          <LuChevronLeft className="text-black" />
        </div>
        <p className="text-xs ml-1 text-black leading-snug line-clamp-5">{text}</p>
      </div>
    </button>
  )
}

export function SpacerTile({ className = '' }: { className?: string }) {
  return <div className={['aspect-square', className].join(' ')} />
}
