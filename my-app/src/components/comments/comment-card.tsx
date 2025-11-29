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
      <div className="w-full h-full p-3">
        <div className="flex items-center">
          <Image
            src={`/avatars/${avatarNum}.png`}
            alt="avatar"
            width={24}
            height={24}
            className="lg:w-6 lg:h-6 w-4 h-4 object-contain"
          />
          <div className="gap-0 space-y-0 ml-2 leading-tight">
            <p className="text-[9px] md:text-[11px] font-semibold text-black leading-none line-clamp-1">
              {meta.accountId || '匿名'}
            </p>
            <p className="text-[9px] md:text-[10px] mt-0.5 text-black line-clamp-1">
              {genderLabel(meta.gender)}・{ageLabel(meta.age)}・{districtLabel(meta.district)}
            </p>
          </div>
        </div>
        <div className="mt-1 flex-1">
          <p className={`text-[11px] md:text-xs text-black leading-snug line-clamp-3 `}>{text}</p>
        </div>

        {/* Heart Display (Read-only) */}
        {meta.hearts !== undefined && (
          <div className="absolute bottom-1 lg:bottom-0 right-1 flex items-center gap-0.5 text-gray-400 z-10">
            <LuHeart
              className={`w-2 h-2 md:w-3 md:h-3 ${meta.hearts !== undefined && meta.hearts > 0 ? 'fill-red-500 text-red-500' : ''} `}
            />
            <span
              className={`text-[8px] font-medium tabular-nums ${meta.hearts !== undefined && meta.hearts > 0 ? 'text-red-500' : 'text-gray-400'} `}
            >
              {meta.hearts}
            </span>
          </div>
        )}
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
