'use client'

// components
import * as React from 'react'
import Image from 'next/image'
import Link from 'next/link'

import { LuChevronRight } from 'react-icons/lu'

// libs
import { snsLinks } from '@/lib/sns-links'

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
]

export default function HomeLinks() {
  return (
    <div className="w-full h-full relative">
      <section className="absolute bottom-0 left-0">
        {/* サイト内リンク */}
        <ul className="pt-12 px-6 grid grid-cols-1 gap-3">
          {innerLinks.map((link) => (
            <li key={link.url} className="">
              <Link
                href={link.url}
                onClick={(e) => {
                  e.preventDefault()
                  document.querySelector(link.url)?.scrollIntoView({ behavior: 'smooth' })
                }}
                className="text-black font-bold flex items-center gap-1 group hover:font-extrabold"
              >
                <LuChevronRight className="font-bold group-hover:translate-x-1 duration-300" />
                {link.title}
              </Link>
            </li>
          ))}
        </ul>

        {/* SNS */}
        <ul className="relative w-36 pt-12 pb-6 pl-6 grid grid-cols-2 gap-6 gap-x-1">
          {snsLinks.map((sns) => (
            <li key={sns.name} className="w-10 h-10">
              <a
                href={sns.url}
                target="_blank"
                className={`w-10 h-10 rounded-full flex items-center justify-center ${sns.color} transition-transform hover:scale-110 hover:shadow-md`}
              >
                <Image
                  src={sns.icon}
                  alt={sns.name}
                  width={25}
                  height={25}
                  className="object-contain"
                />
              </a>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}
