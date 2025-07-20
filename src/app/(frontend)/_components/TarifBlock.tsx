import { Page } from '@/payload-types'
import Image from 'next/image'

export default function TarifBlock({ page }: { page: Page }) {
  return (
    <section id="tarifblock" className="container-class pb-8">
      {(page.layout ?? []).map((block, id) => {
        if (block.blockType === 'tarifblock') {
          return (
            <div key={id}>
              <h2>{block.tarifTitle}</h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {block.tarifs?.map((item, idx) => {
                  const isNoCommission = item.commission === 'Без комиссии'

                  return (
                    <div
                      key={idx}
                      className="p-8 rounded-custom flex flex-col gap-2 border border-cityHover items-center text-center"
                    >
                      {typeof item.icon === 'object' && item.icon?.url && (
                        <Image
                          src={item.icon.url}
                          alt={item.icon.alt || 'Icon'}
                          width={0}
                          height={10}
                          sizes="auto"
                          className="h-10 w-auto object-contain"
                          draggable={false}
                        />
                      )}

                      <p className="text-xl font-medium pt-6">{item.type}</p>
                      <p className="text-base font-light">{item.price}</p>

                      <div className="bg-background py-2 px-6 rounded-3xl text-base font-inter mt-4 flex items-center gap-2">
                        <span>{isNoCommission ? '🔥' : '💰'}</span>
                        <span>{item.commission}</span>
                      </div>
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
