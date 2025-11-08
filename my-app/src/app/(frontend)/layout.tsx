// app/layout.tsx（抜粋）
import React from 'react'
import type { Metadata } from 'next'
import Script from 'next/script'
import './styles.css'

import HomeGrids from '@/sections/home-grids'
import HomeLinks from '@/sections/home-links'

const siteName = '柳大地 公式サイト | Tottori Update Challenge'
const siteUrl = 'https://example.com' // ← 公開ドメインに差し替え
const ogImage = `${siteUrl}/og/og-default.jpg` // ← 実ファイルに差し替え

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteName,
    template: `%s | 柳大地 公式サイト`,
  },
  description:
    '鳥取から「変化に挑戦」。市民と対話し、稼ぐ行政と学びの再設計で上昇スパイラルをつくる柳大地の公式サイト。',
  applicationName: '柳大地 公式サイト',
  keywords: [
    '柳大地',
    '鳥取市長',
    '鳥取',
    'Tottori Update Challenge',
    '公約',
    '教育改革',
    '財政',
    '駅前再開発',
    '市民対話',
    'ふるさと納税',
    'フリースクール',
    'STEAM',
  ],
  authors: [{ name: '柳 大地', url: siteUrl }],
  creator: '柳 大地',
  publisher: '柳 大地',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'ja_JP',
    url: siteUrl,
    siteName,
    title: siteName,
    description:
      '鳥取から「変化に挑戦」。市民と対話し、稼ぐ行政と学びの再設計で上昇スパイラルをつくる柳大地の公式サイト。',
    images: [{ url: ogImage, width: 1200, height: 630, alt: '柳大地 公式サイト OG画像' }],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@', // 公式XがあればIDを入力
    creator: '@', // 公式XがあればIDを入力
    title: siteName,
    description:
      '鳥取から「変化に挑戦」。市民と対話し、稼ぐ行政と学びの再設計で上昇スパイラルをつくる柳大地の公式サイト。',
    images: [ogImage],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      'max-snippet': -1,
      'max-image-preview': 'large',
      'max-video-preview': -1,
    },
  },
  category: 'Politics',
  verification: {
    // 検索コンソールやBing等の検証コードがあれば追加
    // google: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
  },
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props
  const orgJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: '柳大地 公式サイト',
    url: siteUrl,
    logo: `${siteUrl}/common/logo.png`,
    sameAs: [
      // 公式SNSがあれば追加
      // 'https://x.com/xxxx',
      // 'https://www.facebook.com/xxxx',
      // 'https://www.youtube.com/@xxxx',
    ],
  }

  const personJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: '柳 大地',
    url: siteUrl,
    jobTitle: '（候補者/市長想定）',
    worksFor: { '@type': 'Organization', name: 'Tottori Update Challenge' },
    address: {
      '@type': 'PostalAddress',
      addressLocality: '鳥取市',
      addressRegion: '鳥取県',
      addressCountry: 'JP',
    },
  }

  const webSiteJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteName,
    url: siteUrl,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${siteUrl}/search?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  }

  return (
    <html lang="ja">
      <body>
        {/* JSON-LD（SEO強化）。<main>の構造は変更しません */}
        <Script id="ld-org" type="application/ld+json" strategy="afterInteractive">
          {JSON.stringify(orgJsonLd)}
        </Script>
        <Script id="ld-person" type="application/ld+json" strategy="afterInteractive">
          {JSON.stringify(personJsonLd)}
        </Script>
        <Script id="ld-website" type="application/ld+json" strategy="afterInteractive">
          {JSON.stringify(webSiteJsonLd)}
        </Script>

        <main className="w-screen h-screen font-kosugi">
          <div className="text-black flex w-full h-full">
            <div id="home-grids" className="bg-ws-secondary grow w-1/4 hidden lg:block">
              {/* LCP向上: 非同期でもOKな軽量グリッドはそのまま */}
              <HomeGrids />
            </div>
            <div id="home-main" className="bg-white overflow-y-scroll w-full lg:w-sm">
              {children}
            </div>
            <div id="home-links" className="bg-ws-secondary grow hidden lg:block">
              <HomeLinks />
            </div>
          </div>
        </main>
      </body>
    </html>
  )
}
