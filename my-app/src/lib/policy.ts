// src/lib/policy.ts

export interface PolicyItem {
  title: string
  description: string
}

export interface PolicyGroup {
  title: string
  items: PolicyItem[]
}

export type PolicyThemeId = 'education' | 'governance' | 'growth'

export interface PolicyTheme {
  id: PolicyThemeId
  title: string
  description: string
  groups: PolicyGroup[]
}

const BASE_URL = process.env.NEXT_PUBLIC_CMS_URL || 'http://localhost:3000'

// Payload の /api/policies から取得
export async function getPolicyThemes(): Promise<PolicyTheme[]> {
  const url = `${BASE_URL}/api/policies?limit=20&sort=themeId`

  const res = await fetch(url, {
    next: { revalidate: 60 }, // 1分キャッシュ
  })

  if (!res.ok) {
    console.error('Failed to fetch policies', res.status)
    return []
  }

  const json = await res.json()

  const themes: PolicyTheme[] = (json.docs ?? []).map((doc: any) => ({
    id: doc.themeId,
    title: doc.title,
    description: doc.description,
    groups: (doc.groups ?? []).map((g: any) => ({
      title: g.title,
      items: (g.items ?? []).map((it: any) => ({
        title: it.title,
        description: it.description,
      })),
    })),
  }))

  // education / governance / growth の順に並べたいので手動ソート
  const order: PolicyThemeId[] = ['education', 'governance', 'growth']
  themes.sort((a, b) => order.indexOf(a.id) - order.indexOf(b.id))

  return themes
}
