// src/lib/candidate.ts

// ---- 型定義 ----
export type CandidateTheme = string

export interface CandidateHighlight {
  icon: 'award' | 'users' | 'shield' | 'target' | 'book'
  text: string
}

export interface CandidateTimeline {
  year: string
  title: string
  desc?: string
}

export interface CandidateDetailSection {
  id: string
  title: string
  body?: string
  bullets?: string[]
}

export interface CandidateQA {
  q: string
  a: string
}

export interface CandidateProfile {
  nameJa: string
  city: string
  born: string
  summary: string
}

export interface CandidateData {
  profile: CandidateProfile
  themes: CandidateTheme[]
  highlights: CandidateHighlight[]
  timeline: CandidateTimeline[]
  qa: CandidateQA[]
}

// ---- CMS から取得 ----
const BASE_URL =
  process.env.NEXT_PUBLIC_CMS_URL || process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

export async function getCandidate(): Promise<CandidateData | null> {
  const url = `${BASE_URL}/api/candidates?limit=1`

  const res = await fetch(url, {
    // トップページなどで SSR する前提なので軽くキャッシュ
    next: { revalidate: 60 },
  })

  if (!res.ok) {
    console.error('Failed to fetch candidate', res.status)
    return null
  }

  const json = await res.json()
  const doc = json.docs?.[0]
  if (!doc) return null

  const profile: CandidateProfile = {
    nameJa: doc.nameJa,
    city: doc.city,
    born: doc.born,
    summary: doc.summary,
  }

  const themes: CandidateTheme[] = (doc.themes ?? []).map((t: any) => t.value)

  const highlights: CandidateHighlight[] = (doc.highlights ?? []).map((h: any) => ({
    icon: h.icon,
    text: h.text,
  }))

  const timeline: CandidateTimeline[] = (doc.timeline ?? []).map((t: any) => ({
    year: t.year,
    title: t.title,
    desc: t.desc,
  }))

  const qa: CandidateQA[] = (doc.qa ?? []).map((q: any) => ({
    q: q.q,
    a: q.a,
  }))

  return {
    profile,
    themes,
    highlights,
    timeline,
    qa,
  }
}
