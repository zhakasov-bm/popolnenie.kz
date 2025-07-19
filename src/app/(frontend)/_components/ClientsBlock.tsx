import { Page } from '@/payload-types'
import Image from 'next/image'

export default function ClientsBlock({ page }: { page: Page }) {
  return (
    <section className="container-class pb-8">
      {(page.layout ?? []).map((block, id) => {
        if (block.blockType === 'brands') {
          return (
            <div key={id}>
              <h2>{block.heading}</h2>

              <div className="grid grid-cols-2 md:grid-cols-5 gap-2 md:gap-4">
                {block.logos?.map((item, idx) => {
                  return (
                    <div key={idx} className="p-6 w-full">
                      {typeof item.logo === 'object' && item.logo?.url && (
                        <Image
                          src={item.logo.url}
                          alt={item.logo.alt || 'Icon'}
                          width={0}
                          height={0}
                          sizes="auto"
                          className="w-full h-auto object-contain"
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
