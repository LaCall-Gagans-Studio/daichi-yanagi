import Image from 'next/image'
import { getSocialLinks } from '@/lib/sns-links'
import InnerLinksList from './home-links/InnerLinksList'

export default async function HomeLinks() {
  const snsLinks = await getSocialLinks()
  return (
    <div className="w-full h-full relative">
      <section className="absolute bottom-0 left-0">
        {/* サイト内リンク */}
        <InnerLinksList />

        {/* SNS */}
        <ul className="relative pt-12 pb-6 pl-6 grid grid-cols-2 gap-y-2 gap-x-1">
          {snsLinks.map((sns) => (
            <li key={sns.name} className="w-10 h-10">
              <a
                href={sns.url}
                target="_blank"
                rel="noreferrer"
                className="w-6 h-6 rounded-full flex items-center justify-center transition-transform hover:scale-110 hover:shadow-md"
                style={{ backgroundColor: sns.bgColor }}
              >
                <Image
                  src={sns.iconUrl}
                  alt={sns.name}
                  width={16}
                  height={16}
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
