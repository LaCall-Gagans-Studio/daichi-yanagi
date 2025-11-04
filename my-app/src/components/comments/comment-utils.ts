// src/components/comments/comment-utils.ts
'use client'

/** ===== Types ===== */
export type Gender = 'unspecified' | 'male' | 'female' | 'nonbinary' | 'other'

export type CommentDoc = {
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

/** グリッドのセル表現（CTAは各コンポーネント側で足す想定） */
export type GridCell =
  | {
      kind: 'comment'
      key: string
      text: string
      source: CommentDoc
      meta: {
        accountId: string
        profileNumber?: number
        age?: number | null
        gender?: Gender
        district?: string | null
      }
    }
  | { kind: 'reply'; key: string; text: string; source: CommentDoc }
  | { kind: 'spacer'; key: string }

/** ===== Fetch ===== */
export async function fetchComments(limit = 60): Promise<CommentDoc[]> {
  const res = await fetch(`/api/comments?limit=${limit}`, { cache: 'no-store' })
  if (!res.ok) throw new Error('Failed to fetch comments')
  const data = await res.json()
  return Array.isArray(data) ? data : (data?.docs ?? [])
}

/** ===== Display labels ===== */
export function genderLabel(g?: Gender) {
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
export function ageLabel(a?: number | null) {
  return typeof a === 'number' && a >= 0 ? `${a}歳` : '年齢非公開'
}
export function districtLabel(d?: string | null) {
  return d && d.trim() ? d : '地区非公開'
}

/** ===== Transformers ===== */
export function toCommentCell(item: CommentDoc): GridCell {
  return {
    kind: 'comment',
    key: `${item.id}-comment`,
    text: item.comment,
    source: item,
    meta: {
      accountId: item.accountId,
      profileNumber: item.profileNumber,
      age: item.age ?? undefined,
      gender: item.gender ?? 'unspecified',
      district: item.district ?? undefined,
    },
  }
}
export function toReplyCell(item: CommentDoc): GridCell {
  return { kind: 'reply', key: `${item.id}-reply`, text: item.reply!, source: item }
}

/**
 * コメント列を「ペア（左・右）」配列へ詰める。
 * - 返信あり: [comment, reply]
 * - 返信なし同士で2つ: [comment, comment]
 * - 余り1つ: [comment, spacer]
 */
export function makePairs(items: CommentDoc[]): Array<[GridCell | null, GridCell | null]> {
  const pairs: Array<[GridCell | null, GridCell | null]> = []
  let pendingNoReply: CommentDoc | null = null

  for (const item of items) {
    if (item.reply) {
      if (pendingNoReply) {
        pairs.push([toCommentCell(pendingNoReply), null])
        pendingNoReply = null
      }
      pairs.push([toCommentCell(item), toReplyCell(item)])
    } else {
      if (!pendingNoReply) {
        pendingNoReply = item
      } else {
        pairs.push([toCommentCell(pendingNoReply), toCommentCell(item)])
        pendingNoReply = null
      }
    }
  }
  if (pendingNoReply) {
    pairs.push([toCommentCell(pendingNoReply), null])
    pendingNoReply = null
  }
  return pairs
}

/** ペア配列をセル一次元配列へ。常に [左, 右] の順で並べる */
export function pairsToCells(
  pairs: Array<[GridCell | null, GridCell | null]>,
): (GridCell | null)[] {
  const out: Array<GridCell | null> = []
  for (let i = 0; i < pairs.length; i++) {
    const [left, right] = pairs[i]
    out.push(left ?? { kind: 'spacer', key: `sp-${i}-L` })
    out.push(right ?? { kind: 'spacer', key: `sp-${i}-R` })
  }
  return out
}
