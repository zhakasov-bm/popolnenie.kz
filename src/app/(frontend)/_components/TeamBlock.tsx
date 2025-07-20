import { Page } from '@/payload-types'
import Image from 'next/image'

export default function TeamBlock({ page }: { page: Page }) {
  return (
    <section id="team" className="container-class pb-8">
      {(page.layout ?? []).map((block, id) => {
        if (block.blockType === 'team') {
          return (
            <div key={id}>
              <h2>{block.heading}</h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-1 py-5">
                {block.members?.map((item, idx) => {
                  return (
                    <div key={idx} className="flex flex-col items-center text-center">
                      <div className="w-50 h-50 rounded-full overflow-hidden">
                        {typeof item.avatar === 'object' && item.avatar?.url && (
                          <Image
                            src={item.avatar.url}
                            alt={item.avatar.alt || 'Avatar'}
                            width={80}
                            height={80}
                            className="w-full h-full object-cover"
                            draggable={false}
                          />
                        )}
                      </div>
                      <p className="mt-4 font-unbounded text-lg">{item.name}</p>
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
