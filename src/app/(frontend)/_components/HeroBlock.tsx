'use client'

import { CITY_PREPOSITIONAL } from '@/app/utils/cities'
import { useCurrentCity } from '@/app/utils/useCurrentCity'
import { Page } from '@/payload-types'
import { RichText } from '@payloadcms/richtext-lexical/react'
import CustomButton from './CustomButton'

export default function HeroBlock({ page }: { page: Page }) {
  const [currentCity] = useCurrentCity()
  const cityText = currentCity ? CITY_PREPOSITIONAL[currentCity] : ''

  return (
    <section className="container mx-auto pt-28 md:pt-8 relative font-unbounded">
      {(page.layout ?? []).map((block, id) => {
        if (block.blockType === 'heroblock') {
          return (
            <div key={id} className="flex flex-col justify-center items-center text-center">
              <div className="flex flex-col gap-4 md:max-w-5xl px-6">
                <h1 className="text-[25px] md:text-6xl md:leading-16 md:pt-16">
                  {block.heading} {cityText && <span>{cityText}</span>}
                </h1>
                <div className="w-full text-left hero-richtext">
                  <RichText data={block.subheading} />
                </div>
              </div>

              <div className="flex flex-col gap-4 md:flex-row md:gap-8 px-6 md:px-12 mt-0 md:mt-16 md:mb-8 md:max-w-5xl w-full items-center justify-between">
                {block.statistics?.map((item, i) => (
                  <div className="flex flex-col gap-1 md:items-start pt-12" key={i}>
                    <h3 className="text-5xl md:text-6xl">{item.text}</h3>
                    <p className="text-base font-light">{item.value}</p>
                  </div>
                ))}
              </div>
              <CustomButton label={block.button || 'Заказать'} to="#form" />
            </div>
          )
        }
      })}
    </section>
  )
}
