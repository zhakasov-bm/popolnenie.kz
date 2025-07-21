'use client'

import Link from 'next/link'
import { useCurrentCity } from '@/app/utils/useCurrentCity'
import { Post } from '@/payload-types'
import { usePathname } from 'next/navigation'

type Props = {
  posts: Post[]
}

export default function Footer({ posts }: Props) {
  const [currentCity] = useCurrentCity()
  const pathname = usePathname()

  const currentSlug = pathname?.split('/')[2] || ''

  return (
    <footer className="bg-black p-16">
      <div className="flex flex-wrap gap-5 items-center justify-center text-white/80 md:pb-18">
        {posts
          .filter((post: Post) => post.slug !== currentSlug)
          .map((post: Post) => (
            <Link key={post.id} href={`/${currentCity}/${post.slug}`} className="hover:text-white">
              {post.name}
            </Link>
          ))}
      </div>
    </footer>
  )
}
