// components
import React from 'react'

// sections
import { Hero } from '@/sections/home-main/hero'
import News from '@/sections/home-main/news'
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
        {/* --- HERO --- */}
        <Hero events={events} candidate={candidate} />

        {/* --- Grids --- */}
        <Grids />

        {/* --- NEWS --- */}
        <News items={news} />

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
