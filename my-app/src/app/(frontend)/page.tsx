// components
import React from 'react'
import { YouTubePlaylist } from '@/components/youtube-playlist'

// sections
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
        <div className="relative">
          <a href="https://docs.google.com/forms/d/e/1FAIpQLScHvpcM9Q62k7KJhRAeNfLCW-hfDuHqTt6MtO2QZj1jk2vB6A/viewform?usp=header">
            <img src="/hero_link.png" alt="hero" />
          </a>

          <p className=" text-ws-primary text-center bg-white text-xs font-bold">
            ▲イベント開催中！応募は画像から！▲
          </p>
        </div>

        {/* --- HERO --- */}
        <Hero events={events} candidate={candidate} />
        <HeroNotice />

        <div className="px-4 mb-8 lg:hidden">
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
