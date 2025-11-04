// components
import React from 'react'

// sections
import Hero from '@/sections/home-main/hero'
import News from '@/sections/home-main/news'
import Grids from '@/sections/home-main/grids'
import Candidate from '@/sections/home-main/candidate'
import Vision from '@/sections/home-main/vision'
import Policy from '@/sections/home-main/policy'
import Support from '@/sections/home-main/support'
import Footer from '@/sections/footer'

export default function HomeMain() {
  return (
    <div className="w-full h-full bg-white relative text-ws-primary overflow-y-auto">
      {/* <header className="h-12 w-36 fixed top-0  z-10 bg-ws-primary/50"></header> */}
      <main className="">
        {/* --- HERO --- */}
        <Hero />

        {/* --- Grids --- */}
        <Grids />

        {/* --- NEWS --- */}
        <News />

        {/* --- CANDIDATE --- */}
        <Candidate />

        {/* --- VISION --- */}
        <Vision />

        {/* --- POLICY --- */}
        <Policy />

        {/* --- CTA --- */}
        <Support />

        {/* --- FOOTER --- */}
        <Footer />
      </main>
    </div>
  )
}

//   <picture>
//     <source srcSet="https://raw.githubusercontent.com/payloadcms/payload/main/packages/ui/src/assets/payload-favicon.svg" />
//     <Image
//       alt="Payload Logo"
//       height={65}
//       src="https://raw.githubusercontent.com/payloadcms/payload/main/packages/ui/src/assets/payload-favicon.svg"
//       width={65}
//     />
//     <div>
//       <h1 className="bg-amber-300">あああああ</h1>
//     </div>
//   </picture>
//   {!user && <h1>Welcome to your new project.</h1>}
//   {user && <h1>Welcome back, {user.email}</h1>}
//   <div className="links">
//     <a
//       className="admin"
//       href={payloadConfig.routes.admin}
//       rel="noopener noreferrer"
//       target="_blank"
//     >
//       Go to admin panel
//     </a>
//     <a
//       className="docs"
//       href="https://payloadcms.com/docs"
//       rel="noopener noreferrer"
//       target="_blank"
//     >
//       Documentation
//     </a>
//   </div>
// </div>
// <div className="footer">
//   <p>Update this page by editing</p>
//   <a className="codeLink" href={fileURL}>
//     <code>app/(frontend)/page.tsx</code>
//   </a>
