'use client'
import { useCurrentCity } from '@/app/utils/useCurrentCity'
import { CITY_PREPOSITIONAL } from '@/app/utils/cities'

export function ClientCityHeading({ post }: { post: any }) {
  const [currentCity] = useCurrentCity()
  const cityText = currentCity ? CITY_PREPOSITIONAL[currentCity] : ''
  return (
    <h1 className="text-xl md:text-5xl font-unbounded md:leading-16 pt-24 md:pt-0">
      {post.heading} {cityText && <span>{cityText}</span>}
    </h1>
  )
}
