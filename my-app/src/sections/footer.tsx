import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { LuMessageSquareMore } from 'react-icons/lu'
import type { SocialLink } from '@/lib/sns-links'

export function Footer({ snsLinks }: { snsLinks: SocialLink[] }) {
  return (
    <footer className="space-y-2 pb-6 px-5 flex flex-col items-center mt-16">
      <LuMessageSquareMore className="text-7xl" />
      <h2 className="text-base font-semibold">お問い合わせ</h2>
      <p className="text-sm text-center">
        メディア出演に関するご依頼や
        <br />
        お問い合わせはこちらからお願いいたします。
      </p>
      <Button
        asChild
        variant="outline"
        className="border-ws-primary/30 text-ws-primary hover:bg-ws-primary/10 my-4"
      >
        <Link href="/ongoing">お問い合わせ</Link>
      </Button>

      <h2 className="text-base mt-10 font-semibold">柳大地 公式SNS</h2>
      <ul className="px-3 mt-2 grid grid-cols-4 gap-6">
        {snsLinks.map((sns) => (
          <li key={sns.name}>
            <a
              href={sns.url}
              target="_blank"
              rel="noreferrer"
              className="w-10 h-10 rounded-full flex items-center justify-center border transition-transform hover:scale-110 hover:shadow-md"
              style={{
                backgroundColor: sns.bgColor,
                borderColor: sns.borderColor || sns.bgColor,
              }}
            >
              <Image
                src={sns.iconUrl}
                alt={sns.name}
                width={25}
                height={25}
                className="object-contain"
              />
            </a>
          </li>
        ))}
      </ul>
    </footer>
  )
}
