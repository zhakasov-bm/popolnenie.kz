'use client'

import { Page } from '@/payload-types'
import { useTheme } from 'next-themes'
import Image from 'next/image'

export default function ClientsBlock({ page }: { page: Page }) {
  const { resolvedTheme } = useTheme()

  if (!resolvedTheme) return null

  return (
    <section className="container-class pb-8">
      {(page.layout ?? []).map((block, id) => {
        if (block.blockType === 'brands') {
          return (
            <div key={id}>
              <h2>{block.heading}</h2>

              <div className="grid grid-cols-2 md:grid-cols-5 md:gap-4">
                {block.logos?.map((item, idx) => {
                  const logoToUse =
                    resolvedTheme === 'dark' &&
                    typeof item.logoDark === 'object' &&
                    item.logoDark?.url
                      ? item.logoDark
                      : item.logo

                  return (
                    <div key={idx} className="p-2 w-full flex items-center justify-center">
                      {typeof logoToUse === 'object' && logoToUse?.url && (
                        <Image
                          src={logoToUse.url}
                          alt={logoToUse.alt || 'Icon'}
                          width={120}
                          height={120}
                          className="object-contain"
                          draggable={false}
                        />
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          )
        }
      })}
    </section>
  )
}
