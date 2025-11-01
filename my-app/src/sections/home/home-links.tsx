'use client'

// components
import * as React from 'react'
import Image from 'next/image'

// libs
import { snsLinks } from '@/lib/sns-links'

export default function HomeLinks() {
  return (
    <div className="w-full h-full relative">
      <section className="absolute bottom-0 left-0">
        <ul className="p-12 px-6 grid grid-cols-1 gap-6">
          {snsLinks.map((sns) => (
            <li key={sns.name}>
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
