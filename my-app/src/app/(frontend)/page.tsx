// components
import React from 'react'
import { YouTubePlaylist } from '@/components/youtube-playlist'

// sections
import Link from 'next/link'
import Image from 'next/image'
import { Hero } from '@/sections/home-main/hero'
import News from '@/sections/home-main/news'
import { HeroNotice } from '@/sections/home-main/hero-notice'
import Grids from '@/sections/home-main/grids'
import { Candidate } from '@/sections/home-main/candidate'
import { Vision } from '@/sections/home-main/vision'
import { Policy } from '@/sections/home-main/policy'
import Support from '@/sections/home-main/support'
import { Footer } from '@/sections/footer'

import { getAllNews } from '@/lib/news'
import { getUpcomingEvents } from '@/lib/schedule'
import { getPolicyThemes } from '@/lib/policy'
import { getCandidate } from '@/lib/candidate'
import { getSocialLinks } from '@/lib/sns-links'

export default async function HomePage() {
  const news = await getAllNews()
  const themes = await getPolicyThemes()
  const [events, candidate] = await Promise.all([getUpcomingEvents(), getCandidate()])
  const snsLinks = await getSocialLinks()
  if (!candidate) return null

  return (
    <div className="w-full h-full bg-white relative text-ws-primary overflow-y-auto">
      <main className="">
        <div className="relative w-full shadow-md hover:shadow-lg transition-shadow duration-300 group">
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLScHvpcM9Q62k7KJhRAeNfLCW-hfDuHqTt6MtO2QZj1jk2vB6A/viewform?usp=header"
            target="_blank"
            rel="noopener noreferrer"
            className="block relative"
          >
            <div className="overflow-hidden relative">
              <Image
                src="/hero_link.png"
                alt="イベントバナー"
                width={1000}
                height={300}
                style={{ width: '100%', height: 'auto' }}
                className="transition-transform duration-700 ease-out group-hover:scale-105"
                priority
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300" />
            </div>

            <div className="w-full bg-ws-primary text-white text-center py-2.5 text-xs sm:text-sm font-bold tracking-widest transition-colors duration-300 group-hover:bg-[#dba000]">
              <span className="inline-block animate-bounce mr-2">▲</span>
              イベント開催中！応募は画像から！
              <span className="inline-block animate-bounce ml-2">▲</span>
            </div>
          </a>
        </div>

        {/* --- HERO --- */}
        <Hero events={events} candidate={candidate} />
        <HeroNotice />

        <div className="px-4 mb-8">
          <YouTubePlaylist />
        </div>

        {/* --- Grids --- */}
        <Grids />

        {/* --- NEWS --- */}
        {/* <News items={news} /> */}

        {/* --- CANDIDATE --- */}
        <Candidate candidate={candidate} />

        {/* --- VISION --- */}
        <Vision vision={candidate.vision} />

        {/* --- POLICY --- */}
        <Policy themes={themes} />

        {/* --- CTA --- */}
        <Support />

        {/* --- FOOTER --- */}
        <Footer snsLinks={snsLinks} />
      </main>
    </div>
  )
}
