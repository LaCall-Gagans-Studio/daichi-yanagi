import React from 'react'
import './styles.css'

export const metadata = {
  description: 'A blank template using Payload in a Next.js app.',
  title: 'Payload Blank Template',
}

// sections
import HomeLinks from '@/sections/home-links'
import HomeGrids from '@/sections/home-grids'

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="ja">
      <body>
        <main className="w-screen h-screen font-kosugi">
          <div className="text-black flex w-full h-full">
            <div id="home-grids" className="bg-ws-secondary grow w-1/4 hidden lg:block">
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
