import React from 'react'
import './styles.css'

// sections
import HomeLinks from '@/sections/home/home-links'
import HomeMain from '@/sections/home/home-main'

export default async function HomePage() {
  return (
    <div className="w-screen h-screen font-kosugi">
      <div className="text-black flex w-full h-full">
        <div id="home-grids" className="bg-ws-primary grow w-1/4">
          Grids
        </div>
        <div id="home-main" className="bg-white w-sm">
          <HomeMain />
        </div>
        <div id="home-links" className="bg-ws-primary grow">
          <HomeLinks />
        </div>
      </div>
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
