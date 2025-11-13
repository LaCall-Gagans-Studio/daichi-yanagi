// src/lib/sns-links.ts

export interface SocialLink {
  name: string
  url: string
  iconUrl: string
  bgColor: string
  borderColor?: string
}

const BASE_URL =
  process.env.NEXT_PUBLIC_CMS_URL || process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

export async function getSocialLinks(): Promise<SocialLink[]> {
  const res = await fetch(
    `${BASE_URL}/api/social-links?limit=50&where[active][equals]=true&sort=order`,
    {
      next: { revalidate: 60 },
    },
  )

  if (!res.ok) {
    console.error('Failed to fetch social links', res.status)
    return []
  }

  const json = await res.json()
  const docs = (json.docs ?? []) as any[]

  return docs.map((doc) => ({
    name: doc.name as string,
    url: doc.url as string,
    iconUrl: doc.iconUrl as string,
    bgColor: (doc.bgColor as string) || '#000000',
    borderColor: (doc.borderColor as string) || undefined,
  }))
}
