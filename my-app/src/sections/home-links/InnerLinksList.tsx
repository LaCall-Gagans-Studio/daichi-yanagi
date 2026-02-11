'use client'

import Link from 'next/link'
import { LuChevronRight } from 'react-icons/lu'

export interface InnerLinksItem {
  title: string
  url: string
}

const innerLinks: InnerLinksItem[] = [
  {
    title: '柳大地について',
    url: '#candidate',
  },
  {
    title: '私たちのビジョン',
    url: '#vision',
  },
  {
    title: '政策3本の柱',
    url: '#policy',
  },
  {
    title: 'ボランティアになる',
    url: '#support',
  },
  {
    title: '寄付の見える化',
    url: '#charts',
  },
]

export default function InnerLinksList() {
  return (
    <ul className="pt-12 px-6 grid grid-cols-1 gap-3">
      {innerLinks.map((link) => (
        <li key={link.url} className="">
          <Link
            href={link.url}
            onClick={(e) => {
              e.preventDefault()
              document.querySelector(link.url)?.scrollIntoView({ behavior: 'smooth' })
            }}
            className="text-white font-bold flex items-center gap-1 group hover:font-extrabold"
          >
            <LuChevronRight className="font-bold group-hover:translate-x-1 duration-300" />
            {link.title}
          </Link>
        </li>
      ))}
    </ul>
  )
}
